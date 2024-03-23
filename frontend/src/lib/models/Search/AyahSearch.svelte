<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
    import type { SearchResult } from '$lib/models/Search/ayah';
    import { searchAyah } from '$lib/models/Search/ayah';

	// Classes
	const cBase = 'card bg-surface-100/60 dark:bg-surface-500/30 backdrop-blur-lg overflow-hidden w-full max-w-[800px] shadow-xl mt-8 mb-auto';
	const cHeader = 'bg-surface-300-600-token flex items-center';
	const cSearchInput = 'bg-transparent border-0 ring-0 focus:ring-0 w-full m-2 ml-4 text-lg';
	const cResults = 'bg-surface-300-600-token overflow-x-auto max-h-[480px] hide-scrollbar';
	const cResultAnchor = '!rounded-none justify-between hover:variant-soft focus:!variant-filled-primary outline-0';
	const cFooter = 'hidden md:flex items-center gap-2 bg-surface-300-600-token p-4 text-xs font-bold';

	// Local
	let searchTerm = '';
	let results: SearchResult[] = [];
	const modalStore = getModalStore();

	// Elements
	let elemDocSearch: HTMLElement;

	async function onKeyDown(event: KeyboardEvent): Promise<void> {
		if (['Enter', 'ArrowDown'].includes(event.code)) {
			const queryFirstAnchorElement = elemDocSearch.querySelector('a');
			if (queryFirstAnchorElement) queryFirstAnchorElement.focus();

            // get the query from the search input
            const searchRes = await searchAyah(searchTerm);

            // console.log(searchRes);
            if (searchRes) {
                results = searchRes;
                console.log(results);
            }
		}
	}
</script>

<div bind:this={elemDocSearch} class="modal-search {cBase}">
	<!-- Header -->
	<header class="modal-search-header {cHeader}">
		<i class="fa-solid fa-magnifying-glass text-xl ml-4" />
		<input class={cSearchInput} bind:value={searchTerm} type="search" placeholder="Search..." on:keydown={onKeyDown} />
	</header>
	<!-- Results -->
	{#if results.length > 0}
		<nav class="list-nav {cResults}" tabindex="-1">
			{#each results as res}
				<div class="text-sm font-bold p-4 arabic-text">{res.ayahText}</div>
				<ul>
                    <li class="text-lg">
                        <a
                            class={cResultAnchor}
                            href="/{res.surah}"
                            on:click={(event) => {
                                event.preventDefault()

                                modalStore.close();

                                // // navigate to the page
                                // FIXME: this goes to the surah and not the ayah in the surah
                                // FIXME: shouldn't use window.location.href
                                // https://wails.io/docs/guides/sveltekit#the-wails-runtime-unloads-with-full-page-navigations
                                window.location.href = `/${res.surah}`;
                            }}
                        >
                            <div class="flex items-center gap-4">
                                <i class="fa-regular fa-file" />
                                <span class="flex-auto font-bold opacity-75 arabic-text">{res.surahName}</span>
                            </div>
                            <span class="hidden md:block text-xs opacity-50">{res.page}</span>
                        </a>
                    </li>
				</ul>
			{/each}
		</nav>
	<!-- {:else} -->
	<!-- 	<div class="p-4"> -->
	<!-- 		<p>No Results found for <code class="code">{searchTerm}</code>.</p> -->
	<!-- 	</div> -->
	{/if}
	<!-- Footer -->
	<footer class="modal-search-footer {cFooter}">
		<div><kbd class="kbd">Esc</kbd> to close</div>
		<div><kbd class="kbd">Tab</kbd> to navigate</div>
		<div><kbd class="kbd">Enter</kbd> to select</div>
	</footer>
</div>
