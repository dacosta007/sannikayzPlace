<script>
  export let linkRefPath = "#";
  export let ctaPry = false;
  export let ctaSec = false;
  export let openNextTab = false;
</script>

<a href={linkRefPath} target={openNextTab ? "_blank" : "_self"} class:cta-pry={ctaPry} class:cta-sec={ctaSec}>
  <slot></slot>
</a>

<style>
  a {
    text-decoration: none;
    text-transform: capitalize;
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 16px 32px;
    user-select: none;
    cursor: pointer;
    letter-spacing: 1px;
    font-size: 14px;
    font-weight: bold;
    transition: opacity 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7em;
  }

  .cta-pry {
    background-color: var(--clr-site-lite-pry);
    color: var(--clr-site);
  }

  .cta-sec {
    background-color: var(--clr-site-lite-sec);
    color: var(--clr-site-sec);
  }

  a:hover {
    opacity: 0.8;
  }

  a:active {
    animation: click-link 0.5s ease;
  }

  @media (max-width: 500px) {
    a {
      padding: 13px 20px;
      font-weight: 500;
      font-size: 13px;
    }
  }

  @keyframes click-link {
    from {
      transform: scale(0.9);
    }
    to {
      transform: scale(1);
    }
  }
</style>