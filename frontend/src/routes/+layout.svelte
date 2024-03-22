<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

    // Drawer
    import Navigation from '$lib/navigation/nav.svelte';
    import { Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';

    initializeStores();

    const drawerStore = getDrawerStore();

    function toggleDrawer() {
        drawerStore.set({ 
            open: true,
            position: 'right',
            width: 'w-64',
        });
    }
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>

			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Quran</strong>
			</svelte:fragment>

            <svelte:fragment slot="trail">
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
