<script>
  import { fade } from 'svelte/transition';
  import { CartItemStore } from '$stores/CartItemStore';

  import CartList from './CartList.svelte';
  import Checkout from './Checkout.svelte';
  import CompleteOrder from './CompleteOrder.svelte';
  import SuccessReceipt from '../successReceipt/SuccessReceipt.svelte';

  // customer checkout info
  let checkoutInfo = {};

  // active menu section tab menu to show
  let activeMenu = 'cart';
  
  // handle change in active menu
  function changeMenu(evt) {
    activeMenu = evt.detail.to;
    if (evt.detail.user) checkoutInfo = evt.detail.user;
  }

  // switch to success/receipt section
  async function changeToSuccess(evt) {
    checkoutInfo = evt.detail.completeOrder;
    activeMenu = evt.detail.to;
  }
</script>

<aside class="cart-container" transition:fade>
  <!-- help list items added to the cart -->
  {#if activeMenu === 'cart'}
    <CartList on:goto={changeMenu} />
  {/if}
  <!-- collect relevant info on order to be placed -->
  {#if activeMenu === 'checkout'}
    <Checkout on:goto={changeMenu} />
  {/if}
  <!-- complete order selected in cart -->
  {#if activeMenu === 'complete'}
    <CompleteOrder {checkoutInfo} on:goto={changeMenu} on:toSuccess={changeToSuccess} />
  {/if}
  {#if activeMenu === 'success'}
    <SuccessReceipt {checkoutInfo} />
  {/if}
</aside>

<style>
  .cart-container {
    position: fixed;
    right: 10px;
    bottom: 5em;
    z-index: 8;
    width: 400px;
    height: 75vh;
    border: 1px solid var(--clr-white-sec-lite);
    background-color: var(--clr-white);
    box-shadow: 0 7px 25px rgb(0 0 0 / 5%);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  @media (max-width: 600px) {
    .cart-container {
      z-index: 11; /* should exceed the layout wrapper (for better UX on mobile devices) */
      width: 100%;
      border: none;
      border-radius: 0;
      right: 0;
      bottom: 0;
    }
  }

  @media (max-width: 600px) and (min-height: 800px) {
    .cart-container {
      height: 100dvh;
    }
  }

  @media (max-width: 600px) and (max-height: 799px) {
    .cart-container {
      height: clamp(100dvh, 100dvh, 100svh);
    }
  }
</style>

