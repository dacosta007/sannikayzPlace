<script>
  import { scale } from "svelte/transition"

  import onBoardingData from './onBoarding'
  import Indicator from "./Indicator.svelte"
  import Slide from "./Slide.svelte"
  import Button from "$lib/shared/Button.svelte"

  let btnProps = {
    btnType: 'button',
    btnPry: true,
    btnRounded: true,
    btnBlock: true
  }

  let indicator = 0

  /* Help handle onboarding scrolling of slides within */
  function observeOnboarding() {
    setTimeout(() => {
      let observerOpts = {
        root: document.querySelector('#onboarding'),
        rootMargin: '0px',
        threshold: 1.0
      };

      let observer = new IntersectionObserver(scrollHandler, observerOpts);
      let eles = document.querySelectorAll('.slide');

      eles.forEach(ele => {
        observer.observe(ele);
      });
      // console.log(onboarding.id)
    }, 2000);
  }

  if (window) {
    observeOnboarding();
  }

</script>

<section class="onboarding-section" out:scale={{ duration: 500, start: 100 }}>
  <header class="site-logo-sec">
    <div class="logo">SP</div>
  </header>

  <article class="slide-container">
    <!-- img slides -->
    <section class="onboarding" id="onboarding">
      {#each onBoardingData as slide, indx}
        <Slide slideImg={slide.img} slideTitle={slide.title} slideDescription={slide.description} slideImgCount={indx} />
      {:else}
        <p>Nothing to show for slides</p>
      {/each}
    </section>
    
    <!-- slide's indicators and cta btn -->
    <footer class="slide-footer">
      <!-- slide's indicators -->
      <div class="indicator-container">
        {#each onBoardingData as _, indx }
          <Indicator slideNum={indx} indicate={indx === indicator} />
        {/each}
      </div>

      <!-- get started btn -->
      <div class="cta-btn-container">
        <Button {...btnProps}>
          start ordering
        </Button>
      </div>
    </footer>
  </article>
</section>

<style>
  .onboarding-section {
    position: fixed;
    left: 0;
    z-index: 14;
    width: 100%;
    height: 100svh;
    isolation: isolate;
  }
  .site-logo-sec {
    position: absolute;
    top: 0;
  }
  .logo {
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding: 0.5em;
    border-radius: 50px;
    background: var(--clr-sec);
    color: var(--clr-white-sec);
  }
  .slide-container {
    width: 100%;
    height: 100%;
    position: relative;
    isolation: isolate;
  }
  .onboarding {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
    gap: 1em;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-snap-type: inline mandatory;
    scrollbar-width: none;
    scroll-behavior: smooth;
  }
  .onboarding::-webkit-scrollbar {
    display: none;
  }
  .slide-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .indicator-container {
    display: flex;
    align-items: center;
    gap: 0.6em;
  }


  @media (min-width: 700px) {
    /* wouldn't show on medium & large devices */
    .onboarding-section {
      display: none;
    }
  }
</style>