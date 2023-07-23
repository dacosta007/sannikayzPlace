<script>
  import { createEventDispatcher } from 'svelte';

  import { CartItemStore } from '$stores/CartItemStore';
  import { VoucherStore } from '$stores/VoucherStore';
  import { formatCurrency } from '$lib/utilities/formatMoney';

  import Button from '$lib/shared/Button.svelte';

  export let checkoutInfo;

  let dispatch = createEventDispatcher();

  let btnProp = {
    btnType: 'button',
    btnSec: true,
    btnBlock: true
  }

  // total price of items added to cart
  let totAmt = $CartItemStore.reduce((acc, item) => {
    return acc + (item.price * item.qty)
  }, 0);

  // total items added to cart
  let totItems = $CartItemStore.reduce((acc, item) => acc + item.qty, 0);

  // holds delivery fee
  let deliveryFee = '';

  // check if voucher exist, and minus it from the total price(subTot)
  function checkVoucher(amt) {
    if ($VoucherStore.length < 0) return 0;
    let amtToBePaid = amt - ($VoucherStore.reduce((acc, item) => acc + item.amount, 0))
    return amtToBePaid;
  }

  /* help make online payment */
  function makeOnlinePayment() {
    console.log('make online payment')
  }

  /* help complete order with transfer or cash */
  function completeOrder() {
    checkoutInfo.amount = totAmt;
    // only if there are any coupon/voucher
    if ($VoucherStore.length > 0) checkoutInfo.amount = checkVoucher(totAmt);

    console.log('confirm on order')
    dispatch('toSuccess', { to: 'success', completeOrder: checkoutInfo })
  }

  /* @DESC:
    - help make payment(if payment method equals card)
    - or confirm order analysis shown to complete order placement(if not card payment)
    - but if card payment, show modal payment gateway to make payment
    - if all above are statisfied, show success message/reciept on order placed
  */
  let triggerPayment;
  if (checkoutInfo.paymentMthd === 'card') {
    triggerPayment = makeOnlinePayment;
  }
  if (checkoutInfo.paymentMthd != 'card') {
    triggerPayment = completeOrder;
  }
</script>

<article class="complete-order">
  <header class="complete-header">
    <i class="ti ti-angle-left" on:click={() => dispatch('goto', { to: 'checkout' })} on:keypress={() => dispatch('goto', { to: 'checkout' })}></i>
    <h2>complete order</h2>
  </header>

  <section class="complete-body">
    <div class="order-info">
      <div class="user-avatar"><i class="ti ti-user"></i></div>
      <div class="info">
        <div class="name">{checkoutInfo.fname} {checkoutInfo.lname}</div>
        <div class="phone">{checkoutInfo.phone}</div>
        <div class="email">{checkoutInfo.email}</div>
      </div>
    </div>
    
    {#if checkoutInfo.address}
      <!-- shipping address -->
      <div class="shipping-addr">
        <h5>shipping address</h5>
        <div class="address">{checkoutInfo.address}</div>
      </div>
    {/if}
    
    <div class="amt-analysis">
      <!-- total item in cart -->
      <div class="analysis">
        <span>items</span> 
        <div>{totItems}</div>
      </div>
      
      <!-- total amount on items in cart -->
      <div class="analysis">
        <span>amount</span>
        <div class="currency-sec">
          <span>{formatCurrency(totAmt).currency}</span>
          <span>{formatCurrency(totAmt).price}</span>
        </div>
      </div>

      <!-- if there are any voucher added(help show discount) -->
      {#if $VoucherStore.length > 0}
        <div class="analysis">
          <span>voucher</span> 
          <div class="currency-sec">
            (<span>{formatCurrency(checkVoucher(totAmt)).currency}</span><span>{formatCurrency(checkVoucher(totAmt)).price}</span>)
          </div>
        </div>
      {/if}

      <!-- if order type is delivery -->
      {#if checkoutInfo.orderMthd === 'delivery'}
        <div class="analysis">
          <span>delivery</span>
          <div class="currency-sec">
            {#if deliveryFee != ''}
              <span>{formatCurrency(deliveryFee).currency}</span>
              <span>{formatCurrency(deliveryFee).price}</span>
            {:else}
              <span>free</span>
            {/if}
          </div>
        </div>
      {/if}

      <!-- total amount payable -->
      <div class="analysis">
        <span>Amount Payable</span>
        <div class="currency-sec">
          {#if $VoucherStore.length > 0}
            <div>({formatCurrency(checkVoucher(totAmt)).currency}{formatCurrency(checkVoucher(totAmt)).price})</div>
          {:else}
            <span>{formatCurrency(totAmt).currency}</span>
            <span>{formatCurrency(totAmt).price}</span>
          {/if}
        </div>
      </div>

      <!-- make online payment or confirm order info(not card payment method) -->
      <Button {...btnProp} on:click={triggerPayment}>
        {#if checkoutInfo.paymentMthd != 'card'}
          confirm order
        {:else}
          {#if $VoucherStore.length > 0}
            <span>pay</span> 
            (<span>{formatCurrency(checkVoucher(totAmt)).currency}</span><span>{formatCurrency(checkVoucher(totAmt)).price}</span>)
          {:else}
            <span>pay</span> 
            (<span>{formatCurrency(totAmt).currency}</span><span>{formatCurrency(totAmt).price}</span>)
          {/if}
        {/if}
      </Button>
    </div>
  </section>
</article>

<style>
  .complete-order {
    background-color: var(--clr-white);
    height: 100%;
    overflow: auto;
  }
  .complete-header {
    position: relative;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
  }
  .complete-header i {
    position: absolute;
    left: 8px;
    font-size: 20px;
    border-radius: 50%;
    padding: 0.4em;
    background-color: var(--clr-text-sec);
    color: var(--clr-white);
  }
  .complete-body {
    padding: 0 1em;
  }
  .order-info {
    margin: 1em 0;
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.5em;
  }
  .info .name {
    font-size: large;
    text-transform: capitalize;
  }
  .info .phone {
    font-family: 'Andika';
    letter-spacing: 1px;
    color: #929592;
  }
  .info .email {
    color: #929592;
  }
  .user-avatar {
    text-align: center;
  }
  .user-avatar i {
    font-size: 40px;
    border-radius: 50%;
    padding: 0.6em;
    background-color: var(--clr-white-sec);
    color: #413fdf91;
  }
  .shipping-addr {
    background-color: var(--clr-sec-lite);
    border-radius: 4px;
    padding: 0.6em;
    margin: 1em 0;
  }
  .shipping-addr h5 {
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-size: small;
    color: var(--clr-sec);
  }
  .shipping-addr .address {
    font-family: Andika;
    font-size: 15px;
    color: #929592;
  }
  .amt-analysis {
    background-color: var(--clr-white-sec-lite);
    border-radius: 6px;
    padding: 1em 0.7em;
    margin-bottom: 1em;
  }
  .analysis {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    margin-bottom: 1em;
  }
  .analysis > span:nth-child(1) {
    text-transform: capitalize;
    font-weight: bold;
  }
  .analysis:last-of-type {
    font-size: large;
  }
  .currency-sec {
    display: flex;
  }
  .analysis:last-of-type .currency-sec {
    font-weight: bold;
  }
</style>