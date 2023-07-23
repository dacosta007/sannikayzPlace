<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let toggleNavMenu;
  let addNavShadow = false;
  let showNavMenu = false;

  let closeIcon = false;

  // for active menu click
  let activeMenu = "home";
  function handleActiveMenu(menuName) {
    dispatch("menuLink", activeMenu);
    activeMenu = menuName;
  }

  // for mobile menu toggle
  function toggleNav() {
    if (closeIcon == false) {
      closeIcon = true;
      showNavMenu = true;
    } else {
      closeIcon = false;
      showNavMenu = false;
    }
  }
</script>

<nav class="navbar" class:navbar-shadow={!addNavShadow}>
  <div class="nav-brand">
    <div>
      <div class="logo">sk</div> 
      <div class="site-name"><span>sannikayz</span> <span>Kitchen</span></div>
    </div>
    <div>
      {#if closeIcon}
        <i class="ti-close" on:click={toggleNav}></i>
      {:else}
        <i class="ti-menu" on:click={toggleNav}></i>
      {/if}
    </div>
  </div>
  <!-- navbar menus -->
  <div class="nav-menu" class:show-nav-menu={showNavMenu}>
    <div class="menus">
      <a href="/" class:active={activeMenu === 'home'} on:click={() => handleActiveMenu('home')}>home</a>
      <a href="/menu" class:active={activeMenu === 'menu'} on:click={() => handleActiveMenu('menu')}>menu</a>
      <a href="/services" class:active={activeMenu === 'services'} on:click={() => handleActiveMenu('services')}>services</a>
      <a href="/about" class:active={activeMenu === 'about'} on:click={() => handleActiveMenu('about')}>about us</a>
      <a href="/contact" class:active={activeMenu === 'contact'} on:click={() => handleActiveMenu('contact')}>contact us</a>
    </div>
    <!-- auth link buttons -->
    <div class="auth-links">
      <a href="/auth/login">login</a>
      <a href="/auth/signup">sign up</a>
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

  .navbar-shadow {
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

  .active {
    color: var(--clr-site-sec) !important;
  }

  .nav-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .menus {
    display: flex;
    align-items: center;
    gap: 2em;
  }

  .menus a {
    text-decoration: none;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    user-select: none;
    color: var(--clr-text-sec);
    font-weight: bold;
    padding: 1em;
    border-radius: 4px;
  }

  .auth-links {
    display: flex;
    text-align: center;
    justify-content: space-between;
    gap: 1em;
    min-width: 230px;
  }

  .auth-links a {
    text-decoration: none;
    text-transform: capitalize;
    padding: 0.7em;
    letter-spacing: 1px;
    border-radius: 30px;
    font-weight: bold;
    min-width: 100px;
    user-select: none;
  }

  .auth-links a:active {
    animation: click-btn 0.5s ease;
  }

  .auth-links a:nth-child(1) {
    background-color: var(--clr-white-sec-lite);
    color: var(--clr-text-sec);
  }

  .auth-links a:nth-child(2) {
    background-color: var(--clr-site);
    color: var(--clr-white);
  }

  @keyframes click-btn {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .navbar {
      padding: 1em 2.5em;
    }

    .menus {
      gap: 0.8em;
    }

    .menus a {
      padding: 0.5em;
    }

    .auth-links {
      min-width: auto;
    }

    .auth-links a {
      padding: 0.7em;
    }
  }

  @media (max-width: 500px) {
    .navbar {
      padding: 1em 1em;
      grid-template-columns: 1fr;
    }

    .nav-brand {
      padding: 0.6em 0;
    }

    .nav-brand > div:nth-child(2) {
      display: inherit;
      font-size: 2em;
      padding: 0.2em;
      border-radius: 50%;
      transition: background 0.5s ease;
    }

    .nav-brand > div:nth-child(2):hover {
      background: rgb(233 233 233 / 28%);
      cursor: pointer;
    }

    .nav-menu {
      display: none;
      flex-direction: column;
      border-top: 1px solid var(--clr-white-sec-lite);
    }

    .show-nav-menu {
      display: flex !important;
    }

    .menus {
      flex-direction: column;
      gap: 1em;
      margin-bottom: 2em;
      margin-top: 1em;
    }

    .menus a {
      width: 100%;
      text-align: center;
    }

    .auth-links {
      flex-direction: column;
      gap: 1.3em;
    }

    .auth-links a {
      padding: 1em;
    }
  }
</style>