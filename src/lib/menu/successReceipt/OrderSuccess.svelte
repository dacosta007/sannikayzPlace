<script>
  import { CartItemStore } from "$stores/CartItemStore";
  import { CartStatuStore } from "$stores/CartStatuStore";

  export let paymentMth = ''

  function closeCart() {
    // clear all items in cart
    $CartItemStore = [];
    // close the cart item section 
    $CartStatuStore.open = !$CartStatuStore.open;
  }
</script>

<header class="success-msg">
  <!-- close ticket icon -->
  <i class="ti ti-close" on:click={closeCart} on:keypress={closeCart}></i>
  <!-- success icon -->
  <div class="success-icon"><i class="ti ti-check"></i></div>
  <!-- message -->
  <h3>success</h3>
  <h2>order placed</h2>
  <!-- only show if payment method isn't 'card' -->
  {#if paymentMth != 'card'}
    <p class="success-info">
      Your order is placed successfully. Please check your <b>email</b> to <b>make payment</b>
    </p>
  {/if}
</header>

<style>
  .success-msg {
    position: relative;
    background-color: var(--accent-success);
    color: var(--clr-white);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8em 0;
  }
  .success-msg .ti-close {
    position: absolute;
    right: 1em;
    font-size: 18px;
    color: var(--clr-white-sec);
    padding: 0.3em;
    border-radius: 50%;
    transition: background-color 500ms ease;
  } 
  .success-msg .ti-close:hover {
    background-color: #c6d2dd4f;
    cursor: pointer;
  }
  .success-icon {
    margin: 0.5em 0;
  }
  .success-icon i.ti {
    font-size: 20px;
    border: 2px solid var(--clr-white-sec);
    border-radius: 50%;
    padding: 0.3em;
  }
  .success-msg h3, .success-msg h2 {
    text-transform: capitalize;
    letter-spacing: 1px;
    font-weight: lighter;
  }
  .success-msg h3 {
    line-height: 1;
  }
  .success-info {
    text-align: center;
    padding: 0 1em;
    font-size: small;
  }
</style>