// the typescript file to manage the quran surahs list from the json file

export interface SurahSummary {
	id: number; // surah id
	name: string; // surah name in arabic
	englishName: string; // surah name in english
	englishNameTranslation: string; // translation of the surah name in english
	revelationType: string; // meccan or medinan
	numberOfAyahs: number; // number of ayahs in the surah
}

export interface Surah {
	id: number; // surah id
	name: string; // surah name in arabic
	englishName: string; // surah name in english
	englishNameTranslation: string; // translation of the surah name in english
	revelationType: string; // meccan or medinan
	numberOfAyahs: number; // number of ayahs in the surah
	ayahs: Ayah[]; // list of ayahs in the surah
}

export interface Ayah {
	number: number; // ayah number
	text: string; // ayah text in arabic
	numberInSurah: number; // ayah number in the surah
	juz: number; // juz number
	manzil: number; // manzil is a group of 7 surahs divided by Hamza-el-zayat to complete the quran in 7 days
	page: number; // page number; could be used to find where the ayah left, or right page
	ruku: number; // ruku is a group of ayahs in the quran in which the quran is divided to 540 rukus
	hizbQuarter: number;
	sajda: boolean;
}

export async function fetchJsonData(jsonPath: string) {
	const response = await fetch(jsonPath);
	const data = await response.text();
	return JSON.parse(data);
}

export async function getSurahsList(path: string): Promise<SurahSummary[]> {
	const quran = await fetchJsonData(path);

	if (!Array.isArray(quran) || quran.length === 0) {
		throw new Error('The quran json file is not found');
	}

	return quran.map((surah: any) => {
		return {
			id: surah.id,
			name: surah.name,
			englishName: surah.transliteration,
			englishNameTranslation: surah.translation,
			revelationType: surah.type,
			numberOfAyahs: surah.total_verses
		};
	});
}

export async function getSurah(path: string, id: number, lang: number): Promise<Surah> {
	const quran = await fetchJsonData(path);

	if (!Array.isArray(quran) || quran.length === 0) {
		throw new Error('The quran json file is not found');
	}

	const surah = quran[id - 1][lang];

	if (!surah) {
		throw new Error('The surah is not found');
	}

	// the surah contains 2 maps, one for arabic and the other for english
	// 0 for arabic and 1 for english
	return surah as Surah;
}

// parse the json file given its path
export async function parseQuran(path: string): Promise<Surah[]> {
	const quran = await fetchJsonData(path);

	if (!Array.isArray(quran) || quran.length === 0) {
		throw new Error('The quran json file is not found');
	}

	return quran.map((surah: any) => {
		const {
			number,
			name,
			englishName,
			englishNameTranslation,
			revelationType,
			numberOfAyahs,
			ayahs
		} = surah[0];

		// the ayahs list
		const ayahsList = ayahs.map((ayah: any) => {
			const { number, text, numberInSurah, juz, manzil, page, ruku, hizbQuarter, sajda } = ayah;
			return { number, text, numberInSurah, juz, manzil, page, ruku, hizbQuarter, sajda };
		});

		return {
			id: number,
			name,
			englishName,
			englishNameTranslation,
			revelationType,
			numberOfAyahs,
			ayahs: ayahsList
		};
	});
}
