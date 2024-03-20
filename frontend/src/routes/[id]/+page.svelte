<!-- show the id of the clicked surah -->
<script lang="ts">
    import { page,  } from '$app/stores';
    import { onMount } from 'svelte';
    import type { Surah } from '$lib/quran/parser';
    import { getSurah } from '$lib/quran/parser';

    let surah: Surah

    let id = $page.params.id;

    // get the surah data
    onMount(async () => {
        surah = await getSurah('/data/quran.json', parseInt(id), 0);
        console.log(surah);
    });

</script>

{#if surah}
    <h1 class="arabic-text text-4xl font-bold text-center my-4">{surah.name}</h1>
    <div class="flex flex-col items-center">
        {#each surah.ayahs as ayah}
            <div class="w-full p-4 my-2 rounded-lg">
                <p class="arabic-text text-2xl font-bold text-center">{ayah.text}</p>
            </div>
        {/each}
    </div>
{/if}
