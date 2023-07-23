<script>
  import { createEventDispatcher } from "svelte"
  import { fade, fly } from 'svelte/transition'
  import { CartItemStore } from "$stores/CartItemStore"

  export let msg
  export let msgTitle = 'added to cart'
  export let showToast = false

  let dispatch = createEventDispatcher()

  /* help close toast message notification after 1sec. */
  function closeToast() {
    setTimeout(() => {
      showToast = false
      dispatch('closeToast', false)
    }, 2500)
  }

  // close Toast after 1sec. if showToast is true
  if (showToast === true) {
    closeToast()
  }
</script>

<div class="toast">
  <div class="toast-container" in:fly={{ duration: 500, y: 50 }} out:fade={{ duration: 50 }}>
    <!-- toast icon & message -->
    <div class="icon-and-msg">
      <i class="lni lni-shopping-basket"></i> 
      <div class="msg-body">
        <h6 class="msg-title">{msgTitle}</h6>
        <div class="msg">{msg}</div>
      </div>
    </div>
    <!-- toast additional message -->
    <div class="added-msg">
      {$CartItemStore.length > 1 ? `${$CartItemStore.length} items`: '1 item'}
    </div>
  </div>
</div>


<style>
  .toast {
    position: fixed;
    top: 8em;
    z-index: 12;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .toast-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    background-color: var(--clr-white);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    padding: 0.6em;
    max-width: 280px;
  }
  .icon-and-msg {
    display: flex;
    align-items: center;
    gap: 0.8em;
  }
  .icon-and-msg i {
    font-size: 20px;
    padding: 0.4em;
    border-radius: 6px;
    background-color: var(--clr-sec-lite);
    color: var(--clr-sec);
  }
  .msg-title {
    font-family: "Barlow", Andika;
    font-variant: small-caps;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--clr-site-sec);
    line-height: 1.2;
  }
  .msg {
    font-size: 14px;
    text-transform: capitalize;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .added-msg {
    color: var(--clr-site-sec);
  }


  @media (max-width: 600px) {
    .toast {
      bottom: 8em;
      top: inherit;
    }
    .toast-container {
      max-width: 307px;
    }
  }
</style>