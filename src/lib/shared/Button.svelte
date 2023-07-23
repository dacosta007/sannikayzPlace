<script>
  export let btnType = 'button';
  export let btnBlock = false;
  export let disableBtn = false;
  export let btnPry = false;
  export let btnSec = false;
  export let btnInverse = false;
  export let btnInversePry = false;
  export let btnInverseSec = false;
  export let btnLite = false;
  export let btnLitePry = false;
  export let btnLiteSec = false;
  export let btnRounded = false;
</script>

<button 
  type={btnType} 
  class="btn" 
  class:btn-block={btnBlock} 
  class:btn-pry={btnPry} 
  class:btn-sec={btnSec} 
  class:btn-lite={btnLite} 
  class:btn-lite-pry={btnLitePry} 
  class:btn-lite-sec={btnLiteSec} 
  class:btn-inverse={btnInverse} 
  class:btn-inverse-pry={btnInversePry} 
  class:btn-inverse-sec={btnInverseSec} 
  class:btn-rounded={btnRounded} 
  disabled={disableBtn} 
  on:click>
  <slot></slot>
</button>

<style>
  .btn {
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 14px 32px;
    user-select: none;
    cursor: pointer;
    text-transform: capitalize;
    letter-spacing: 1px;
    font-size: 15px;
    transition: opacity 0.5s ease;
    color: var(--clr-text);
  }

  .btn-block {
    width: 100%;
  }

  .btn-pry {
    background-color: var(--clr-site);
    color: var(--clr-white);
  }

  .btn-sec {
    background-color: var(--clr-sec);
    color: var(--clr-white);
  }

  .btn-inverse {
    background-color: transparent;
    border: 1px solid var(--clr-white-sec);
  }

  .btn-inverse-pry {
    background-color: transparent;
    border: 1px solid var(--clr-site);
    color: var(--clr-site);
  }

  .btn-inverse-sec {
    background-color: transparent;
    border: 1px solid var(--clr-sec);
    color: var(--clr-site-sec);
  }

  .btn-lite {
    background-color: rgb(239 238 251 / 45%);
    color: var(--clr-text);
    font-weight: bold;
  }

  .btn-lite-pry {
    background-color: var(--clr-site-lite-pry);
    color: var(--clr-site);
    font-weight: bold;
  }

  .btn-lite-sec {
    background-color: var(--clr-site-lite-sec);
    color: var(--clr-site-sec);
    font-weight: bold;
  }

  .btn-rounded {
    border-radius: 25px;
  }

  .btn:hover {
    opacity: 0.8;
  }

  .btn:active {
    animation: click-btn 0.5s ease;
  }

  .btn:disabled {
    opacity: 0.5 !important;
  }

  @media (max-width: 500px) {
    .btn {
      padding: 14px 28px;
    }
  }

  @keyframes click-btn {
    from {
      transform: scale(0.9);
    }
    to {
      transform: scale(1);
    }
  }
</style>