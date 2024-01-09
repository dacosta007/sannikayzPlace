<script>
	import { enhance } from "$app/forms"
	import { fade } from "svelte/transition"

	import { CartStatuStore } from "$stores/CartStatuStore"
  import { CartItemStore } from "$stores/CartItemStore"
	import { saveIntoLocalStorage } from "$lib/utilities/forLocalStorage"
	import accessLocalStorage from "$lib/utilities/forLocalStorage"

	import Button from "$lib/shared/Button.svelte"
	import Cart from "$lib/menu/cart/Cart.svelte"
	import Ticket from "$lib/menu/successReceipt/Ticket.svelte"
	import TicketPreview from "$lib/menu/successReceipt/TicketPreview.svelte"
	
	// Data from 'layout page load data' & 'page load data'
	// export let data
	// console.log(data)

	// help get all recently confirmed and successful orders made on the current device
	// if (window.localStorage) {
	// 	console.log('We can work with the window object now 😃')
	// } else {
	// 	console.log('Window is not available 🛑🚨🚧⚠')
	// }

	let btnPropsSubmit = {
		btnType: 'submit',
		btnSec: true,
		btnBlock: true,
		disableBtn: true
	}

	let btnPropsConfirm = {
		btnType: 'submit',
		btnSec: true,
		btnBlock: true,
		disableBtn: true
	}

	// sections on page
	let paycodeStatus = false
	let showOrderIDSection = true
	let previewTicketSection = false
	let showReceipt = false

	// holds ordered info & order paycode from receipt
	let orderedInfo = {}, holdPaycode = '';

	// error message elements
	let errMsgOrderId, errMsgPaycode;

	/* help check if the input value is correct */
	function checkInpt(event) {
		const inpt = event.target;
		const inptType = inpt.dataset.orderId ? inpt.dataset.orderId : inpt.dataset.paycode; // the type of input field about to be checked
		const inptVal = (inpt.value).trim();
		const showErr = inpt.parentElement.querySelector('.err-msg'); // element that shows the error message
		
		if (inptType === 'orderId') {
			const regX = /[INV]-\d/g;

			if (inptVal.length === 9 && regX.test(inptVal) === false) {
				showErr.innerHTML = "Invalid required string";
				btnPropsSubmit.disableBtn = true;
				return;
			}
			// disabled btn check
			if (inptVal.length < 9) {
				btnPropsSubmit.disableBtn = true;
			} else {
				btnPropsSubmit.disableBtn = false;
			}
			showErr.innerHTML = '';
			return;
		}
		
		if (inptType === 'paycode') {
			if (inptVal.length === 8 && inptVal != holdPaycode) {
				showErr.innerHTML = "Invalid required value";
				return;
			}
			// disabled btn check
			(inptVal.length < 8) ? btnPropsConfirm.disableBtn = true : btnPropsConfirm.disableBtn = false;
			showErr.innerHTML = '';
			return;
		}
	}
	
	// help handle showing full ticket/receipt
	// and also updating the order 
	// (payStatus: i.e from unpaid to paid & status: i.e from placed to preparing)
	function showPreviewTicket({ formEle, formData }) {

		return async ({ result }) => {
			// check for error
			if (result.type === "error" || result.error) {
				errMsgPaycode.innerHTML = result.error.msg;
				return;
			}

			// update orderInfo 'payStatus & status'
			orderedInfo.payStatus = result.data.payStatus;
			orderedInfo.status = result.data.status;

			previewTicketSection = true;
			paycodeStatus = false; // close the paycodeStatus section
			showOrderIDSection = true; // show the 'showOrderIDSection'
		}
	}

	async function showFullTicket(evt) {
		showReceipt = evt.detail; // return a boolean value(true)
	}

	function closePreviewTicket() {
		// close paycodeStatus & preview ticket sections
		paycodeStatus = false;
		previewTicketSection = false;
		showOrderIDSection = true; // show the 'showOrderIDSection'
	}

	async function checkOrder({ form }) {
		
		return async ({ result }) => {
			// check for error
			if (result.type === "error" || result.error) {
				errMsgOrderId.innerHTML = result.error.msg;
				return;
			}

			const { order } = result.data;
			orderedInfo = order; // holds ordered info

			// if already paid: show the preview receipt
			if (order.payStatus === 'paid') {
				showOrderIDSection = false;
				previewTicketSection = true;
				return;
			}

			// set the paycode to be checked
			holdPaycode = order.payCode;

			// hide showOrderIdSection & show the paycode section for confirmation of paycode by the customer
			showOrderIDSection = false;
			paycodeStatus = true;
		}
	}
</script>


<svelte:head>
	<title>Check Order | View receipt</title>
	<meta name="description" content="Check your order view your receipt on food or services place on our site. You can also track progress of your orders as well.">
	<meta name="keywords" content="Check order, Check Receipt, Track Place Orders">
</svelte:head>

<article class="menu-body">
	<header class="main-header-sec">
		<h2 class="title">check orders</h2>
	</header>

	<section class="description-sec">
		<p class="description">
			here, you can view your receipts on orders made on our site. Also, complete, reprint, and track your ordered 
			item(s) on here. To complete or reprint your receipts after/before payment confirmation, use the input below.
		</p>
	</section>

	<!-- input field section -->
	<section class="inpt-sec">
		<!-- accept orderID -->
		{#if showOrderIDSection}
			<div class="orderId-sec">
				<form action="?/orders" method="post" use:enhance={checkOrder} style="align-items: flex-start;">
					<div class="input-field">
						<input type="text" name="orderId" id="orderId" data-order-id="orderId" placeholder="Your Order ID(INV-12348)" on:input={checkInpt} maxlength="9" required>
						<small class="err-msg" data-err-msg-order-id="errMsgOrderId" bind:this={errMsgOrderId}></small>
					</div>
					<div class="input-field">
						<Button {...btnPropsSubmit}>check</Button>
					</div>
				</form>
			</div>
		{/if}

		<!-- accept payment code -->
		{#if paycodeStatus === true}
			<form action="?/completeOrder" method="post" class="paycode-sec" use:enhance={showPreviewTicket} transition:fade>
				<div class="input-field">
					<input type="text" name="paycode" id="paycode" data-paycode="paycode" placeholder="Payment Code for this order" on:input={checkInpt} maxlength="8" required>
					<small class="err-msg" data-err-msg-paycode="paycode" bind:this={errMsgPaycode}></small>
				</div>
				<input type="hidden" name="orderId" value={orderedInfo.orderId}>
				<div class="input-field" style="align-self: flex-start;">
					<Button {...btnPropsConfirm}>confirm</Button>
				</div>
			</form>
		{/if}
	</section>

	<!-- Cart/Bag items -->
  {#if $CartStatuStore.open === true}
    <Cart />
  {/if}

	<!-- show preview ordered ticket/receipt -->
	{#if previewTicketSection}
		<section class="preview-container">
			<span class="lni lni-close close-sec-btn" on:click={closePreviewTicket} on:keypress={closePreviewTicket}></span>
			<TicketPreview ticketInfo={orderedInfo} on:showTicket={showFullTicket} />
		</section>
	{/if}

	<!-- show receipt -->
	{#if showReceipt}
		<section class="receipt-sec" transition:fade>
			<span class="lni lni-close close-sec-btn" on:keypress={() => showReceipt = false} on:click={() => showReceipt = false} style="margin-top: 1em;"></span>
			<Ticket orderInfo={orderedInfo} />
		</section>
	{/if}

	<!-- recent orders made with current devices -->
</article>

<style>
	.menu-body {
    padding: 5em 7.5em;
  }
	.main-header-sec {
		margin-bottom: 0.5em;
		padding: 0 1em;
	}
	.title {
		text-align: center;
    text-transform: capitalize;
    letter-spacing: 1px;
    font-size: xxx-large;
  }
	.description-sec, .inpt-sec {
		padding:  0 7.5em;
		margin-bottom: 0.5em;
	}
	.description {
		font-size: 15px;
		line-height: 1.9;
	}
	.description::first-letter {
		text-transform: capitalize;
	}
	.orderId-sec, .paycode-sec {
		margin-top: 1em;
	}
	.orderId-sec form, .paycode-sec {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1em;
    align-items: center;
	}
	.err-msg {
    display: inline-block;
    line-height: 1.5;
    margin-top: 4px;
    font-size: 11px;
    color: #d53e23;
	}
	.close-sec-btn {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
		font-size: 16px;
		font-weight: bold;
		color: var(--accent-danger);
		padding: 0.8em;
		border-radius: 50%;
		background-color: rgb(255 37 37 / 9%);
		cursor: pointer;
		display: inline-block;
    margin-bottom: 1em;
	}
	.close-sec-btn:active {
		animation: clickBtn 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);
	}
	.preview-container {
		height: 100%;
    padding: 3em 0.8em 6em;
    background-color: var(--clr-white-sec-lite);
    position: relative;
	}
	.receipt-sec {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 15;
		width: 100%;
		height: 100dvh;
		background-color: var(--clr-white-sec-lite);
		backdrop-filter: blur(5px);
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-y: auto;
	}


	@media (max-width: 500px) {
		.menu-body {
      height: 100dvh;
      overflow: auto;
      padding: 5em 0em 6em;
    }
		.description-sec, .inpt-sec {
			padding: 0 1em;
		}
		.orderId-sec form, .paycode-sec {
			gap: 0.6em;
		}
		.receipt-sec {
			height: 100vh;
		}
	}
</style>