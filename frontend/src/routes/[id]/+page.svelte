<!-- show the id of the clicked surah -->
<script lang="ts">
    import { page,  } from '$app/stores';
    import { onMount } from 'svelte';
    import type { Surah } from '$lib/quran/parser';
    import { getSurah } from '$lib/quran/parser';

    let surah: Surah
    let MAX_PAGE = 604;
    let rightPage = 0;
    let leftPage = 0;

    let id = $page.params.id;

    // get the surah data
    onMount(async () => {
        surah = await getSurah('/data/quran.json', parseInt(id), 0);

        // get the page number from the first ayah in the Surah
        let page = surah.ayahs[0].page;
        
        // if the page number is odd, then the right page is the page number and the left page is the page number + 1
        rightPage = page % 2 === 1 ? page : page + 1;
        leftPage = rightPage - 1;
    });

    // page navigation 
    function navigateToNextPage() {
        // make sure not to go beyond the last page
        if (rightPage + 2 > MAX_PAGE) {
            return;
        }
        rightPage += 2;
        leftPage += 2;
    }

    function navigateToPreviousPage() {
        // make sure not to go beyond the first Page
        if (rightPage - 2 < 0) {
            return;
        }
        rightPage -= 2;
        leftPage -= 2;
    }

</script>

<div class="flex flex-row relative">
    <!-- Right Page -->
    <div class="w-1/2 bg-white relative">
        <img src="/data/images/{rightPage}.png" alt="right" class="w-full h-auto object-fill" />

        <!-- Page Number: should by in the middle width down -->
        <div class="absolute bottom-0 right-1/2 text-black bg-white bg-opacity-50 p-2">
            {rightPage}
        </div>

        <!-- Left Button : should be to the left most of the first page (left) with "<" should be on top on the middle of the height -->
        <button class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2" on:click={navigateToNextPage}>
            &lt;
        </button>
    </div>

    <!-- Left Page -->
    <div class="w-1/2 bg-white relative">
        <img src="/data/images/{leftPage}.png" alt="left" class="w-full h-auto object-fill" />
        <!-- Page Number -->
        <div class="absolute bottom-0 left-1/2 text-black bg-white bg-opacity-50 p-2">
            {leftPage}
        </div>
        <!-- Right Button -->
        <button class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2" on:click={navigateToPreviousPage}>
            &gt;
        </button>
    </div>
</div>
