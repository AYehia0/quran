"""
Get the csv file from the following link:
    https://github.com/ahr9n/quranic-search-v2/blob/main/backend/api/lexical/db/verses.cvs

This csv file is the most cleanest and accurate csv file I could find. It contains the verses of quran almost ready for search.
"""

import csv
import json

# Read the CSV file
csv_file = "verses.cvs"
with open(csv_file, encoding="utf-8") as f:
    reader = csv.reader(f)
    csv_data = list(reader)

# Extract the text from the 9th column
text_replacements = {row[1]: row[7] for row in csv_data}

# read the surahs.json file
quran_json = "quran.json"
quran = json.load(open(quran_json, "r"))

new_surahs = []
new_quran = []

# add the pages to the surahs.json file
for surah in quran:
    ar_surah, _ = surah

    ayahs = []
    for ayah in ar_surah["ayahs"]:
        ayah_number = ayah["numberInSurah"]

        # the format is S{surah_number}A{ayah_number} e.g. S114V6
        ind_in_csv = f"S{ar_surah['number']}V{ayah_number}"

        ayahs.append(
            {
                "number": ayah_number,
                "text": text_replacements[ind_in_csv],
                "numberInSurah": ayah["numberInSurah"],
                "juz": ayah["juz"],
                "page": ayah["page"],
                "hizbQuarter": ayah["hizbQuarter"],
                "sajda": ayah["sajda"],
            }
        )

    new_quran.append(
        {
            "number": ar_surah["number"],
            "name": ar_surah["name"],
            "englishName": ar_surah["englishName"],
            "englishNameTranslation": ar_surah["englishNameTranslation"],
            "revelationType": ar_surah["revelationType"],
            "numberOfAyahs": ar_surah["numberOfAyahs"],
            "ayahs": ayahs,
        }
    )

    new_surahs.append(
        {
            "id": ar_surah["number"],
            "name": ar_surah["name"],
            "transliteration": ar_surah["englishName"],
            "translation": ar_surah["englishNameTranslation"],
            "type": ar_surah["revelationType"],
            "total_verses": ar_surah["numberOfAyahs"],
            "page": ar_surah["ayahs"][0]["page"],
        }
    )

# write the new quran.json file
with open("new_quran_csv.json", "w") as f:
    json.dump(new_quran, f, ensure_ascii=False, indent=4)
