<script>
  import { createEventDispatcher } from "svelte";

  export let foodObj = {};

  let dispatch = createEventDispatcher();

  // handles currency format
  function formatCurrency(money) {
    let fmt = parseInt(money)
      .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
      .split(".")[0];

    let currency = fmt.slice(0, 1);
    let price = fmt.slice(1);
    return `<span style="font-size: 14px;">${currency}</span><span style="font-size: 18px;">${price}</span>`;
  }

  // handles food item preview or detail info
  function preview() {
    dispatch('previewFood', foodObj?._id)
    return
  }

  // handles adding food to cart
  function addToCart(evt) {
    let clickEle = evt.target.tagName
    let foodId = ''

    if (clickEle === 'BUTTON') {
      foodId = evt.target.dataset.food
    }
    if (clickEle === 'I') {
      foodId = evt.target.parentElement.dataset.food
    }

    dispatch('addToCart', foodId)
  }
</script>


<div class="food" on:click|stopPropagation={preview} on:keypress|stopPropagation={preview}>
  <!-- food img -->
  <div class="food-img-sec">
    <div class="food-img">
      <img src="{foodObj?.imgs[0] ?? ''}" alt="food_image" width="200" height="auto">
    </div>
  </div>
  <!-- food brief info -->
  <div class="food-info">
    <!-- rating, & price -->
    <div class="rating-and-duration">
      <div class="rating">
        <span class="star">
          <i class="ti ti-star"></i>
        </span>
        <span class="rate">{foodObj.rating ?? 3.5}</span>
      </div>
      <div class="duration"><i class="ti ti-time"></i><span>{foodObj.duration}mins</span></div>
    </div>

    <div class="title-and-addBtn">
      <div class="item-category">{foodObj.category}</div>
      <div class="name">{foodObj.title}</div>
      <div class="description">{foodObj.description}</div>
      <div class="cta-and-price">
        <div class="price">{@html formatCurrency(`${foodObj.price}`)}</div>
        <div class="cta">
          <button class="addBtn-sm" data-food="{foodObj._id}" on:click|stopPropagation={addToCart}>
            <i class="ti ti-plus" on:click|stopPropagation={addToCart} on:keypress|stopPropagation={addToCart}></i>
          </button>
          <button class="addBtn" data-food="{foodObj._id}" on:click|stopPropagation={addToCart}>
            Order now
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .food {
    background-color: rgb(241 248 249 / 0.75);
    border-radius: 30px;
    max-width: 250px;
    cursor: pointer;
  }

  .food:active {
    transform: scale(0.9);
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .food-img-sec {
    display: flex;
    justify-content: center;
    padding: 1.5em 0 0.5em;
  }

  .food-img {
    position: relative;
    height: 170px;
    width: 170px;
  }

  .food-img img {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    filter: drop-shadow(0px 5px 18px rgb(0 0 0 / 0.08));
  }

  .food-info {
    padding: 0.8em;
  }

  .rating-and-duration {
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 0.3em;
  }

  .star {
    color: var(--clr-sec);
    font-size: 12px;
  }

  .rate {
    font-weight: bold;
    font-size: 12px;
  }
  
  .duration {
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 0.2em;
    font-weight: 100;
    color: #a79e9e;
  }

  .cta-and-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.3em;
    padding-bottom: 0.3em;
    isolation: isolate;
  }

  .price {
    font-family: 'Andika';
    font-weight: bold;
  }

  .cta {
    position: relative;
    isolation: isolate;
  }

  .cta button {
    position: relative;
    z-index: 2;
  }

  .addBtn {
    padding: 12px 24px;
    text-align: center;
    border-radius: 21px;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    user-select: none;
    cursor: pointer;
    background-color: var(--clr-sec);
    color: var(--clr-white);
    letter-spacing: 0.5px;
  }

  .addBtn-sm {
    padding: 0.5em 0.6em;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 50%;
    font-size: 18px;
    text-align: center;
    background-color: var(--clr-sec);
    color: var(--clr-white);
    cursor: pointer;
    display: none;
  }

  .addBtn:active, .addBtn-sm:active {
    animation: clickBtn 0.5s ease;
  }

  .item-category {
    font-family: Barlow, Andika;
    font-variant: petite-caps;
    font-size: 16px;
    letter-spacing: 1px;
    color: #7d7c9d;
  }

  .name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 16px;
  }

  .description {
    font-size: 12px;
    color: #8a9986;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    padding: 0.5em 0;
  }

  @keyframes clickBtn {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }

  @media (max-width: 500px) {
    .food-img {
      height: 130px;
      width: 130px;
    }
    .addBtn {
      display: none;
    }
    .addBtn-sm {
      display: inherit;
    }
  }
</style>