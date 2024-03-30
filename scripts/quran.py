#!/bin/python3


# simple script that takes arguments from the command line
# and mofifies the quran.json and surahs.json files
# takes the pages from quran.json and adds them to surahs.json


import json
import sys
import pyarabic.araby as araby


def normailze_arabic_text(text):
    # remove the tashkeel from the text
    text = araby.strip_tashkeel(text)

    # remove the harakat from the text
    text = araby.strip_harakat(text)

    # remove the non-arabic characters from the text
    text = araby.strip_tatweel(text)

    # repalce alef with hamza
    text = araby.normalize_hamza(text)

    return text


if __name__ == "__main__":
    # check if the user has provided the correct number of arguments
    # ./quran.py add_pages <path_to_surahs.json> <path_to_quran.json>

    if len(sys.argv) != 3:
        print("Usage: ./quran.py <path_to_surahs.json> <path_to_quran.json>")
        sys.exit(1)

    # read the surahs.json file
    surahs = json.load(open(sys.argv[1], "r"))
    quran = json.load(open(sys.argv[2], "r"))

    new_surahs = []
    new_quran = []

    # add the pages to the surahs.json file
    for surah in quran:
        ar_surah, _ = surah

        ayahs = []
        for ayah in ar_surah["ayahs"]:
            ayahs.append(
                {
                    "number": ayah["number"],
                    "text": normailze_arabic_text(ayah["text"]),
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

    # write the new surahs.json file
    with open("new_surahs.json", "w") as f:
        json.dump(new_surahs, f, ensure_ascii=False, indent=4)

    # write the new quran.json file
    with open("new_quran.json", "w") as f:
        json.dump(new_quran, f, ensure_ascii=False, indent=4)
