<script>
  import OrderSuccess from "./OrderSuccess.svelte";
  import Ticket from "./Ticket.svelte";

  export let checkoutInfo = {};
</script>

<article class="success-receipt">
  <OrderSuccess paymentMth={checkoutInfo?.paymentMth} />

  <Ticket {checkoutInfo} />
</article>

<style>
  .success-receipt {
    background-color: var(--clr-white-sec);
    height: 100%;
    overflow: auto;
  }
</style>