<script>
  import { formatCurrency } from '$lib/utilities/formatMoney';
  import { CartItemStore } from '$stores/CartItemStore';

  export let foodItem = {};

  // handle increase & decrease in food quantities
  function foodQty(no) {
    let fQty = foodItem.qty;
    // increament/decrement meal/food quantity
    fQty = fQty + (no);
    // meal/food quantities must be less than 1
    if (fQty < 1) fQty = 1;
    
    foodItem.qty = fQty;

    // update the Cart items store
    CartItemStore.update((items) => {
      // get all the meal added to cart
      let allMeals = [...items];
      // find the meal in the array & its array index no_(for keeping same data-structure)
      let meal = allMeals.find(m => m._id === foodItem._id);
      let mealIndx = allMeals.findIndex(m => m._id === foodItem._id);
      // update the meal's quantities & add it back to the meal's array(in relation to meal's array index)
      meal.qty = fQty;
      allMeals[mealIndx] = meal;
      return allMeals;
    });
  }

  // handle delete food added to cart
  function delFood(foodId) {
    CartItemStore.update(items =>  {
      let res = items.filter(item => item._id != foodId)
      return res;
    });
  }
</script>
  

  <div class="cart-item">
    <!-- food img -->
    <div class="food-img">
      <img src={foodItem.imgs[0]} alt="{foodItem.title}_food_image" width="100" height="auto" />
    </div>
  
    <div class="food-detail">
      <div class="f-title-and-qty">
        <!-- food title/name -->
        <div class="f-title">{foodItem.title}</div>
        <!-- food quantity(s) -->
        <div class="qty">
          <!-- decrease qty -->
          <button type="button" class="qty-btn" on:click={() => foodQty(-1)}>
            <i class="ti ti-minus"></i>
          </button>
  
          <!-- qty counter -->
          <span class="qty-count">{foodItem.qty}</span>
  
          <!-- increase qty -->
          <button type="button" class="qty-btn" on:click={() => foodQty(1)}>
            <i class="ti ti-plus"></i>
          </button>
        </div>
      </div>
      <div class="cta-btn-and-price">
        <!-- delete food btn -->
        <div class="cta-delete">
          <i class="ti ti-trash" on:click={() => { delFood(foodItem._id) }} on:keypress={() => { delFood(foodItem._id) }}></i>
        </div>
        <!-- food amount -->
        <div class="price">
          <span>{formatCurrency(foodItem.price).currency}</span> <span>{formatCurrency(foodItem.price).price}</span>
        </div>
      </div>
    </div>
  </div>

<style>
  .cart-item {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 0.5em;
    padding: 1.2em 1.5em;
  }

  .food-img {
    width: 100px;
    height: 100px;
    position: relative;
    border-radius: 50%;
  }

  .food-img img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    backdrop-filter: drop-shadow(0px 5px 6px rgb(0 0 0 / 5%));
    box-shadow: 0 4px 18px rgb(0 0 0 / 15%);
  }

  .food-detail {
    display: flex;
    justify-content: space-between;
  }

  .f-title-and-qty, .cta-btn-and-price {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.2em 0em;
  }

  .f-title {
    text-transform: capitalize;
    font-weight: bold;
    font-size: 15px;
  }

  .qty {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5em;
    border-radius: 16px;
    background-color: var(--clr-white-sec-lite);
    width: 120px;
  }

  .qty-btn {
    border-radius: 50%;
    text-align: center;
    outline: none;
    border: none;
    background-color: var(--clr-white);
    padding: 0.5em;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 4px 16px rgb(0 0 0 / 5%);
  }

  .qty-btn:active {
    animation: clickBtn 0.5s ease;
  }

  .qty-btn:nth-child(1) .ti {
    color: var(--clr-sec);
  }

  .qty-btn:nth-child(2) .ti {
    color: var(--clr-site);
  }

  .qty-count {
    font-weight: bold;
  }

  .cta-btn-and-price {
    display: flex;
    align-items: center;
  }

  .cta-btn-and-price .ti {
    font-size: 18px;
    padding: 0.3em;
    border-radius: 50%;
    color: var(--clr-site-sec);
    cursor: pointer;
    transition: background-color 0.5s ease;
  }

  .cta-btn-and-price .ti:hover {
    background-color: var(--clr-white-sec);
  }

  .cta-btn-and-price .ti:active {
    animation: clickBtn 0.5s ease;
  }

  .price {
    color: var(--clr-sec);
  }
</style>