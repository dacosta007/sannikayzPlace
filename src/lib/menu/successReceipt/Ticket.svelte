<script>
  import { formatCurrency } from "$lib/utilities/formatMoney";
  import { CartItemStore } from '$stores/CartItemStore';
  import ItemList from "$lib/menu/cart/ItemList.svelte";

  export let checkoutInfo = {};
  export let orderInfo = {}; // data from other components order than cart component

  /* for order placed date-time */
  function orderDateTime() {
    let date, time;

    if (orderInfo?._id != undefined) {
      let orderDate = new Date(orderInfo?.date);
      date = orderDate.toDateString();
      time = orderDate.toLocaleTimeString()
      return { date, time };
    }

    const dt = new Date();
    date = dt.toDateString();
    time = dt.toLocaleTimeString();
    return { date, time };
  }

  // using component with other component provided data
  if (orderInfo?._id != undefined) {
    checkoutInfo = orderInfo;
  }

  // total items added to cart
  let totItems = orderInfo?.orders === undefined ?  $CartItemStore.length : (orderInfo?.orders).length;

  // total quantities added to cart
  let totQty = orderInfo?.orders === undefined ? $CartItemStore.reduce((acc, item) => acc + item.qty, 0) : (orderInfo?.orders).reduce((acc, item) => acc + item.qty, 0);
</script>

<section class="ticket">
  <header class="ticket-header">
    <!-- site logo -->
    <div class="logo-sec">
      <!-- <div class="logo">sp</div> 
      <div class="site-name"><span>sannikayz</span> <span>Place</span></div> -->
      <div class="logo-cont">
        <img src="/Ile-Iyan_logo.png" alt="site_logo" width="200" height="auto">
      </div>
    </div>
    <!-- company's address -->
    <div class="firm-address">Plot 6, Muiz Banires street, Lekki Phase 1</div>
    <!-- company's contact email & phone -->
    <small>ileiyan234@gmail.com, +234 902 4475 402</small>
  </header>

  <article class="ticket-body">
    <!-- a "paid watermark" (appears when payment is fully made) -->
    {#if checkoutInfo.payStatus === 'paid'}
      <div class="t-watermark-container">
        <div class="watermark">
          <img src="/imgs/paid_stamp.png" alt="paid_watermark" sizes="150" height="auto">
        </div>
      </div>
    {/if}

    <!-- main ticket body -->
    <div class="t-main-body">
      <h5>order info</h5>
      <div class="order-info">
        <!-- customer name & email -->
        <div>
          <span>{checkoutInfo.fname} {checkoutInfo.lname}</span>
          <span>{checkoutInfo.email}</span>
        </div>
        <!-- order method -->
        <div>
          <span>order type</span> <span>{checkoutInfo.orderMthd}</span>
        </div>
        <!-- order status -->
        <div>
          <span>status</span> 
          {#if checkoutInfo.payStatus === 'paid'}
            <!-- if already paid -->
            <span style="color: #413fdfcf; letter-spacing: 1px;">{checkoutInfo.status}</span>
          {:else}
            <!-- just placed recently placed order(only transfer & cash option available for now) -->
            {#if checkoutInfo.paymentMthd != 'card'}
              <span style="color: var(--accent-warning); letter-spacing: 1px;">pending</span>
            {:else}
              <span style="color: #413fdfcf; letter-spacing: 1px;">preparing</span>
            {/if}
          {/if}
        </div>
        <!-- order id/invoice id -->
        <div>
          <span>order ID</span> <span>{checkoutInfo.orderId}</span>
        </div>
        <!-- date-time when order was placed -->
        <div>
          <span>date & time</span> <span>{orderDateTime().date} {orderDateTime().time}</span>
        </div>
      </div>
  
      <!-- payment method -->
      <div class="payment-method">
        <span>payment method</span> <span>{checkoutInfo.paymentMthd}</span>
      </div>
  
      <!-- ordered items -->
      <div class="ordered-items">
        {#if checkoutInfo._id != undefined}
          {#each checkoutInfo.orders as item}
            <ItemList cartItem={item} showOnTicket={true} />
          {/each}
        {:else}
          {#each $CartItemStore as item}
            <ItemList cartItem={item} showOnTicket={true} />
          {/each}
        {/if}
      </div>
  
      <div class="pay-details">
        <!-- total items of food -->
        <div>
          <span>items</span> <span>{totItems}</span>
        </div>
        <div>
          <span>quantities</span> <span>{totQty}</span>
        </div>
        <div>
          <span>amount</span> <span style="font-weight: bold;">{formatCurrency(checkoutInfo.amount).currency}{formatCurrency(checkoutInfo.amount).price}</span>
        </div>
      </div>
  
      <!-- caveat(only if payment status is 'unpaid') -->
      {#if checkoutInfo.payStatus === 'unpaid'}
        <p class="caveat">
          order status is noted <b>pending</b> until payment is confirmed. Thereafter, 
          you will be notified by a phone call or an email.
        </p>
      {/if}
  
      <!-- ticket cut-off line mark -->
      <div class="ticket-cut-off"></div>
  
      <!-- receipt barcode(receipt ID) -->
      <div class="receipt-baracode">{checkoutInfo.orderId}</div>
      <div class="barcode-id">{checkoutInfo.orderId}</div>
    </div>
  </article>

  <footer class="ticket-footer">
    <small>Thanks for your patronage</small>
    <small>powered by <b>AIMs Consult</b></small>
  </footer>
</section>

<style>
  .ticket {
    margin: 0.8em 1.5em;
    background-color: var(--clr-white);
    border-radius: 10px;
  }
  .ticket-header {
    padding: 0.8em 0.5em;
    text-align: center;
  }
  .logo-sec {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    padding: 0.5em 0 0;
  }
  .firm-address {
    font-size: 13px;
    font-family: 'Andika';
    margin-top: 3px;
    margin-bottom: -5px;
    color: #aba7bb;
  }
  .ticket-header small {
    font-family: 'Andika';
    font-size: 11px;
    color: #aba7bb;
  }
  .ticket-body {
    position: relative;
  }
  .ticket-body h5 {
    font-size: 14px;
    font-family: 'Andika';
    font-weight: lighter;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0.2em 1em;
    color: #aba7bb;
  }
  .t-watermark-container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .watermark {
    width: 150px;
    height: 150px;
    position: relative;
  }
  .watermark img {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-position: center;
    object-fit: contain;
    filter: opacity(0.2);
  }
  .t-main-body {
    position: relative;
    z-index: 1;
  }
  .order-info {
    padding: 0 1em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5em;
  }
  .order-info div {
    display: grid;
  }
  .order-info div:nth-child(even) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .order-info div:nth-child(1) span:nth-child(1) {
    text-transform: capitalize;
    text-overflow: ellipsis;
  }
  .order-info div:nth-child(1) span:nth-child(2) {
    color: #a7a4c1;
  }
  .order-info div:not(:nth-child(1)) span:nth-child(1) {
    font-family: 'Andika';
    text-transform: uppercase;
    font-variant: all-small-caps;
    font-size: 15px;
    color: #aabba7;
    line-height: 1;
  }
  .order-info div:not(:nth-child(1)) span:nth-child(2) {
    text-transform: capitalize;
    font-family: 'Andika';
  }
  .payment-method {
    margin: 0.5em 0;
    padding: 0.5em 1em;
    border-top: 1px solid var(--clr-white-sec);
    border-bottom: 1px solid var(--clr-white-sec);
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: capitalize;
  }
  .payment-method span:nth-child(1) {
    font-family: 'Andika';
    font-size: 13px;
    text-transform: uppercase;
    color: #aabba7;
  }
  .payment-method span:nth-child(2) {
    font-family: 'Andika';
    text-transform: capitalize;
    letter-spacing: 1px;
    color: #7a7cd9;
  }
  .ordered-items {
    padding: 0 1em;
    border-bottom: 1px dashed #6f837345;
  }
  .pay-details {
    padding: 0.5em 1em;
  }
  .pay-details div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pay-details div span:nth-child(1) {
    text-transform: capitalize;
    color: #8da1a9;
  }
  .pay-details div span:nth-child(2) {
    font-family: 'Andika';
  }
  .pay-details div:nth-child(2) span:nth-child(2) {
    font-weight: bold;
  }
  .caveat {
    padding: 0.4em 1em;
    margin: 0 1em;
    background-color: rgb(250 177 51 / 12%);
    color: var(--accent-warning);
    border-radius: 4px;
    font-size: 13px;
    font-family: 'Andika';
  }
  .caveat::first-letter {
    text-transform: capitalize;
  }
  .receipt-baracode {
    font-family: Barcode;
    text-align: center;
    padding: 0.9em 0 0;
    font-size: 40px;
    line-height: 0;
    margin-bottom: 0.2em;
    color: var(--clr-text-sec);
  }
  .barcode-id {
    text-align: center;
    margin-top: -0.5em;
    font-weight: bold;
    font-family: 'Barlow', Montserrat;
    color: var(--clr-text-sec);
  }
  .ticket-cut-off {
    border: 1px dashed var(--clr-white-sec);
    margin-top: 0.9em;
    position: relative;
  }
  .ticket-cut-off::before, .ticket-cut-off::after {
    width: 18px;
    height: 18px;
    background-color: var(--clr-white-sec);
    content: '';
    position: absolute;
    border-radius: 50%;
    top: -10px;
  }
  .ticket-cut-off::before {
    left: -8px;
  }
  .ticket-cut-off::after {
    right: -8px;
  }
  .ticket-footer {
    display: grid;
    justify-content: center;
    padding: 0.5em 1em 0.8em;
  }
  .ticket-footer small {
    text-align: center;
  }
  .ticket-footer small:nth-child(2) {
    text-transform: capitalize;
    color: #989aab;
    font-family: 'Barlow', Montserrat;
    font-size: 11px;
  }
</style>