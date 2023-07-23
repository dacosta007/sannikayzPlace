<script>
  import { CartItemStore } from "$stores/CartItemStore"
  import { CartStatuStore } from "$stores/CartStatuStore"

  export let showDropdown = false;

  function dropdownMenu() {
    showDropdown = !showDropdown;
  }

  function closeDropdown(event) {
    // get dataset property of a clicked-on element and convert the object's keys into an Array
    const targetElement = event.target.parentElement?.dataset ? Object.keys(event.target.parentElement.dataset) : []

    // check if clicked element doesn't include 'dropdownMenuIcon'
    if (showDropdown === true && targetElement.includes('dropdownMenuIcon') === false) {
      showDropdown = false
      return
    }

    // console.log(Object.keys(event.target.parentElement.dataset).includes('dropdownMenuIcon'))
    return
  }

  // toggle show/close cart items section
  function toggleCartItems() {
    $CartStatuStore.open = !$CartStatuStore.open;
  }

  // for feedback form toggle
  function feedbackFrm() {
    console.log('Feedback modal window form toggle!')
  }
</script>


<!-- when dropdown is open -->
<svelte:window on:click={closeDropdown} />

<nav class="navbar">
  <div class="nav-brand">
    <div>
      <div class="logo">SP</div>
      <div class="site-name"><span>Sannikayz</span> <span>Place</span></div>
    </div>
  </div>

  <div class="nav-menu">
    <!-- cart icon -->
    <div class="icon">
      <i class="ti ti-bag" on:click={toggleCartItems} on:keypress={toggleCartItems}></i>
      {#if $CartItemStore.length > 0}
        <span class="badge">{$CartItemStore.length}</span>
      {/if}
    </div>

    <!-- user avatar icon with dropdown menu -->
    <div class="user-avatar">
      <div class="icon" data-dropdown-menu-icon="dropdownMenuIcon" on:click={dropdownMenu} on:keypress={dropdownMenu}>
        <i class="ti ti-menu"></i>
      </div>
      <!-- dropdown menu -->
      <div class="nav-dropdown" class:show-dropdown={showDropdown}>
        <a href="/" class="hide-sm">home</a>
        <a href="/orders" class="hide-sm">orders</a>
        <a href="/favourites" class="hide-sm">favourites</a>
        <a href="/contact" class="hide-sm">contact</a>
        
        <!-- feedback -->
        <div on:click|self="{feedbackFrm}" on:keypress="{feedbackFrm}">
          <i class="ti ti-comment-alt"></i> <span>feedback</span>
        </div>
      </div>
  </div>
</nav>

<style>
  .navbar {
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 1em 7.5em;
    background: var(--clr-white);
    box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.05);
  }

  .nav-brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-brand > div:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 0.8em;
  }

  .nav-brand > div:nth-child(2) {
    display: none;
  }

  .logo {
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding: 0.5em;
    border-radius: 50px;
    background: var(--clr-sec);
    color: var(--clr-white-sec);
  }

  .site-name {
    display: grid;
    line-height: 0.9;
    font-weight: bold;
  }

  .site-name span:nth-child(1) {
    text-transform: capitalize;
    color: var(--clr-text-sec);
  }

  .site-name span:nth-child(2) {
    font-variant: all-small-caps;
    color: var(--clr-site-sec);
  }

  .nav-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1.5em;
  }

  .user-avatar {
    position: relative;
  }

  .nav-dropdown {
    position: absolute;
  }
  .icon {
    position: relative;
  }
  i.ti {
    font-size: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    padding: 0.5em;
    border-radius: 50%;
    transition: background-color 0.5s ease;
  }

  i.ti:hover {
    background-color: var(--clr-white-sec);
    cursor: pointer;
  }

  .badge {
    position: absolute;
    top: 4px;
    right: 0;
    text-align: center;
    background-color: var(--clr-sec);
    color: var(--clr-white-sec);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-dropdown {
    position: absolute;
    z-index: 12;
    right: 0em;
    top: 5em;
    border: 1px solid rgb(231 231 231 / 40%);
    border-radius: 8px;
    min-width: 180px;
    display: none;
    gap: 0.4em;
    background-color: var(--clr-white);
    box-shadow: 0px 12px 25px rgb(0 0 0 / 8%);
  }

  .nav-dropdown a, .nav-dropdown div {
    font-size: 16px;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    padding: 0.5em 1em;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.5s ease;
  }

  .nav-dropdown a:hover, .nav-dropdown div:hover {
    background-color: var(--clr-white-sec);
    cursor: pointer;
  }

  .nav-dropdown div {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .nav-dropdown div i.ti {
    font-size: 18px;
  }

  .show-dropdown {
    display: grid !important;
  }

  @media (max-width: 500px) {
    .navbar { 
      padding: 1em 1.5em;
      gap: 1em;
    }
    .hide-sm {
      display: none;
    }
  }
</style>