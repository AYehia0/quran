<script lang="ts">
	import '../app.postcss';
    import SearchAyah from '$lib/models/Search/AyahSearch.svelte';
	import { AppShell, AppBar, Modal } from '@skeletonlabs/skeleton';
    import '@fortawesome/fontawesome-free/css/fontawesome.css';

    // Drawer
    import Navigation from '$lib/navigation/nav.svelte';
    import { Drawer, getDrawerStore, initializeStores, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

    initializeStores();

    const drawerStore = getDrawerStore();
    const modalStore = getModalStore();

    function toggleDrawer() {
        drawerStore.set({ 
            open: true,
            position: 'right',
            width: 'w-64',
        });
    }

    // search functionality
    function triggerSearch() {
        const model: ModalSettings = {
            type: 'component',
            component: 'modelSearch',
            position: 'item-start'
        }
        modalStore.trigger(model);
    }

    // trigger search bar on "Shift + s"
    function onWindowKeyDown(event: KeyboardEvent) {
        // TODO: support mac meta key
        if (event.shiftKey && event.key === 'S') {
            event.preventDefault();

            // if the modal is already open, close it
            $modalStore.length ? modalStore.close() : triggerSearch();
        }
    }

    // register the search modal
    const modalComponentReg: Record<string, ModalComponent> = {
        modelSearch: {
            ref: SearchAyah,
        }
    }

</script>

<!-- App Shell -->
<!-- Overlays -->
<Modal components={modalComponentReg} />
<svelte:window on:keydown|stopPropagation={onWindowKeyDown} />
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>

			<svelte:fragment slot="lead">
                <!-- Logo -->
                <div class="flex items center">
                    <img src="/logo.png" alt="Logo" class="w-8 h-8" />
                    <h1 class="ml-2 text-lg font-bold">Quran</h1>
                </div>
			</svelte:fragment>

            <svelte:fragment slot="trail">
                <!-- Search -->
                <div class="md:inline md:ml-4">
                    <button class="btn space-x-4 variant-soft hover:variant-soft-primary" on:click={triggerSearch}>
                        <i class="fa-solid fa-magnifying-glass text-sm" /><span>Shift + S</span>
                    </button>
                </div>
                <div class="flex items-center">
                    <button class="btn btn-sm ml-4" on:click={toggleDrawer}>
                        <span>
                            <svg viewBox="0 0 100 80" class="fill-token
                                w-4 h-4">
                                <rect width="100" height="20" />
                                <rect y="30" width="100" height="20" />
                                <rect y="60" width="100" height="20" />
                            </svg>
                        </span>
                    </button>
                </div>
            </svelte:fragment>
        </AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarRight">
        <Drawer>
			<h2 class="p-4">Settings</h2>
			<hr class="mb-4" />
            <Navigation/>
        </Drawer>
    </svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
