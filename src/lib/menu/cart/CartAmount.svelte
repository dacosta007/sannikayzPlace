<script>
  import { CartItemStore } from '../../../stores/CartItemStore';
  import { VoucherStore } from '../../../stores/VoucherStore';
  import { formatCurrency } from '$lib/utilities/formatMoney';

  // total price of items added into cart
  $:subTot = $CartItemStore.reduce((acc, item) => {
    return acc + (item.price * item.qty)
  }, 0);

  // total quantity of items added to cart
  $:totQty = $CartItemStore.reduce((acc, item) => acc + item.qty, 0);

  // check if voucher exist, and minus it from the total price(subTot)
  function checkVoucher(amt) {
    if ($VoucherStore.length < 0) return 0;
    let amtToBePaid = amt - ($VoucherStore.reduce((acc, item) => acc + item.amount, 0))
    return amtToBePaid;
  }
</script>

<div class="amount-analysis">
  <div>
    <span>subtotal</span> 
    <span class="amount">
      <span>{formatCurrency(subTot).currency}</span><span>{formatCurrency(subTot).price}</span>
    </span>
  </div>
  <div>
    <span>quantities</span> <span class="qty">{totQty}</span>
  </div>
  {#if $VoucherStore.length > 0}
    <div>
      <span>voucher</span> 
      <span class="amount">
        (<span>{formatCurrency(checkVoucher(subTot)).currency}</span><span>{formatCurrency(checkVoucher(subTot)).price}</span>)
      </span>
    </div>
  {/if}

  <div>
    <span>total</span> 
    <span class="t-amount">
      <span>{formatCurrency(subTot).currency}</span><span>{formatCurrency(subTot).price}</span>
    </span>
  </div>
</div>

<style>
  .amount-analysis {
    padding: 1.2em 1.5em;
    display: grid;
    gap: 0.3em;
  }

  .amount-analysis > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .amount-analysis > div > span:first-child {
    text-transform: capitalize;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .amount-analysis > div:last-child > span:nth-child(1) {
    font-size: 1.3em;
  }

  .amount-analysis .amount, .amount-analysis .qty, .amount-analysis .t-amount {
    color: var(--clr-sec);
  }

  .amount span:nth-child(1), .t-amount span:nth-child(1) {
    font-size: 12px;
  }

  .amount span:nth-child(2) {
    font-size: 15px;
  }

  .t-amount span {
    font-weight: bold;
  }

  .t-amount span:nth-child(2) {
    font-size: 18px;
  }
</style>