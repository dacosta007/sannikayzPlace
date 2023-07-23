<script>
	
	import { enhance } from "$app/forms"
	import Button from "$lib/shared/Button.svelte"
	
	// received from layout page load data
	export let data
	console.log(data)

	// help get all recently confirmed and successful orders made on the current device
	if (window.localStorage) {
		console.log('We can work with the window object now 😃')
	} else {
		console.log('Window is not available 🛑🚨🚧⚠')
	}

	let btnPropsSubmit = {
		btnType: 'submit',
		btnSec: true,
		btnBlock: true,
		disableBtn: true
	}

	let btnPropsConfirm = {
		btnType: 'button',
		btnSec: true,
		btnBlock: true,
		disableBtn: true
	}

	let paycodeStatus = false
	let showOrderIDSection = true
</script>

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
				<form action="?/orders" method="post" use:enhance>
					<div class="input-field">
						<input type="text" name="orderId" id="orderId" placeholder="Your Order ID">
					</div>
					<div class="input-field">
						<Button {...btnPropsSubmit}>check</Button>
					</div>
				</form>
			</div>
		{/if}

		<!-- accept payment code -->
		{#if paycodeStatus === true}
			<div class="paycode-sec">
				<div class="input-field">
					<input type="text" name="paycode" id="paycode" placeholder="Payment Code for this order" required>
				</div>
				<div class="input-field">
					<Button {...btnPropsConfirm}>confirm</Button>
				</div>
			</div>
		{/if}
	</section>

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
	}
</style>