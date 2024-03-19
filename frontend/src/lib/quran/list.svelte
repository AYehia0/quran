<script>
	import { parseSurahs } from "./parser";

    // json file with surahs as : "1": "Al-Fatiha"
    const surahs = parseSurahs()
    console.log(surahs.length)
    console.log(surahs[0])
    console.log(surahs[1].id)
</script>

<style>
    @font-face {
        font-family: arabic_quran;
        src: url("/fonts/LPMQ.ttf") format("truetype");
    }

    @font-face {
        font-family: suraname;
        src: url("/fonts/surah_names.woff2") format("woff2");
    }

    .surah-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        text-decoration: none; /* Remove underline from links */
    }

    .surah-item:hover {
        background-color: #f0f0f0; /* Optional: Add hover effect */
    }

    .badge {
        margin-right: 10px; /* Adjust margin as needed */
    }

    .arabic-name {
        font-family: arabic_quran; /* Use the custom font */
        direction: rtl; /* Right-to-left text direction for Arabic */
    }
</style>

<nav class="list-nav">
    <ul>
        {#each surahs as surah }
            <li>
                <a href="/quran/{surah.id}" class="surah-item">
                    <span class="badge bg-primary-500">{surah.id}</span>
                    <span>{surah.englishName}</span>
                    <!-- The arabic name to the right -->
                    <span class="arabic-name">{surah.name}</span>
                </a>
            </li>
        {/each}
    </ul>
</nav>
