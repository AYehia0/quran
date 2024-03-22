<script>
    // close the drawer when a link is clicked
    import { getDrawerStore } from "@skeletonlabs/skeleton";
    const drawerStore = getDrawerStore();

    function closeDrawer() {
        drawerStore.close();
    }
</script>

<nav class="list-nav">
	<ul>
		<li><a href="/" on:click={closeDrawer}>Homepage</a></li>
		<li><a href="/bookmarks" on:click={closeDrawer}>Bookmarks</a></li>
	</ul>
</nav>
