<script>
  import { fly } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import Button from "$lib/shared/Button.svelte"

  
  export let food = {};

  let btnProp = {
    btnType: 'button',
    btnSec: true,
    btnBlock: true,
    btnRounded: true
  }
  
  let dispatch = createEventDispatcher();

  // holds the img user slides to when scrolling (default is 0)
  let imgIndicate = 0

  /* help indicate img user is on */
  function indicateImg(evt) {
    const imgIndicator = parseInt(evt.target.dataset.imgIndx)
    imgIndicate = imgIndicator
  }

  /* handles scrolling indication when browser starts to observe */
  function scrollHandler(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        imgIndicate = parseInt(entry.target.dataset.imgIndx)
      }
    })
  }

  /* helps observe scrolling by user */
  function observeScroll() {
    // REASON: wait for all required the content to load before observing
    setTimeout(() => {
      // indicate to the browser which element to observe
      let observerOpts = {
        root: document.querySelector('#onboarding'),
        rootMargin: '0px',
        threshold: 1.0
      }
  
      const observer = new IntersectionObserver(scrollHandler, observerOpts)
      const allImgsRootElement = document.querySelector('#imgsRoot')
      const allImgs = allImgsRootElement.querySelectorAll('.img-content')
  
      allImgs.forEach(img => {
        observer.observe(img)
      })
    }, 2000)
  }

  function addToBag() {
    dispatch('addToBag', food?._id)
  }

  /* help add food to favourite list on device storage(localStorage) */
  function addToFavourites(evt) {
    const foodId = evt.target.dataset.favFood
    const clickedElement = evt.target

    let favouritesArray = []

    // access device localstorage for storing all favourite food items
    if (localStorage.getItem('favourites') === null || localStorage.getItem('favourites') === undefined) {
      localStorage.setItem('favourites', JSON.stringify([]))
    }
    favouritesArray = JSON.parse(localStorage.getItem('favourites'))

    // check if food isn't previously added: 
    // if it is: toggle a 'heart-filled' icon class, else default back to just 'heart' icon class
    const checkFood = favouritesArray.some(ele => foodId === ele)
    if (clickedElement.tagName === 'I') {
      checkFood === false ? clickedElement.classList.add('lni-heart-filled') : clickedElement.classList.remove('lni-heart-filled')
    }
    if (clickedElement.tagName === 'BUTTON') {
      checkFood === false ? clickedElement.children[0].classList.add('lni-heart-filled') : clickedElement.children[0].classList.remove('lni-heart-filled')
    }

    // add/save food item's ID to the favourites storage
    if (checkFood === false) {
      favouritesArray.push(foodId)
      localStorage.setItem('favourites', JSON.stringify(favouritesArray))
      return
    }
    if (checkFood === true) {
      favouritesArray = favouritesArray.filter(ele => ele != foodId)
      localStorage.setItem('favourites', JSON.stringify(favouritesArray))
      return
    }
  }

  /* close the preview window through the parent component */
  function closePreview() {
    dispatch('closePreview', false)
  }

  /* help signify if food is part of favourite list on device */
  function checkFavourite() {
    if (localStorage.getItem('favourites') === null || localStorage.getItem('favourites') === undefined) {
      return false
    }
    
    let favouritesArray = JSON.parse(localStorage.getItem('favourites'))
    let check = favouritesArray.findIndex(ele => ele === food?._id) === -1 ? false : true
    return check
  }

  /* Observe scrolling food item imgs */
  observeScroll()
</script>

<article class="food-preview" on:click|self={closePreview} on:keypress|self={closePreview}>
  <section class="food-info-container" in:fly={{ duration: 500, x: -50 }} out:fly={{ duration: 500, x: 50 }}>
    <header class="food-img-sec">
      <!-- close btn -->
      <span class="close-preview">
        <i class="ti ti-arrow-left" on:click={closePreview} on:keypress={closePreview}></i>
      </span>
      <!-- food imgs -->
      <div class="imgs" id="imgsRoot">
        {#each food?.imgs as img, indx}
          <div class="img-content" id="img_{indx}" data-img-indx="{indx}">
            <img src="{img}" alt="food_img_preview_{indx}" width="200" height="auto">
          </div>
        {/each}
      </div>
      <!-- food imgs indicators -->
      <div class="img-indicators">
        {#each food?.imgs as _, indx}
          <a href="#img_{indx}" class:active={imgIndicate === indx} on:click={indicateImg} data-img-indx="{indx}"><b></b></a>
        {/each}
      </div>
    </header>
  
    <section class="food-info-sec">
      <!-- food rating, duration, title, price tag -->
      <div class="food-meta-info">
        <div>
          <div class="rating-and-duration">
            <div class="rating">
              <i class="ti ti-star"></i> <span>{food?.rating ?? 4}</span>
            </div>
            <div class="duration">
              <i class="ti ti-time"></i> <span>{food?.duration} mins</span>
            </div>
          </div>
          <div class="food-title">{food?.title}</div>
        </div>

        <div class="price-tag"><span>₦</span><span>{food?.price}</span> </div>
      </div>
      <!-- food categories -->
      <div class="food-categories">
        {#each food?.category as cate}
          <span class="cate-tag">{cate}</span>
        {/each}
      </div>
      <!-- food description -->
      <div class="food-description">
        <h4 class="title">description</h4>
        <p>{food?.description}</p>
      </div>
    </section>
  </section>

  <footer class="cta-btn-sec">
    <!-- add to favourite btn -->
    <button type="button" class="fav-btn" on:click|stopPropagation={addToFavourites} data-fav-food="{food?._id}">
      <i class="lni" 
        class:lni-heart={checkFavourite() === false} 
        class:lni-heart-filled={checkFavourite() === true} 
        on:click|stopPropagation={addToFavourites} 
        on:keypress|stopPropagation={addToFavourites} 
        data-fav-food="{food?._id}"
      ></i>
    </button>
    <!-- add to cart btn -->
    <Button {...btnProp} on:click={addToBag}>
      order now
    </Button>
  </footer>
</article>

<style>
  /* this is a re-configured class from 'lineicons.css' in the root static css directory */
  .lni-heart-filled::before {
    content: '\eae5' !important;
  }
  .food-preview {
    position: fixed;
    isolation: isolate;
    top: 0;
    left: 0;
    z-index: 12;
    width: 100%;
    height: 100dvh;
    background-color: #b1b7acad;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
  }
  .food-info-container {
    background-color: var(--clr-white);
    width: 70%;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5em;
  }
  .food-img-sec {
    position: relative;
    height: 590px;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 0 0em;
  }
  .close-preview {
    position: absolute;
    left: 1em;
    top: 1.5em;
    z-index: 1;
  }
  .close-preview i {
    color: rgb(239 239 239 / 79%);
    font-size: 24px;
    padding: 0.3em;
    border-radius: 50%;
    background-color: rgb(239 239 239 / 26%);
  }
  .imgs, .img-content {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .imgs::-webkit-scrollbar-track {
    display: none !important;
  }
  .imgs::-webkit-scrollbar {
    width: unset !important;
    display: none;
  }
  .imgs {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
    gap: 0.5em;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-snap-type: inline mandatory;
    scroll-padding-inline: 0em;
    scroll-behavior: smooth;
    scrollbar-width: none;
  }
  .imgs > * {
    scroll-snap-align: start;
  }
  .img-content img {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: fill;
    object-position: center;
  }
  .img-indicators {
    position: absolute;
    bottom: 10px;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
  }
  .img-indicators a {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgb(239 239 239 / 53%);
    transition: background-color 0.5s ease;
    cursor: pointer;
  }
  .img-indicators a:hover {
    background-color: rgb(239 239 239 / 100%);
  }
  .img-indicators .active {
    background-color: rgb(239 239 239 / 100%);
  }
  .food-info-sec {
    height: 100%;
    padding: 2em 0;
  }
  .food-meta-info {
    display: flex;
    justify-content: space-between;
    padding: 1em 1.5em;
    gap: 1em;
  }
  .rating-and-duration {
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .rating {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .rating i {
    color: var(--clr-sec);
    font-size: 16px;
  }
  .rating span {
    font-size: 13px;
    font-weight: bold;
    color: var(--clr-text-sec);
  }
  .duration {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .duration i {
    font-size: 14px;
    color: #856969;
  }
  .duration span {
    font-size: 13px;
    font-family: var(--font-andika);
    color: #878181;
  }
  .food-title {
    text-transform: capitalize;
    font-size: 1.5em;
    font-family: var(--font-andika);
    margin-top: 0.3em;
  }
  .close-preview i:active {
    animation: clickBtn 0.5s ease;
  }
  .price-tag {
    font-size: 1.8em;
    font-family: 'Montserrat';
    font-weight: 500;
    color: var(--clr-site-sec);
  }
  .price-tag span:nth-child(1) {
    font-size: 17px;
  }
  .food-categories {
    padding: 0 1.5em;
    display: flex;
    gap: 7px;
    align-items: center;
    margin-top: -1em;
    margin-bottom: 0.7em;
  }
  .food-categories span {
    text-transform: capitalize;
    font-family: var(--font-andika);
    font-size: smaller;
    display: inline-block;
    padding: 2px 15px;
    border-radius: 25px;
    background-color: var(--clr-sec-lite);
    color: var(--clr-sec);
  }
  .food-description {
    padding: 0.5em 1.5em 0;
  }
  .food-description h4 {
    text-transform: capitalize;
    letter-spacing: 1px;
    color: #acaeb5;
    font-family: var(--font-montserrat);
    font-weight: 500;
    font-size: 1.3em;
    position: relative;
    margin-bottom: 0.4em;
  }
  .food-description h4::before {
    content: '';
    position: absolute;
    bottom: -1px;
    border: 1px solid rgb(213 186 139 / 56%);
    border-radius: 3px;
    display: inline-block;
    width: 3em;
  }
  .food-description p {
    font-family: var(--font-montserrat);
    font-size: 15px;
  }
  .food-description p::first-letter {
    text-transform: capitalize;
    font-size: large;
  }
  .cta-btn-sec {
    position: absolute;
    z-index: 1;
    bottom: 13em;
    right: 15em;
    width: 30%;
    padding: 0;
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .fav-btn {
    padding: 12px 16px;
    border-radius: 15%;
    outline: none;
    appearance: none;
    user-select: none;
    border: none;
    cursor: pointer;
    text-align: center;
    background-color: var(--clr-sec);
    color: var(--clr-white);
  }
  .fav-btn i {
    font-size: 18px;
  }
  .fav-btn:active {
    animation: clickBtn 0.5s ease;
  }

  @media (max-width: 600px) {
    .food-preview {
      top: 0;
      width: 100%;
      height: clamp(100dvh, 100dvh, 100svh);
      display: inherit;
      backdrop-filter: none;
    }
    .food-info-container {
      height: 100%;
      width: 100%;
      border-radius: 10px;
      display: inherit;
    }
    .food-img-sec {
      height: 50%;
      position: relative;
      overflow: auto;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      padding: 0;
    }
    .close-preview i {
      font-size: 20px;
    }
    .food-info-sec {
      height: 50%;
      padding: 0 0 5em;
      overflow: auto;
    }
    .cta-btn-sec {
      bottom: 0;
      right: 0;
      width: 100%;
      padding: 0.4em 1em 1.5em;
      background-color: var(--clr-white);
    }
  }
</style>