<!-- show the id of the clicked surah -->
<script lang="ts">
    import { page,  } from '$app/stores';
    import { onMount } from 'svelte';
    import type { Surah } from '$lib/quran/parser';
    import { getSurah } from '$lib/quran/parser';

    let surah: Surah
    let MAX_PAGE = 604;
    let leftPage = 0;
    let rightPage = 0;

    let id = $page.params.id;

    // get the surah data
    onMount(async () => {
        surah = await getSurah('/data/quran.json', parseInt(id), 0);

        // get the page number from the first ayah in the Surah
        let page = surah.ayahs[0].page;
        
        // if the page number is odd, then the right page is the page number and the left page is the page number + 1
        leftPage = page % 2 === 0 ? page : page + 1;
        rightPage = leftPage - 1;
    });

    // page navigation 
    function navigateToNextPage() {
        // make sure not to go beyond the last page
        if (leftPage + 2 > MAX_PAGE) {
            return;
        }
        leftPage += 2;
        rightPage += 2;
    }

    function navigateToPreviousPage() {
        // make sure not to go beyond the first Page
        if (leftPage - 2 <= 0) {
            return;
        }
        leftPage -= 2;
        rightPage -= 2;
    }

</script>

<div class="flex flex-row relative">
    <!-- Left Page -->
    <div class="w-1/2 bg-white relative">
        {#if leftPage >= 1}
            <img src="/data/images/{leftPage}.png" alt="right" class="w-full h-auto object-fill" />
            <div class="absolute bottom-0 right-1/2 text-black bg-white bg-opacity-50 p-2">
                {leftPage}
            </div>
            <button class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2" on:click={navigateToNextPage}>
                &lt;
            </button>
        {/if}
    </div>

    <!-- Right Page -->
    <div class="w-1/2 bg-white relative">
        {#if rightPage >= 1}
            <img src="/data/images/{rightPage}.png" alt="left" class="w-full h-auto object-fill" />
            <!-- Page Number -->
            <div class="absolute bottom-0 left-1/2 text-black bg-white bg-opacity-50 p-2">
                {rightPage}
            </div>
            <!-- Right Button -->
            <button class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2" on:click={navigateToPreviousPage}>
                &gt;
            </button>
        {/if}
    </div>
</div>
