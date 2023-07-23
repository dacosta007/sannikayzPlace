<script>

  export let slideImg = ''
  export let slideImgCount = 0
  export let slideTitle = ''
  export let slideDescription = ''

  // console.log({ slideImg, slideImgCount, slideTitle, slideDescription })
</script>

<div class="slide" data-slide-img="{slideImgCount}">
  <div class="slide-img">
    <img src="{slideImg}" alt="slide_img_{slideImgCount}" width="200">
  </div>

  <div>
    <h3 class="slide-title">{slideTitle}</h3>
    <p class="slide-description">{@html slideDescription}</p>
  </div>
</div>


<style>
  .slide {
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .slide-img {
    height: auto;
  }

  img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }

  .slide-title {
		font-size: x-large;
    font-weight: bold;
    text-transform: capitalize;
    letter-spacing: 0.8px;
    line-height: 1.2;
    margin-bottom: 0.5em;
    margin-top: 0.5em;
	}

	.slide-description {
		font-size: 15px;
    /* color: var(--clr-sec); */
	}
</style>