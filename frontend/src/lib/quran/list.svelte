<script lang="ts">
	import { getSurahsList } from "./parser";
    import type { SurahSummary } from "./parser";
    import { onMount } from "svelte";

    let surahs: SurahSummary[] = [];

    onMount(async () => {
        surahs = await getSurahsList('/data/surahs.json')
    })
</script>

<style>
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

</style>

<nav class="list-nav">
    <ul>
        {#each surahs as surah }
            <li>
                <a href="/{surah.id}" class="surah-item">
                    <span class="badge bg-primary-500">{surah.id}</span>
                    <span>{surah.englishName}</span>
                    <!-- The arabic name to the right -->
                    <span class="arabic-text">{surah.name}</span>
                </a>
            </li>
        {/each}
    </ul>
</nav>
