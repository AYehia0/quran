<!-- show the id of the clicked surah -->
<script lang="ts">
    import { page,  } from '$app/stores';
    import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
    let id = $page.params.id;

    // get the surah data
    onMount(async () => {
        let parts = id.split('-');
        goto(`/${parts[0]}/${parts[1]}`)
    });
</script>
