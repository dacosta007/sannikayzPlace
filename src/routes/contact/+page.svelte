<script>
	import { CartStatuStore } from "$stores/CartStatuStore"
  import { CartItemStore } from "$stores/CartItemStore"
	import Cart from "$lib/menu/cart/Cart.svelte"
	import Button from "$lib/shared/Button.svelte"
	import ModalNotify from "$lib/shared/ModalNotify.svelte"
	import FAQs from "$lib/FAQs.svelte"

	import { getInTouchData, socialHandles, FAQsData } from "./contactInfos"
	import contactFrmField from "./formFields"

	let btnProps = {
		btnType: 'submit',
		btnSec: true,
		btnBlock: true,
		disableBtn: false,
		showLoading: false,
		loadingStatus: 'Sending message'
	}

	/* props for modal notification */
  let showNotification = 'hide'; // (i.e: 'hide' or 'show')
  let notifyType = 'success'; // (i.e: 'success' or 'error')
  let contentText = '';

	/* the contact form */
	let contactFrm;

	/* help check form input */
	// function checkFrmInpt(event) {
	// 	const frm = contactFrm;
	// 	const frmVal = event.target.value;

	// 	// check if input value is valid
	// 	if (event.target.valid)
	// }

	async function handleContactFrm(event) {
		// disable submitted btn(to prevent repeated click after a click) & show loading status
		btnProps.disableBtn = true;
		btnProps.showLoading = true;

		// form submitted Data & its action(where is to be submitted)
		const frm = new FormData(event.target);
		const frmData = Object.fromEntries(frm);
		const frmAction = event.target.action;

		// send to backend api for proccessing
		const req = await fetch(frmAction, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(frmData)
		});
		const res = await req.json();

		// show returned response notification & clear form fields
		notifyType = res.error ? 'error' : 'success';
		contentText = res?.msg;
		showNotification = 'show',

		// enable submit btn 
		btnProps.disableBtn = false;
		btnProps.showLoading = false;
	}

	/* handle closing Modal notification when shown */
  function handleCloseNotify(evt) {
    console.log('Closing Notification:', evt.detail);
    showNotification = evt.detail;
  }
</script>

<svelte:head>
	<title>Contact Us | Ile-Iyan</title>
	<meta name="description" content="Contact us at Ile-iyan or send us a message for any enquiries or related services.">
	<meta name="keywords" content="Contact us at Ile-iyan, Contact us at Sannikayz-place, for any enquires at Ile-iyan.">
</svelte:head>


<ModalNotify {showNotification} {notifyType} {contentText} on:closeModalNotify={handleCloseNotify} />

<article class="contact-body">
	<header class="header-sec">
		<h1 class="title center-text">Contact Us</h1>
	</header>

	<!-- for contact brief description & contact form -->
	<section class="contact-sec">
		<div class="get-in-touch-sec">
			<h3 class="sub-title">get in touch</h3>
			
			<p class="description">
				feel free to talk or socialize with us on any of our social media platforms, we will be glad to respond in no-time. 
				Here are some of our contact info, and social media handles:
			</p>

			<!-- get in touch info -->
			<div class="get-in-touch-container">
				{#each getInTouchData as data}
					<div class="get-in-touch">
						<!-- descriptive icon -->
						<div class="g-icon">
							<i class="{data.icon}"></i>
						</div>
						<!-- info -->
						<div>
							<h4>{data.title}</h4>
							<div class="g-info">{@html data.info}</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- social media handles -->
			<div class="social-handles">
				{#each socialHandles as social}
					<a href="{social.link}" target="_blank" rel="noreferrer" title="{social.name}">
						<i class="{social.icon}" title="{social.name}"></i>
					</a>
				{/each}
			</div>
		</div>

		<div class="form-sec sub-title">
			<form action="/apis/contact" method="post" on:submit|preventDefault={handleContactFrm} id="contactFrm" bind:this={contactFrm}>
				<h3 class="center-text">send us a message</h3>

				<div class="fields-container">
					{#each contactFrmField as field}
						<!-- for text & email fields -->
						{#if field.frmType === 'text' || field.frmType === 'email'}
							<div class="input-field">
								<label for="{field?.labelfor}">{field?.title}</label>
								<input type="{field?.frmType}" name="{field?.name}" id="{field?.fieldId}" placeholder="{field?.placeholder}" required="{field?.required}">
							</div>
						{/if}
						<!-- for telephone fields -->
						{#if field.frmType === 'tel'}
							<div class="input-field">
								<label for="{field?.labelfor}">{field?.title}</label>
								<input type="{field?.frmType}" maxlength="17" name="{field?.name}" id="{field?.fieldId}" placeholder="{field?.placeholder}" required="{field?.required}">
							</div>
						{/if}
						<!-- for textarea -->
						{#if field.frmType === 'textarea'}
							<div class="input-field">
								<label for="{field?.labelfor}">{field?.title}</label>
								<textarea name="{field?.name}" placeholder="{field?.placeholder}" id="{field?.fieldId}" cols="10" rows="5" required="{field?.required}" style="resize: none; line-height: 1.7;"></textarea>
							</div>
						{/if}
					{/each}
				</div>

				<!-- form footer -->
				<footer class="form-footer">
					<Button {...btnProps}>send message</Button>
				</footer>
			</form>
		</div>
	</section>

	<!-- Frequently Asked Questions (FAQs) -->
	<section class="faqs-sec">
		<header class="faq-header">
			<h5>FAQs</h5>
			<h2>some frequently asked questions</h2>
		</header>

		<FAQs allFAQ={FAQsData} />
	</section>


	<!-- Cart/Bag items -->
  {#if $CartStatuStore.open === true}
    <Cart />
  {/if}
</article>


<style>
	.contact-body {
		padding: 4em 7.5em;
	}
	.header-sec {
    margin-bottom: 2em;
  }

  .header-sec h1 {
    margin-bottom: 0.7em;
  }
	.contact-sec {
    display: grid;
    grid-template-columns: 2fr 2fr;
    gap: 7em;
	}
	.center-text {
    text-align: center;
  }
	.title {
    text-transform: capitalize;
    letter-spacing: 1px;
    font-size: xxx-large;
  }
	.sub-title {
		text-transform: capitalize;
    font-size: 1.5em;
    margin-bottom: 0.5em;
	}
	.description {
    line-height: 1.7;
    margin-bottom: 0.4em;
	}
	.description::first-letter {
		text-transform: capitalize;
	}
	.get-in-touch-container {
    margin: 1em 0 1.4em;
	}
	.get-in-touch {
    display: flex;
    gap: 1em;
    align-items: flex-start;
	}
	.get-in-touch:not(:last-of-type) {
    margin-bottom: 1.5em;
	}
	.g-icon i {
    font-size: x-large;
    border: 1px solid #a5adbb;
    padding: 8px;
    border-radius: 50%;
    color: #293140;
	}
	.get-in-touch > div:nth-child(2) h4 {
    text-transform: capitalize;
    letter-spacing: 1px;
    color: #727a72;
	}
	.g-info {
    display: grid;
	}
	.social-handles {
    display: flex;
    align-items: center;
    gap: 1.4em;
		padding-left: 0.7em;
	}
	.social-handles > a {
    text-decoration: none;
    display: inline-block;
    color: #a0a595;
	}
	.social-handles i {
    padding: 0.5em;
    border-radius: 50%;
		border: 1px solid var(--clr-sec-lite);
    background-color: var(--clr-sec-lite);
    font-size: 1.4em;
	}
	.social-handles > a i:hover {
    border: 1px solid;
    background-color: var(--clr-white);
    transition: background-color 0.5s ease, border 0.5s ease;
	}
	.input-field label {
    font-size: 11px;
	}
	.input-field input, .input-field textarea {
		padding: 14px 10px;
	}
	.form-footer {
		margin-top: 0.5em;
	}
	.faqs-sec {
    margin: 2.5em 0 1em;
	}
	.faq-header {
		text-align: center;
	}
	.faq-header h2 {
		text-transform: capitalize;
		font-size: large;
		letter-spacing: 1px;
	}


	@media (max-width: 500px) {
		.contact-body {
			height: 100dvh;
      overflow: auto;
      padding: 5em 1em 6em;
			border: 1px solid;
		}
		.contact-sec {
			grid-template-columns: 1fr;
			gap: 3em;
		}
		.get-in-touch-sec > h3.sub-title {
			text-align: center;
		}
		.social-handles i {
			font-size: 1.7em;
		}
		.fields-container.s-2CpGgZ1sTTPV {
			display: grid;
			gap: 0.5em;
		}
	}
</style>