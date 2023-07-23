<script>

</script>

<div class="coupon-container">
  <h5 class="title">voucher code</h5>
  <div class="coupon">
    <input type="text" placeholder="voucher or coupon code"> 
    <button class="add-coupon-btn">
      <i class="ti ti-plus"></i>
    </button>
  </div>
</div>

<style>
  .coupon-container {
    border-top: 2px dashed var(--clr-white-sec);
    border-bottom: 2px dashed var(--clr-white-sec);
    padding: 1em 1.5em;
  }

  .coupon-container > h5 {
    font-size: 1em;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin-bottom: 0.3em;
  }

  .coupon {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 0.4em;
    align-items: center;
  }

  .coupon input {
    appearance: none;
    padding: 13px 14px;
    border: none;
    border-radius: 10px;
    outline: none;
    background-color: var(--clr-white-sec);
    font-size: 16px;
    width: 100%;
  }

  .coupon input:focus {
    border: 1px solid #4a6db3;
  }

  .coupon input::placeholder {
    text-transform: capitalize;
    color: rgba(57, 75, 189, 0.604);
    letter-spacing: 0.5px;
  }

  .add-coupon-btn {
    border-radius: 14px;
    border: none;
    outline: none;
    user-select: none;
    cursor: pointer;
    padding: 13px;
    margin: 0 1.2em;
    background-color: #4a6db3;
    color: var(--clr-white);
  }

  .add-coupon-btn:active {
    animation: clickBtn 0.5s ease;
  }

  .add-coupon-btn .ti {
    font-size: 16px;
  }
</style>