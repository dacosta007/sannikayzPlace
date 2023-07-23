<script>
  import { CartItemStore } from "../../stores/CartItemStore"
  import { CartStatuStore } from "../../stores/CartStatuStore"

  export let showDropdown = false;

  function dropdownMenu() {
    showDropdown = !showDropdown;
  }

  // notification count (from notify store)
  let notify = 0;

  // toggle show/close cart items section
  function toggleCartItems() {
    $CartStatuStore.open = !$CartStatuStore.open;
  }
</script>


<nav class="navbar">
  <div class="nav-brand">
    <div>
      <div class="logo">sk</div> 
      <div class="site-name"><span>sannikayz</span> <span>Kitchen</span></div>
    </div>
  </div>

  <div class="nav-menu">
    <!-- notification icon menu -->
    <div class="icon">
      <i class="ti ti-bell"></i>
      {#if notify > 0}
        <span class="badge">{notify}</span>
      {/if}
    </div>
    <!-- cart icon -->
    <div class="icon">
      <i class="ti ti-bag" on:click={toggleCartItems} on:keypress={toggleCartItems}></i>
      {#if $CartItemStore.length > 0}
        <span class="badge">{$CartItemStore.length}</span>
      {/if}
    </div>
    <!-- user avatar icon with dropdown menu -->
    <div class="user-avatar">
      <div class="icon" on:click={dropdownMenu} on:keypress={dropdownMenu}>
        <i class="ti ti-menu"></i>
      </div>
      <!-- dropdown menu -->
      <div class="nav-dropdown" class:show-dropdown={showDropdown}>
        <a href="/menus">home</a>
        <a href="/user/dashboard">dashboard</a>
        <a href="/user/profile">profile</a>
        <a href="/user/orders">order</a>
        <a href="/user/receipts">receipts</a>
        
        <!-- feedback -->
        <div on:click|self="{() => {console.log('feedback modal window')}}" on:keypress="{() => {console.log('feedback modal window')}}">
          <i class="ti ti-comment-alt"></i> <span>feedback</span>
        </div>
        <!-- logout -->
        <div on:click|self="{() => {console.log('user is logged out!')}}" on:keypress="{() => {console.log('user is logged out!')}}">
          <i class="ti ti-shift-left"></i> <span>logout</span>
        </div>
      </div>
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
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
  }
</style>