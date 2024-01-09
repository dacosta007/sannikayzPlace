<script>
  import { formatCurrency } from '$lib/utilities/formatMoney';
  import ItemListTicket from './ItemListTicket.svelte';

  export let cartItem = {};
  export let showOnTicket = false; // value ie: 'ticket' or 'noTicket'
</script>

{#if showOnTicket === true}
  <ItemListTicket {cartItem} />
{/if}

{#if showOnTicket === false}
  <div class="item-list">
    <!-- item title & total quantity added to cart -->
    <div class="item-title">
      <h5>{cartItem?.title}</h5>
      <!-- quantity(Qty) -->
      <div class="item-qty">
        <span>Qty</span> <span>.</span> <span>{cartItem?.qty}</span>
      </div>
    </div>

    <!-- price of item in cart -->
    <div class="item-price">
      <small>{formatCurrency(cartItem?.price).currency}</small><span>{formatCurrency(cartItem?.price).price}</span>
    </div>
  </div>
{/if}


<style>
  .item-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.6em;
    padding-bottom: 0.5em;
    margin-bottom: 1em;
  }
  .item-title {
    line-height: 1.6;
  }
  .item-title h5 {
    font-size: medium;
    font-weight: 500;
    font-family: var(--font-andika);
    letter-spacing: 0.5px;
    text-transform: capitalize;
  }
  .item-qty {
    display: flex;
    align-items: center;
    gap: 0.3em;
    color: #8d938c;
    position: relative;
  }
  .item-qty span:nth-child(1) {
    letter-spacing: 1px;
  }
  .item-qty span:nth-child(2) {
    border: 1px solid;
    border-radius: 50%;
    height: 5px;
    width: 5px;
    background-color: #8d938c;
    transform: translateY(1px);
  }
  .item-price {
    font-weight: 500;
  }
  .item-price span {
    font-size: 16px;
  }
</style>