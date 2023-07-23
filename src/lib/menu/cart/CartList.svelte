<script>
  import { createEventDispatcher } from "svelte";

  import { CartItemStore } from "$stores/CartItemStore";
  import { CartStatuStore } from "$stores/CartStatuStore";

  import Button from "$lib/shared/Button.svelte";
  import CartItem from "./CartItem.svelte";
  import Voucher from './Voucher.svelte';
  import CartAmount from './CartAmount.svelte';

  let dispatch = createEventDispatcher();

  let btnProp = {
    btnType: 'button',
    btnBlock: true,
    btnPry: true,
    disableBtn: true
  }

  /* help with constant checking of 'Cart Items state' if not empty to disabled/enable the button for clicking */
  $: {
    $CartItemStore.length > 0 ?  btnProp.disableBtn = false : btnProp.disableBtn = true;
  }

  // toggle show/close cart items section
  function toggleCartItems() {
    $CartStatuStore.open = !$CartStatuStore.open;
  }
</script>

<article class="cart-body">
  <header class="cart-item-header">
    <i class="ti ti-angle-left" on:click={toggleCartItems} on:keypress={toggleCartItems}></i>
    <h2 class="title">cart list</h2>
  </header>

  <!-- all food added in the food cart -->
  <div class="cart-items">
    {#each $CartItemStore as foodItem (foodItem._id)}
      <CartItem {foodItem} />
    {:else}
      <div class="empty-cart">
        <div class="empty-img">
          <img src="imgs/empty_cart.svg" alt="empty cart" width="100" height="auto">
        </div>
        <p>Cart is empty</p>
      </div>
    {/each}
  </div>
</article>

<footer class="cart-footer">
  <!-- coupon/voucher section -->
  <Voucher />
  
  <!-- meal total amount analysis -->
  <CartAmount />
  
  <!-- checkout button -->
  <div class="checkout-btn-container">
    <Button {...btnProp} on:click={() => dispatch('goto', { to: 'checkout' })}>
      checkout
    </Button>
  </div>
</footer>

<style>
   .cart-body {
    position: relative;
    width: 100%;
    height: 100%;
    isolation: isolate;
  }

  .cart-item-header {
    position: absolute;
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #394abd;
    color: var(--clr-white-sec);
    padding: 1em;
    text-transform: capitalize;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .cart-item-header .ti {
    position: absolute;
    left: 8px;
    font-size: 20px;
    border-radius: 50%;
    padding: 0.4em;
    background-color: var(--clr-white-sec);
    color: var(--clr-text-sec);
    transition: background-color 0.5s ease;
  }

  .cart-item-header .ti:hover {
    cursor: pointer;
    background-color: var(--clr-white-sec-lite);
    user-select: none;
  }

  .cart-item-header .ti:active {
    animation: clickBtn 0.5s ease;
  }

  .cart-items {
    position: relative;
    overflow: auto;
    padding-top: 5em;
    max-height: 380px;
  }

  .empty-cart {
    height: 265px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .empty-img {
    width: 160px;
    height: 160px;
    position: relative;
  }

  .empty-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  .empty-cart p {
    font-weight: bold;
    font-size: large;
  }

  .cart-footer {
    width: 100%;
  }

  .checkout-btn-container {
    padding: 1em 1.5em;
  }

  @media (max-width: 600px) {
    .cart-item-header {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }

  @media (max-width: 600px) and (min-height: 752px) {
    .cart-items {
      position: absolute;
      width: 100%;
      height: 100%;
      max-height: inherit;
    }
  }

  @media (max-width: 600px) and (min-height: 751px) and (max-height: 815px) {
    .cart-items {
      position: absolute;
      width: 100%;
      height: 100%;
      max-height: inherit;
    }
  }

  @media (max-width: 600px) and (min-height: 700px) and (max-height: 750px){
    .cart-items {
      position: absolute;
      width: 100%;
      height: 100%;
      max-height: inherit;
    }
  }

  @media (max-width: 600px) and (max-height: 699px) {
    .cart-items {
      position: absolute;
      width: 100%;
      height: 100%;
      max-height: initial;
    }
  }
</style>