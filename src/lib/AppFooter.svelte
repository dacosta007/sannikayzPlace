<script>
  let pageIndicator = 'home'

  const footerMenu = [
    { title: 'home', link: '/', icon: 'lni lni-home'},
    { title: 'orders', link: '/orders', icon: 'lni lni-shopping-basket' },
    { title: 'favourites', link: '/favourites', icon: 'lni lni-heart' },
    { title: 'contact', link: '/contact', icon: 'lni lni-support' }
  ]

  /* help user indicate page they are on */
  function indicatePage(event) {
    pageIndicator = event.target.dataset.page
  }
</script>

<!--
  @component
  Here is the app footer for the small devices.
  It will always show up on smaller devices

  - Usage:
  ```tsx
    <AppFooter />
  ```

  - this is use on mobile view of the app
-->

<div class="footer-nav">
  {#each footerMenu as menu}
    <div>
      <a href="{menu.link}" class:active={pageIndicator === menu.title}>
        <i class="{menu.icon}" on:click={indicatePage} on:keypress={indicatePage} data-page="{menu.title}"></i> 
        <span on:click={indicatePage} on:keypress={indicatePage} data-page="{menu.title}">{menu.title}</span>
      </a>
    </div>
  {/each}
</div>

<style>
  .footer-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
  }

  .footer-nav a {
    text-decoration: none;
    color: var(--clr-text);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2em;
    transition: 500ms ease-in-out;
  }

  .footer-nav a.active {
    color: var(--accent-info);
  }

  .footer-nav a i {
    font-size: 24px;
    font-weight: 100;
  }

  .footer-nav a span {
    font-size: 12px;
    font-family: Andika;
    font-variant: small-caps;
  }
</style>