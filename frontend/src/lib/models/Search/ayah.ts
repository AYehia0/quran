// responsible for searching ayaht in the quran

import { parseQuran } from '$lib/quran/parser';

export type SearchResult = {
	surah: number;
	page: number;
	ayah: number;
	ayahText?: string;
	surahName?: string;
};

export async function searchAyah(query: string): Promise<SearchResult[]> {
	const results: SearchResult[] = [];
	const quran = await parseQuran('/data/quran.json');

	// O(n^2) complexity assuming the includes function is O(1)
	for (const surah of quran) {
		for (const ayah of surah.ayahs) {
			if (ayah.text.includes(query)) {
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
