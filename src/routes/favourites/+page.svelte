<script>
	import { onMount } from "svelte"
	import { CartStatuStore } from "$stores/CartStatuStore"
  import { CartItemStore } from "$stores/CartItemStore"
	
	import Toast from "$lib/shared/Toast.svelte"
	import Cart from "$lib/menu/cart/Cart.svelte"
	import FoodItem from "$lib/menu/foodItem/FoodItem.svelte"
  import FoodPreview from "$lib/menu/foodItem/FoodPreview.svelte"

	/* this data is from the 'layout server data load function' */
	export let data;
	
	let favourites = [];

	let previewFoodItem = false, previewItemObj = {}

  // help toggle toast notification message
  let showToast = false, foodAdded = '';

	function getFavourites() {
		const theList = JSON.parse(localStorage.getItem('favourites'));
		const getList = theList === null || theList === undefined ? [] : theList;
		const favouriteList =  getList;
		const favouriteFoods = (data.allProducts).filter(ele => favouriteList.includes(ele._id));
		return favouriteFoods;
	}
	
	/* help wait for the page to fully load(in other to access localStorage) */
	onMount(() => {
		if (window.localStorage) {
			favourites = getFavourites();
		} else {
			favourites = [];
		}
	})

	function addToBag(evt) {
    let foodId = evt.detail
    // get food from listed 'favourite products'
    let food = favourites.find(ele => ele._id === foodId)
    // console.log(food)
    
    // add quantity to props to food item that will be added to bag/cart
    food['qty'] = 1

    // filter out duplicate if already added into bag/cart & add selected food
    CartItemStore.update(items => {
      let res = items.filter(item => item._id != foodId)
      return [food, ...res]
    })

    if (previewFoodItem) previewFoodItem = false;

    // show notification that food is added to cart 
    foodAdded = food.title
    showToast = true;
  }

	/* helps preview food item when clicked upon */
  function previewFood(evt) {
    let foodId = evt.detail;
    previewItemObj = favourites.find(ele => ele._id === foodId);
    previewFoodItem = true;
  }

	/* closes the preview window */
  function closePreview(evt) {
    previewFoodItem = evt.detail;
  }

	/* help close Toast notification when open */
  function closeToast(evt) {
    let toastStatus = evt.detail
    
    if (showToast) {
      showToast = toastStatus
      foodAdded = ''
      return
    }

    return
  }
</script>


<svelte:head>
	<title>Favourites Items</title>
	<meta name="description" content="Your added favourite food items will be shown here for easier access and order placement.">
	<meta name="keywords" content="My favourite food items, Favorite foods, Favourite meals, Favourite food at Ile-Iyan">
</svelte:head>

<article class="menu-body">
	<header class="header-sec">
		<h1 class="title center-text">favourties</h1>
	</header>

	<section class="products">
		{#each favourites as prodt (prodt._id)}
		<FoodItem foodObj={prodt} on:previewFood={previewFood} on:addToCart={addToBag} />
		{:else}
      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
        <h2 style="text-align: center;">No favourites food listed</h2>
      </div>
		{/each}
	</section>

	<!-- Food item preview -->
  {#if previewFoodItem === true}
    <FoodPreview food={previewItemObj} on:addToBag={addToBag} on:closePreview={closePreview} />
  {/if}

  <!-- Cart/Bag items -->
  {#if $CartStatuStore.open === true}
    <Cart />
  {/if}

  <!-- help signify when food is added to cart -->
  {#if showToast === true}
    <Toast msg={foodAdded} {showToast} on:closeToast={closeToast} />
  {/if}
</article>

<style>
  .menu-body {
    padding: 4em 7.5em;
  }

  header {
    margin-bottom: 2em;
  }

  header h1 {
    margin-bottom: 0.7em;
  }

  .title {
    text-transform: capitalize;
    letter-spacing: 1px;
    font-size: xxx-large;
  }

	.products {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 2em;
  }

  .center-text {
    text-align: center;
  }


	@media (max-width: 500px) {
    .menu-body {
      height: 100dvh;
      overflow: auto;
      padding: 4em 0em 6em;
    }
    header {
      margin-bottom: 1.5em;
      padding-left: 1em;
    }
    header h1 {
      margin-bottom: 0.5em;
    }
    .products {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 0.8em;
      row-gap: 1.5em;
      padding: 0 0.6em;
    }
  }
</style>