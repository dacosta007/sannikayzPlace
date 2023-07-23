<script>
  import { createEventDispatcher } from "svelte";

  export let products

  let dispatch = createEventDispatcher();

  let activeTab = 'all';

  /* help extract food categories from product props gotten from parent component */
  function tabFoodMenus() {
    // get food menu from food categories
    let foodMenuCategories = products;
    // extract tab menues from food category(array value)
    let menues = foodMenuCategories.map(ele => ele.category.toString()).join(',').split(',');
    // filter out duplicate and return remaining values
    return Array.from(new Set(menues));
  }

  const menues = tabFoodMenus()

  function handleActiveTab(event) {
    activeTab = (event.target.innerText).toLowerCase();
    dispatch('activeMenu', activeTab)
  }
</script>

<!-- 
  @component
  Help create and list food categories from product provided by parent container

  - Usage: 
  ```tsx
    <TabMenu products={} />
  ```
-->

<!-- list all the categories available according to products provided -->
<div class="nav-tab">
  <button type="button" class:active={activeTab === 'all'} class="nav-pill" on:click={handleActiveTab}>all</button>
  {#each menues as menu}
    <button type="button" class:active={activeTab === menu} class="nav-pill" on:click={handleActiveTab}>{menu}</button>
  {/each}
</div>

<style>
  .nav-tab {
    display: flex;
    gap: 1em;
    overflow: auto;
  }

  .nav-tab.nav-tab::-webkit-scrollbar {
    height: 3px;
  }

  .nav-pill {
    outline: none;
    user-select: none;
    border: none;
    border-radius: 25px;
    padding: 9px 36px;
    font-size: 14px;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    background-color: var(--clr-white-sec-lite);
    transition: background-color 0.5s ease-in-out;
    cursor: pointer;
    margin-bottom: 0.5em;
  }

  .nav-pill:active {
    animation: clickBtn 0.5s ease;
  }

  .nav-tab .active {
    background-color: var(--clr-text);
    color: var(--clr-white-sec);
    transition: background-color 0.5s ease;
  }

  @keyframes clickBtn {
    from {
      transform: scale(0.9);
    }
    to {
      transform: scale(1);
    }
  }
  
  @media (max-width: 500px) {
    .nav-tab {
      justify-content: flex-start;
      overflow-x:auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
    }
    .nav-tab::-webkit-scrollbar {
      display: none;
    }
  }
</style>