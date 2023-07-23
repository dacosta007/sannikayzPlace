<script>
  import { CartStatuStore } from "$stores/CartStatuStore"
  import { CartItemStore } from "$stores/CartItemStore"

  import TabMenu from "$lib/menu/TabMenu.svelte"
  import Cart from "$lib/menu/cart/Cart.svelte"
  import FoodItem from "$lib/menu/foodItem/FoodItem.svelte"
  import FoodPreview from "$lib/menu/foodItem/FoodPreview.svelte"
  import Toast from "$lib/shared/Toast.svelte"
  import OnBoarding from "$lib/menu/onboarding/OnBoarding.svelte"

  export let data
  
  // holds the selected tab menu
  let tabActiveMenu = ''

  // holds all products
  let allProdts = data?.products ?? [], filterProdts = [], tempAllProdts = data?.products ?? []

  let previewFoodItem = false, previewItemObj = {}

  // help toggle toast notification message
  let showToast = false, foodAdded = ''

  /* help user toggle between food menu categories listed */
  function activeMenu(evt) {
    tabActiveMenu = evt.detail;

    // help return all products data from variable temporarily holding all product datta(tempAllProdts)
    if (tabActiveMenu === 'all') {
      allProdts = tempAllProdts;
      return;
    }
    // help hold all products data: not to query db or store in the future 
    if (tabActiveMenu != 'all') {
      filterProdts = tempAllProdts;
    }

    // get filtered result according to selected tab menu
    filterProdts = filterProdts.filter((prod) => prod.category.includes(tabActiveMenu));
    allProdts = filterProdts;
  }

  function addToBag(evt) {
    let foodId = evt.detail
    // get food from listed products(food items gotten from DB when page was fully loaded)
    let food = tempAllProdts.find(ele => ele._id === foodId)
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

  /* helps preview food item when clicked upon */
  function previewFood(evt) {
    let foodId = evt.detail;
    previewItemObj = tempAllProdts.find(ele => ele._id === foodId);
    previewFoodItem = true;
  }

  /* closes the preview window */
  function closePreview(evt) {
    previewFoodItem = evt.detail;
  }

  /* $: {
    // closes toast notification after half a seconds
    if (showToast === true) {
      console.log('closing toast notification!...')
      setTimeout(() => {
        showToast = false
        console.log('Toast notification closed!')
      }, 500)
    }
  } */
</script>


<svelte:head>
  <title>Sannikayz Place</title>
  <meta name="description" content="Sannikayz Place food restaurant, and delivery. Home to one of the tasty and delicious food in Lagos.">
  <meta name="keywords" content="Sannikayz Place, Ile-Iyan, delicious food restaurant in Lagos">
</svelte:head>

<section class="menu-body">
  <!-- onboarding section: show once on every device for the first time visiting -->
  <!-- <OnBoarding /> -->

  <header class="header-sec">
    <h1 class="title center-text">menu</h1>
    <!-- the tab menu for food/meal categories -->
    <TabMenu products={data.products} on:activeMenu={activeMenu} />
  </header>

  <section class="products">
    {#each allProdts as prodt (prodt._id)}
      <FoodItem foodObj={prodt} on:previewFood={previewFood} on:addToCart={addToBag} />
    {:else}
      <p>No product listed</p>
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
</section>

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