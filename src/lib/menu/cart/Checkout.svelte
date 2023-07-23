<script>
  import { createEventDispatcher } from 'svelte';

  import Button from '$lib/shared/Button.svelte';

  let dispatch = createEventDispatcher();

  let btnProp = {
    btnType: 'submit',
    btnSec: true,
    btnBlock: true
  }

  let user = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    address: '',
    orderMthd: '',
    paymentMthd: '',
    orderId: `INV-${getRndNum(10000, 90000)}`
  };

  /* order method options */
  const orderMthdOpts = [
    { value: 'in-premise', label: 'in-premise', title: 'in-premise' },
    { value: 'take away', label: 'take_away', title: 'take away' },
    { value: 'delivery', label: 'delivery', title: 'delivery' }
  ];

  /* payment method options */
  const paymentMthdOpts = [
    { value: 'cash', label: 'cash', title: 'with cash' },
    { value: 'transfer', label: 'transfer', title: 'bank transfer' },
    { value: 'card', label: 'card', title: 'credit card' }
  ];

  /* help generate random number for order ID */
  function getRndNum(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  /* help get radio btn input value for order method & prefered payment method */
  function radioBtnVal(evt) {
    if (!evt.target.checked) return;
    (evt.target.name === 'orderMethod') ? user.orderMthd = evt.target.value : user.paymentMthd = evt.target.value;
    // console.log(`Option selected: ${evt.target.name} \n Method: ${evt.target.value}`)
  }

  /* handles checkout form submission */
  function checkoutFrm() {
    // pass user/customer checkout info to parent component
    dispatch('goto', { to: 'complete', user})
  }
</script>

<article class="checkout">
  <header class="checkout-header">
    <i class="ti ti-angle-left" on:click={() => dispatch('goto', {to: 'cart'})} on:keypress={() => dispatch('goto', {to: 'cart'})}></i>
    <h2 class="center-text">checkout</h2>
  </header>

  <section class="checkout-body">
    <form action="#" method="post" on:submit|preventDefault={checkoutFrm}>
      <!-- user's order method type(in-premise, take away/to-go, delivery) -->
      <h4>order type</h4>
      <div class="order-method">
        <div class="order-method-opts">
          {#each orderMthdOpts as opts}
            <div class="custom-radio-container">
              <input type="radio" name="orderMethod" id={opts.label} value={opts.value} on:click={radioBtnVal} required>
              <label for={opts.label}>{opts.title}</label>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- user data info -->
      <h4>customer info</h4>
      <div class="user-info">
        <div class="inpt-field">
          <input type="text" bind:value={user.fname} name="fname" placeholder="First name" required>
        </div>
        <div class="inpt-field">
          <input type="text" bind:value={user.lname} name="lname" placeholder="last name" required>
        </div>
        <div class="inpt-field">
          <input type="tel" bind:value={user.phone} name="phone" placeholder="Phone number" required>
        </div>
        <div class="inpt-field">
          <input type="email" bind:value={user.email} name="email"  placeholder="Email address" required>
        </div>
      </div>

      <!-- shipping address(if order method is delivery) -->
      {#if user.orderMthd === 'delivery'}
        <h4>shipping address</h4>
        <div class="shipping-address">
          <div class="inpt-field">
            <textarea name="shipping" bind:value={user.address} placeholder="Shipping address" cols="9" rows="10" required></textarea>
          </div>
        </div>
      {/if}

      <!-- user's payment method (cash, transfer, credit card) -->
      <h4>payment method</h4>
      <div class="payment-method">
        <div class="pay-mthd-opts">
          {#each paymentMthdOpts as opts}
            <div class="custom-radio-container">
              <input type="radio" name="payMethod" id={opts.label} value={opts.value} on:click={radioBtnVal} required>
              <label for={opts.label}>{opts.title}</label>
            </div>
          {/each}
        </div>
      </div>

      <!-- user's attestation to stated statement of agreement  -->
      <div class="attestation">
        <div class="custom-checkbox">
          <input type="checkbox" name="attest" id="attest" required>
        </div>
        <small class="attest-statement">
          <label for="attest">
            I have read, and agreed to the <b>term of use & privacy policy</b> 
            that all infomation provided are correct, and can be use for smooth 
            operation of this order.
          </label>
        </small>
      </div>

      <div class="btn-container">
        <Button {...btnProp}>
          order now
        </Button>
      </div>
    </form>
  </section>
</article>

<style>
  .checkout {
    height: 100%;
    overflow: auto;
    background-color: var(--clr-white);
  }
  .checkout-header {
    position: relative;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
  }
  .checkout-header i.ti {
    position: absolute;
    left: 8px;
    font-size: 20px;
    border-radius: 50%;
    padding: 0.4em;
    background-color: var(--clr-text-sec);
    color: var(--clr-white);
  }
  .checkout-body {
    padding: 0 1em;
  }
  .order-method, .user-info, .payment-method {
    margin-bottom: 1em;
  }
  .checkout-body h4
  .checkout-body h4,
  .checkout-body h4 {
    text-transform: capitalize;
    letter-spacing: 1px;
    margin-bottom: 0.5em;
  }
  .order-method-opts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8em;
    align-items: center;
  }
  .custom-radio-container {
    display: flex;
    align-items: center;
    gap: 1em;
    position: relative;
  }
  .custom-radio-container input[type=radio] {
    visibility: hidden;
    cursor: pointer;
  }
  .custom-radio-container input[type=radio]::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 1px solid grey;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    visibility: visible;
  }
  .custom-radio-container input[type=radio]::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--accent-success);
    visibility: visible;
    transform: scale(0);
    transition: transform 500ms ease;
  }
  .custom-radio-container input[type=radio]:checked::before {
    border-color: var(--accent-success);
  }
  .custom-radio-container input[type=radio]:checked::after {
    transform: scale(1);
  }
  .custom-radio-container input[type=radio] + label {
    text-transform: capitalize;
    font-family: 'Montserrat';
    font-size: 13px;
    cursor: pointer;
  }
  .inpt-field {
    position: relative;
  }
  .inpt-field input, .inpt-field textarea {
    width: 100%;
    padding: 15px 18px;
    font-size: 15px;
    margin-bottom: 0.8em;
    outline: none;
    appearance: none;
    border: none;
    border-radius: 5px;
    background-color: #dde3da66;
  }
  .inpt-field textarea {
    resize: none;
    height: 85px;
    overflow: auto;
  }
  .inpt-field input:focus, .inpt-field textarea:focus {
    border: 1px solid var(--clr-site);
    transition: border 500ms ease;
  }
  .pay-mthd-opts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
  }
  .pay-mthd-opts div {
    background-color: #dde3da66;
    padding: 0.9em;
    border-radius: 5px;
  }
  .pay-mthd-opts .custom-radio-container input[type=radio]:before {
    top: 12px !important;
  }
  .pay-mthd-opts .custom-radio-container input[type=radio]::after {
    top: 16px !important;
    left: 17px !important;
  }
  .attestation {
    display: flex;
    gap: 1.5em;
    margin-bottom: 0.5em;
  }
  .attestation small {
    font-size: 11px;
  }
  .attestation label {
    cursor: pointer;
  }
  .custom-checkbox {
    position: relative;
  }
  .custom-checkbox input[type=checkbox] {
    visibility: hidden;
    cursor: pointer;
  }
  .custom-checkbox input[type=checkbox]::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 1px solid grey;
    border-radius: 3px;
    position: absolute;
    visibility: visible;
  }
  .custom-checkbox input[type=checkbox]::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 7px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    visibility: visible;
    transform: rotate(-50deg) scale(0);
    transition: transform 500ms ease;
    top: 7px;
    left: 3px;
    color: var(--clr-white-sec);
  }
  .custom-checkbox input[type=checkbox]:checked::before {
    background-color: var(--accent-success);
  }
  .custom-checkbox input[type=checkbox]:checked::after {
    transform: rotate(-50deg) scale(1);
  }
  .btn-container {
    margin-bottom: 1em;
  }
</style>