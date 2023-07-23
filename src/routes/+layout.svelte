<script>
	import AppNav from '$lib/AppNav.svelte'
	import AppFooter from '$lib/AppFooter.svelte'

	// /** @type {import('./$types').LayoutData} */
	// export let data;
	// console.log(data)
</script>


<svelte:head>
	<link rel="stylesheet" href="css/themify-icons.css">
	<link rel="stylesheet" href="css/lineicons.css">
	<link rel="stylesheet" href="css/global.css">
</svelte:head>


<header class="layout-header">
	<AppNav />
</header>

<main class="main-body">
	<slot />
</main>

<footer class="layout-footer">
	<AppFooter />
</footer>

<style>
	.layout-header, .layout-footer {
		position: fixed;
    left: 0;
    width: 100%;
    z-index: 10;
	}
	.layout-header {
		top: 0;
	}
	.layout-footer {
		display: none;
		bottom: 0;
		padding: 0.8em 1.9em 1.5em;
		background-color: var(--clr-white);
    box-shadow: 0 6px 19px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 500px) {
		.layout-footer {
			display: block;
		}
	}
</style>