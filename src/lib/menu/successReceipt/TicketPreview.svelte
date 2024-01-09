<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import { formatCurrency } from "$lib/utilities/formatMoney"

  export let ticketInfo = {};

  let dispatch = createEventDispatcher();

  // help with converting to readable date for the customer
  function toReadableDate(dt) {
    let date = new Date(dt).toDateString();
    date = date.slice(4);
    return date;
  }

  // help trigger custom event to show full ticket/receipt
  function showFullTicket() {
    dispatch("showTicket", true)
  }
</script>

<div class="slip-container" in:fly={{x: -50, duration: 500, delay: 100}}>
  <!-- ticket brief info -->
  <div class="brief-info-sec">
    <!-- ticket status(payment: pending/paid), tracking status(preparing/on-route/served/completed), amount -->
    <div class="status-sec">
      <div class="status" class:paid={ticketInfo.payStatus === 'paid'} class:unpaid={ticketInfo.payStatus === "unpaid"}>
        <span>payment</span>
        <span>{ticketInfo?.payStatus === 'unpaid' ? 'pending' : 'paid'}</span>
      </div>
      <div class="status track-status" class:completed={ticketInfo.status === 'completed' || ticketInfo.status === 'served'}>
        <span>order</span>
        <span>{ticketInfo?.status}</span>
      </div>
      <div class="amount">
        <small>{formatCurrency(ticketInfo?.amount).currency}</small>
        <span>{formatCurrency(ticketInfo?.amount).price}</span>
      </div>
    </div>
    <!-- order ID, & total items ordered -->
    <div class="ticket-id-sec">
      <h4>{ticketInfo?.orderId}</h4>
      <div class="items-count">{(ticketInfo?.orders).length} items</div>
    </div>
    <!-- date, track btn, view ticket btn -->
    <div class="cta-sec">
      <div>
        {toReadableDate(ticketInfo?.date)}
      </div>
      <div class="cta-btn">track</div>
      <div class="cta-btn" on:click={showFullTicket} on:keypress={showFullTicket}>view</div>
    </div>
  </div>

  <!-- ticket barcode -->
  <div class="barcode-sec">
    <div class="slip-barcode">{ticketInfo?.orderId}</div>
  </div>
</div>

<style>
  .slip-container {
    background-color: var(--clr-white);
    border-radius: 4px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
  .status-sec, .cta-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8em;
    line-height: 1.3;
  }
  .status-sec > div {
    display: grid;
  }
  .status span:nth-child(1) {
    font-size: 11px;
    letter-spacing: 0.3px;
    text-transform: capitalize;
    color: #9fa796;
  }
  .status span:nth-child(2) {
    font-variant: all-petite-caps;
    letter-spacing: 0.5px;
	}
  .amount {
    font-weight: bold;
    font-size: 1.3em;
    font-family: var(--font-montserrat);
    color: var(--clr-site-sec);
    display: inline-block !important;
  }
  .paid {
    color: var(--accent-success);
  }
  .unpaid {
    color: var(--accent-warning)
  }
  .completed {
    color: var(--accent-success)
  }
  .track-status {
    color: rgb(65 63 223 / 83%);
  }
  .ticket-id-sec {
    padding: 0 1em;
  }
  .ticket-id-sec h4 {
    font-size: 1.4em;
  }
  .items-count {
    text-transform: capitalize;
    color: #9fa796;
  }
  .cta-btn {
    font-variant: all-petite-caps;
    letter-spacing: 1px;
    color: var(--accent-info);
    text-decoration: underline;
    cursor: pointer;
  }
  .cta-btn:active {
    animation: clickBtn 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  .barcode-sec {
    position: relative;
    isolation: isolate;
    border-left: 3px dotted var(--clr-white-sec-lite);
    min-width: 85px;
  }
  .barcode-sec::before, .barcode-sec::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--clr-white-sec-lite);
  }
  .barcode-sec::before {
    top: -10px;
    left: -12px;
  }
  .barcode-sec::after {
    bottom: -10px;
    left: -12px;
  }
  .slip-barcode {
    font-family: var(--font-barcode);
    transform: rotate(-90deg) translate(-43px, -31px);
    font-size: 28px;
    position: absolute;
    z-index: 1;
    line-height: 1;
    min-width: 160px;
  }
</style>