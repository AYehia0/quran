import quran from '../../data/quran.json';

// the typescript file to manage the quran surahs list from the json file

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

// parse the json file given its path
export function parseSurahs(): Surah[] {
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
