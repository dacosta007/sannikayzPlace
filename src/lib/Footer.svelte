<script>
  export let copyrightYr = "2022";
</script>

<footer>
  <div class="footer-links">
    <!-- site's logo and company address -->
    <div class="footer-brand-and-address">
      <!-- site's logo or crest -->
      <div class="footer-brand"></div>
      <!-- address & contact medium -->
      <div class="footer-address">
        <!-- company's address -->
        <div class="address">
          <i class="ti-location-pin"></i>
          <span>6, Dele Adedeji street, Lekki Phase 1, Lagos, Nigeria</span>
        </div>
        <!-- company's mobile hot line -->
        <div class="address">
          <i class="ti-mobile"></i> 
          <span>+234 9024 475 402</span>
        </div>
        <!-- company's email address -->
        <div class="address">
          <i class="ti-email"></i> 
          <span>sannikayzkitchen@gmail.com</span>
        </div>
        <!-- restaurant's opening hours -->
        <h4 class="title">opening hours</h4>
        <div class="opening-hours-section">
          <div class="day-time">
            <div>monday</div> 
            <div>10am</div>
          </div>
          <span>To</span>
          <div class="day-time">
            <div>friday</div> 
            <div>10pm</div>
          </div>
        </div>
      </div>
    </div>

    <!-- section title and other links -->
    <div class="links-container">
      <!-- quick links -->
      <div>
        <h5 class="links-category-title">quick links</h5>
        <ul>
          <li><a href="/about">about</a></li>
          <li><a href="/contact#faq">FAQ</a></li>
          <li><a href="/#blog">blog</a></li>
          <li><a href="/menu">menu</a></li>
        </ul>
      </div>
      <!-- other companies or affiliates -->
      <div>
        <h5 class="links-category-title">company</h5>
        <ul>
          <li><a target="_blank" rel="noreferrer" href="https://boatcruise.ng">boat cruise</a></li>
          <li><a target="_blank" rel="noreferrer" href="https://feedthekids.ng/">feedthekids</a></li>
          <li><a target="_blank" rel="noreferrer" href="https://softwork.xyz">softwork</a></li>
          <li><a target="_blank" rel="noreferrer" href="https://novarickhomes.com">novarick homes</a></li>
        </ul>
      </div>
      <!-- social media platforms -->
      <div class="social-section">
        <h5 class="links-category-title">social</h5>
        <div>
          You can follow us on these social media platforms, to keep up to-date with any and everything sannikayzkitchen.
        </div>
        <div class="social-links">
          <a href="https://facebook.com/sannikayz" target="_blank" rel="noreferrer" title="logo-facebook">
            <i class="ti ti-facebook"></i>
          </a> 
        
          <a href="https://twitter.com/@sannikayzkitchen" target="_blank" rel="noreferrer" title="logo-twitter">
            <i class="ti ti-twitter-alt"></i>
          </a> 

          <a href="https://instagram.com/@sannikayzkitchen" target="_blank" rel="noreferrer" title="logo-instagram">
            <i class="ti ti-instagram"></i>
          </a> 

          <a href="https://wa.me/c/2349024475402" target="_blank" rel="noreferrer" title="logo-whatsApp">
            <i class="ti ti-mobile"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- copyright section -->
  <div class="copyright-section">
    <span>&copy;</span><span>{copyrightYr}</span> SannikayzKitchen<sup>&trade;</sup>. All Rights Reserved.
  </div>
</footer>

<style>
  footer {
    background: var(--clr-text);
    color: var(--clr-white-sec);
  }

  .footer-links {
    padding: 1.8em 7.5em;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5em;
  }

  .footer-brand {
    width: 80px;
    height: 80px;
    background: var(--clr-white-sec);
    border-radius: 7px;
    margin-bottom: 1em;
    overflow: hidden;
  }

  .footer-address {
    display: grid;
    gap: 0.5em;
  }

  .address {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1em;
    align-items: center;
  }

  .address i {
    font-size: 1.3em;
    border-radius: 50px;
    padding: 0.5em;
    background-color: var(--clr-site-lite-sec);
    color: var(--clr-sec);
  }

  .address span {
    color: var(--clr-white-sec-lite);
  }

  .title {
    font-weight: lighter;
    margin-top: 0.7em;
    margin-bottom: 0em;
    line-height: 1.2;
    text-transform: capitalize;
    color: var(--clr-sec);
  }

  .opening-hours-section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.5em;
    line-height: 1.6;
    color: var(--clr-white-sec-lite);
  }

  .opening-hours-section span {
    font-variant: all-small-caps;
  }

  .day-time {
    text-transform: capitalize;
    letter-spacing: 1px;
  }

  .links-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(auto, 1fr));
    gap: 1em;
  }

  .links-category-title {
    margin-bottom: 1.4em;
    font-size: 1.3em;
    font-weight: bolder;
    text-transform: capitalize;
    letter-spacing: 1px;
    color: var(--clr-site-sec);
  }

  ul {
    list-style-type: none;
  }

  .links-category-title + ul li {
    padding: 0.8em 0;
  }

  .links-category-title + ul li:not(:last-of-type) {
    margin-bottom: 1em;
  }

  .links-category-title + ul li a {
    text-decoration: none;
    text-transform: capitalize;
    letter-spacing: 1px;
    color: var(--clr-white-sec-lite);
  }

  .links-category-title + ul li a:hover {
    text-decoration: underline;
  }

  .social-section > div {
    color: var(--clr-white-sec-lite);
    margin-bottom: 1em;
  }

  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    align-items: center;
  }

  .social-links a {
    text-decoration: none;
    text-align: center;
  }

  .social-links i {
    padding: 0.5em;
    font-size: 1.3em;
    border-radius: 50px;
    background-color: var(--clr-white-sec);
    color: var(--clr-text-sec);
  }

  .copyright-section {
    padding: 1.5em;
    border-top: 1px solid var(--clr-text-sec);
    text-align: center;
    color: var(--clr-white-sec-lite);
  }


  @media (min-width: 768px) and (max-width: 1024px) {
    .footer-links {
      padding: 1.8em 2.5em;
    }
  }

  @media (max-width: 500px) {
    .footer-links {
      padding: 1.8em 1.2em;
      grid-template-columns: 1fr;
    }

    .links-container {
      grid-template-columns: repeat(1, 1fr);
    }

    .copyright-section {
      font-size: 12px;
    }
  }
</style>