// responsible for searching ayaht in the quran

import { parseQuran } from '$lib/quran/parser';

export type SearchResult = {
	surah: number;
	page: number;
	ayah: number;
	ayahText?: string;
	surahName?: string;
};

// Regex to match non-spacing combining characters
const nonSpacingCombiningCharactersRegex = /\p{Mn}+/gu;

// Regex to remove extra characters when comparing non-Arabic strings
const charactersToReplaceRegex = /['`]/g;

// Regex to match tashkeel characters
// const tashkeelRegex = /[\u064B-\u065B\u063B-\u063F\u064B-\u065E\u066A-\u06FF]/gu;
const tashkeelRegex = /[\u064B-\u0652\u0657-\u065E\u0670]/gu;

// alifs with hamzas that we'll replace with : [\\u0622\\u0623\\u0625\\u0649]
const alifsWithHamza = /[\u0622\u0623\u0625\u0649]/;

// waw with hamza to replace with \u0648
const wawWithHamza = '\u0624';

// banned characters that should not be matched
const bannedChars = '[()]';

interface LookupTable {
	[char: string]: string;
}
// lookup table to match similar characters (harakat, hamzat, etc.)
const lookupTable: LookupTable = {
	// given: ا
	// match: آأإاﻯ
	'\u0627': '\u0622\u0623\u0625\u0627\u0649',

	// given: و
	// match: وؤ
	'\u0648': '\u0648\u0624',

	// given: ﺃ
	// match: ﺃﺀﺆﺋ
	'\u0623': '\u0621\u0623\u0624\u0626',

	// given: ﺀ
	// match: ﺀﺃﺆ
	'\u0621': '\u0621\u0623\u0624\u0626',

	// given: ﺕ
	// match: ﺕﺓ
	'\u062a': '\u062a\u0629',

	// given: ﺓ
	// match: ﺓتﻫ
	'\u0629': '\u0629\u062a\u0647',

	// given: ه
	// match: ةه
	'\u0647': '\u0647\u0629',

	// given: ﻯ
	// match: ﻯي
	'\u0649': '\u0649\u064a',

	// given: ئ
	// match: ئﻯي
	// this is especially helpful for rewayat Warsh
	'\u0626': '\u0626\u0649\u064a'
};

// generate a regex pattern to match all the characters in the lookup table
function generatePattern(query: string): string {
	let pattern = '';
	for (let i = 0; i < query.length; i++) {
		let char = query[i];
		let result = lookupTable[char];

		// if the character is not in the lookup table, then just add it to the pattern
		if (result) {
			pattern += `[${result}]`;
		} else if (!bannedChars.includes(char)) {
			pattern += char;
		}
	}

	return pattern;
}

// find the given text in the Arabic text
function findInArText(text: string, query: string): boolean {
	// Remove tashkeel characters from the text
	let processedText = text.replace(tashkeelRegex, '');

	// Remove non-spacing combining characters and characters to be replaced
	// FIXME: something is wrong here: it replaces alif with hamza + alif in (الله) with (ءالله)
	processedText = processedText
		.replace(nonSpacingCombiningCharactersRegex, '')
		.replace(charactersToReplaceRegex, '')
		.replace(/[\u0622\u0623\u0625\u0649]/g, 'ا') // Replace alifs with hamzas with ا
		.replace(wawWithHamza, '\u0648'); // Replace waw with hamza with و

	// Generate the regex pattern for the query
	let pattern = generatePattern(query);

	// Create a regex object with 'u' flag to handle Unicode characters
	let regex = new RegExp(pattern, 'gu');

	// Perform the matching
	return regex.test(processedText);
}

export async function searchAyah(query: string): Promise<SearchResult[]> {
	const results: SearchResult[] = [];
	const quran = await parseQuran('/data/quran.json');

	// O(n^2) complexity
	for (const surah of quran) {
		for (const ayah of surah.ayahs) {
			// remove tashkeel from the ayah text
			if (findInArText(ayah.text, query)) {
				results.push({
					surah: surah.id,
					page: ayah.page,
					ayah: ayah.numberInSurah,
					surahName: surah.name,
					ayahText: ayah.text // TODO: don't send the full ayah text
				});
			}
		}
	}
	return results;
}
