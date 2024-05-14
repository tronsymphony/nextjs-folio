import Image from 'next/image';
import Link from "next/link";

export default function HomeMain({ Component, pageProps }) {
  return (
    <section className="Home_main__OVLM4">
      <section className="Home_welcome__aWiKA" data-scroll-section>
        <div className="Home_container__97eC3">
          <div className="Home_content__WcTpR">
            <div data-scroll="" className="svg-mask cfadeinup-hero ">
              <video
                autoPlay
                playsInline
                muted
                aria-hidden="true"
                role="img"
                loop
                poster='./images/pexels-photo-1426718.webp'
              >
                <source src="images/ocean.mp4"></source>
              </video>

              <svg
                width="975"
                height="280"
                viewBox="0 0 975 280"
                xmlns="http://www.w3.org/2000/svg"
                data-scroll data-scroll-speed="1"
              >
                <defs>
                  <clipPath
                    id="text-path"
                    clipPathUnits="objectBoundingBox"
                    transform="scale(0.0024, 0.008)"
                  >
                    <path
                      d="M 42.481 50.391 L 59.522 50.391 A 27.814 27.814 0 0 1 58.017 58.393 A 24.347 24.347 0 0 1 55.518 63.501 A 23.778 23.778 0 0 1 46.652 71.601 A 28.906 28.906 0 0 1 45.24 72.315 A 32.36 32.36 0 0 1 35.746 75.071 A 41.427 41.427 0 0 1 30.128 75.44 A 34.587 34.587 0 0 1 20.501 74.169 A 25.814 25.814 0 0 1 8.057 66.309 Q 0.001 57.178 0.001 40.528 L 0.001 37.012 A 50.735 50.735 0 0 1 0.797 27.808 A 37.729 37.729 0 0 1 3.638 18.726 A 28.904 28.904 0 0 1 9.347 10.41 A 26.563 26.563 0 0 1 14.112 6.617 Q 20.948 2.344 29.932 2.344 Q 42.872 2.344 50.733 9.156 A 25.373 25.373 0 0 1 58.792 22.605 A 35.22 35.22 0 0 1 59.669 27.93 L 42.579 27.93 Q 42.462 24.061 41.324 21.492 A 8.597 8.597 0 0 0 39.307 18.604 A 9.514 9.514 0 0 0 35.999 16.668 Q 34.54 16.15 32.74 15.931 A 23.332 23.332 0 0 0 29.932 15.772 A 13.408 13.408 0 0 0 26.123 16.281 A 9.564 9.564 0 0 0 20.557 20.557 Q 17.944 24.755 17.511 33.348 A 68.451 68.451 0 0 0 17.432 35.84 L 17.432 40.87 A 72.623 72.623 0 0 0 17.611 46.152 Q 18.004 51.527 19.265 54.929 A 13.961 13.961 0 0 0 20.289 57.129 A 9.426 9.426 0 0 0 26.709 61.668 A 15.891 15.891 0 0 0 30.128 62.012 A 20.142 20.142 0 0 0 33.548 61.74 Q 35.429 61.416 36.922 60.703 A 9.484 9.484 0 0 0 39.161 59.229 A 8.861 8.861 0 0 0 41.501 55.765 Q 42.051 54.358 42.296 52.61 A 20.781 20.781 0 0 0 42.481 50.391 Z M 327.637 48.243 L 327.637 47.657 A 41.395 41.395 0 0 1 328.256 40.334 A 31.389 31.389 0 0 1 330.274 33.496 A 23.524 23.524 0 0 1 333.588 27.917 A 19.637 19.637 0 0 1 337.842 23.999 A 19.454 19.454 0 0 1 347.41 20.728 A 24.282 24.282 0 0 1 349.317 20.655 Q 357.569 20.655 362.208 26.221 L 362.794 21.631 L 377.735 21.631 L 377.735 72.461 A 25.284 25.284 0 0 1 376.973 78.796 A 20.323 20.323 0 0 1 374.488 84.595 A 20.199 20.199 0 0 1 367.14 91.474 A 25.345 25.345 0 0 1 365.089 92.505 A 30.866 30.866 0 0 1 357.123 94.804 A 41.308 41.308 0 0 1 350.831 95.264 Q 345.02 95.264 339.576 93.067 Q 334.131 90.87 331.251 87.354 L 338.135 77.686 A 14.881 14.881 0 0 0 349.031 83.069 A 19.911 19.911 0 0 0 350.245 83.106 A 15.295 15.295 0 0 0 354.623 82.534 Q 359.466 81.086 360.733 75.966 A 17.062 17.062 0 0 0 361.182 71.875 L 361.182 70.215 A 15.354 15.354 0 0 1 350.002 75.424 A 19.445 19.445 0 0 1 349.219 75.44 A 20.42 20.42 0 0 1 341.095 73.868 A 19.401 19.401 0 0 1 333.594 68.042 A 25.56 25.56 0 0 1 328.86 58.455 Q 327.637 53.862 327.637 48.243 Z M 272.852 21.631 L 288.282 21.631 L 288.819 27.832 A 17.528 17.528 0 0 1 301.567 20.767 A 23.844 23.844 0 0 1 303.907 20.655 A 21.939 21.939 0 0 1 308.657 21.136 Q 311.754 21.823 314.021 23.49 A 12.382 12.382 0 0 1 316.236 25.586 A 15.858 15.858 0 0 1 318.9 30.415 Q 320.373 34.545 320.46 40.43 L 320.46 74.463 L 303.956 74.463 L 303.956 41.114 A 15.851 15.851 0 0 0 303.828 39.029 Q 303.514 36.668 302.426 35.328 A 4.748 4.748 0 0 0 302.344 35.23 A 4.502 4.502 0 0 0 300.683 34.048 Q 299.234 33.42 296.991 33.357 A 18.138 18.138 0 0 0 296.485 33.35 A 9.649 9.649 0 0 0 293.456 33.8 A 7.548 7.548 0 0 0 289.307 37.159 L 289.307 74.463 L 272.852 74.463 L 272.852 21.631 Z M 204.493 74.463 L 188.038 74.463 A 10.204 10.204 0 0 1 187.507 73.308 Q 187.024 72.077 186.609 70.317 A 37.259 37.259 0 0 1 186.475 69.727 A 14.784 14.784 0 0 1 176.002 75.327 A 21.261 21.261 0 0 1 173.78 75.44 A 20.521 20.521 0 0 1 166.97 74.346 A 18.016 18.016 0 0 1 161.085 70.923 A 15.011 15.011 0 0 1 157.126 65.738 A 14.812 14.812 0 0 1 155.86 59.571 A 18.481 18.481 0 0 1 156.61 54.159 A 13.962 13.962 0 0 1 162.208 46.582 A 21.328 21.328 0 0 1 168.046 43.82 Q 170.829 42.953 174.217 42.546 A 54.268 54.268 0 0 1 180.665 42.188 L 185.743 42.188 L 185.743 39.405 Q 185.743 32.129 179.444 32.129 Q 174.818 32.129 173.844 35.72 A 8.306 8.306 0 0 0 173.585 37.891 L 157.13 37.891 A 14.467 14.467 0 0 1 162.032 26.762 A 19.455 19.455 0 0 1 163.648 25.44 A 23.848 23.848 0 0 1 172.62 21.452 Q 175.928 20.705 179.761 20.658 A 42.122 42.122 0 0 1 180.274 20.655 A 33.53 33.53 0 0 1 186.721 21.237 Q 192.396 22.35 196.241 25.586 A 16.519 16.519 0 0 1 202.061 36.516 A 23.294 23.294 0 0 1 202.247 39.112 L 202.247 62.5 A 40.602 40.602 0 0 0 202.497 66.617 Q 202.977 70.766 204.367 73.401 A 11.517 11.517 0 0 0 204.493 73.633 L 204.493 74.463 Z M 102.198 49.317 L 102.198 47.95 A 37.184 37.184 0 0 1 102.925 40.432 A 28.899 28.899 0 0 1 105.201 33.643 Q 108.204 27.442 113.965 24.048 A 24.199 24.199 0 0 1 122.397 21.065 A 32.228 32.228 0 0 1 127.637 20.655 A 28.923 28.923 0 0 1 135.181 21.586 A 20.853 20.853 0 0 1 145.215 27.564 Q 151.661 34.473 151.661 46.827 L 151.661 53.223 L 118.946 53.223 Q 119.825 57.666 122.803 60.205 A 10.377 10.377 0 0 0 127.534 62.458 A 14.795 14.795 0 0 0 130.518 62.745 Q 138.331 62.745 142.725 57.276 L 150.245 66.162 A 19.291 19.291 0 0 1 145.103 70.992 A 25.493 25.493 0 0 1 141.529 72.925 A 29.454 29.454 0 0 1 129.395 75.44 A 33.207 33.207 0 0 1 120.604 74.333 A 24.882 24.882 0 0 1 109.717 68.189 A 24.272 24.272 0 0 1 102.349 52.52 A 33.251 33.251 0 0 1 102.198 49.317 Z M 214.063 8.496 L 230.518 8.496 L 230.518 21.631 L 239.21 21.631 L 239.21 33.057 L 230.518 33.057 L 230.518 57.227 A 13.073 13.073 0 0 0 230.585 58.603 Q 230.787 60.498 231.592 61.377 A 2.778 2.778 0 0 0 232.523 62.02 Q 233.708 62.549 235.84 62.549 A 33.797 33.797 0 0 0 237.562 62.508 Q 238.38 62.466 239.085 62.382 A 15.611 15.611 0 0 0 239.942 62.256 L 239.942 74.024 A 30.368 30.368 0 0 1 230.665 75.44 Q 225.304 75.44 221.713 73.846 A 11.957 11.957 0 0 1 218.116 71.436 A 12.47 12.47 0 0 1 215.108 66.489 Q 214.063 63.419 214.063 59.278 L 214.063 33.057 L 207.325 33.057 L 207.325 21.631 L 214.063 21.631 L 214.063 8.496 Z M 99.122 21.241 L 98.829 36.524 L 93.409 36.133 A 18.92 18.92 0 0 0 89.925 36.429 Q 88.061 36.779 86.67 37.545 A 7.286 7.286 0 0 0 83.448 41.016 L 83.448 74.463 L 66.993 74.463 L 66.993 21.631 L 82.422 21.631 L 82.96 28.418 A 18.336 18.336 0 0 1 85.702 24.504 A 11.629 11.629 0 0 1 94.532 20.655 A 20.011 20.011 0 0 1 96.699 20.766 Q 97.772 20.883 98.701 21.123 A 11.404 11.404 0 0 1 99.122 21.241 Z M 263.038 21.631 L 263.038 74.463 L 246.534 74.463 L 246.534 21.631 L 263.038 21.631 Z M 361.182 59.18 L 361.182 36.963 A 7.767 7.767 0 0 0 356.044 33.59 A 12.551 12.551 0 0 0 353.516 33.35 Q 349.485 33.35 347.056 36.658 A 10.985 10.985 0 0 0 346.631 37.281 Q 344.166 41.173 344.141 48.536 A 44.493 44.493 0 0 0 344.141 48.682 A 28.114 28.114 0 0 0 344.404 52.652 Q 344.703 54.741 345.34 56.453 A 12.927 12.927 0 0 0 346.583 58.96 A 8.693 8.693 0 0 0 348.763 61.321 Q 350.586 62.644 353.043 62.737 A 9.922 9.922 0 0 0 353.419 62.745 Q 358.741 62.745 361.182 59.18 Z M 246.115 4.991 A 7.922 7.922 0 0 0 245.557 8.008 A 9.409 9.409 0 0 0 245.568 8.456 A 7.281 7.281 0 0 0 248.096 13.77 A 8.625 8.625 0 0 0 251.753 15.673 A 11.925 11.925 0 0 0 254.688 16.016 A 12.387 12.387 0 0 0 257.073 15.797 A 8.76 8.76 0 0 0 261.28 13.77 A 7.342 7.342 0 0 0 263.261 11.025 A 7.922 7.922 0 0 0 263.819 8.008 A 9.409 9.409 0 0 0 263.808 7.56 A 7.281 7.281 0 0 0 261.28 2.246 A 8.625 8.625 0 0 0 257.623 0.343 A 11.925 11.925 0 0 0 254.688 0 A 12.387 12.387 0 0 0 252.303 0.22 A 8.76 8.76 0 0 0 248.096 2.246 A 7.342 7.342 0 0 0 246.115 4.991 Z M 118.946 42.92 L 135.547 42.92 L 135.547 41.651 Q 135.63 38.325 134.158 36.26 A 6.416 6.416 0 0 0 133.546 35.523 A 6.798 6.798 0 0 0 130.366 33.695 Q 129.096 33.35 127.54 33.35 Q 120.313 33.35 118.946 42.92 Z M 185.743 59.424 L 185.743 50.977 L 180.958 50.977 A 13.944 13.944 0 0 0 177.715 51.32 Q 172.364 52.604 172.364 58.692 A 5.413 5.413 0 0 0 172.628 60.42 A 4.503 4.503 0 0 0 173.878 62.329 A 5.214 5.214 0 0 0 176.783 63.659 A 7.093 7.093 0 0 0 177.735 63.721 A 11.828 11.828 0 0 0 179.978 63.52 Q 181.336 63.258 182.422 62.653 A 7.052 7.052 0 0 0 182.838 62.403 A 10.621 10.621 0 0 0 184.27 61.298 Q 185.03 60.594 185.52 59.81 A 6.159 6.159 0 0 0 185.743 59.424 Z"
                      vectorEffect="non-scaling-stroke"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h1 className="welcome_h3" data-scroll data-scroll-speed="2">Welcome, I am Nitya, a full-stack developer in Los Angeles, CA</h1>

          </div>
          <div className="Home_btn_content__PvvjD"></div>
        </div>
        {/* <Image className="Home_arrow__2WCZ0" src="/_next/static/media/arrow.22337a2c.svg" alt=""></Image> */}
      </section>
      <section className="home_about" data-scroll-section>
        <div className="container">
          <h2 className="title">
            Crafting Digital Magic in the Heart of Los Angeles
          </h2>
          <p className="ptitle">
            I design, build and optimise bespoke Shopify Plus, Laravel,
            WordPress, ReactJS, and Nextjs solutions to elevate and grow your business.
          </p>
        </div>
        <div data-scroll data-scroll-speed="2">
          <Image
            loading="lazy"
            alt="Crafting Digital Magic in the Heart of Los Angeles"
            width="294"
            height="308"
            className="img-fluid lazyloaded"
            decoding="async"
            src="images/PXL_20231015_163749011.MP.webp"
          ></Image>
        </div>
      </section>
      <section className="home_info" data-scroll-section>
        <div className="container">
          <div className="row">
            <div data-scroll="" className="">
              <div data-scroll="" className="cfadeinup-inner-hero ">
                <h2 className="hero-heading gradient-title5">
                  Websites, eCommerce, Mobile Apps and more
                </h2>
              </div>
              <div data-scroll="" className="cfadeinup-inner-sub ">
                <h3 className="h2">
                  I provide services using the latest technologies and methodologies
                </h3>
              </div>
              <div className="we-text">
                <p>
                  Based in Los Angeles, I provide services in innovative web
                  development & digital solutions, crafting exceptional digital
                  experiences!
                </p>
                <Link
                  href="/contact/"
                  className="btn btn-primary"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="stats-block " data-scroll data-scroll-speed="4">
              {/* <div className="statistics">
                <span className="h2 d-block">Many Years</span>
                <span className="body-large d-block">Years of </span>
              </div> */}
              {/* <div className="statistics">
                <span className="h2 d-block">100s</span>
                <span className="body-large d-block">
                  Websites &amp; projects launched
                </span>
              </div> */}
              <Image
                loading="lazy"
                height="400"
                width="400"
                aria-hidden="true"
                alt=""
                className="lazyloaded"
                decoding="async"
                src="/images/pho.webp"
              ></Image>
            </div>
          </div>
        </div>
      </section>

      <section className="home_skillset" data-scroll-section>
        <div className="container">
          <h4>
            What makes me a great designer/developer option for your new project?
          </h4>
          {/* <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-21ec0b7/www.aaaaa.com/app/uploads/2022/09/image-abouthover-1.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">Longevity</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">

                <span>
                  As a web developer, I&apos;ve been proudly serving the Los Angeles
                  community for nearly a decade, offering exceptional web
                  development services with a personal touch.
                </span>
              </div>
            </div>
          </div>
           */}
          <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-21ec0b7/www.aaaaa.com/app/uploads/2022/09/image-abouthover-2.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">Web Dev &amp; Design Focus</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">

                <span>
                  I am known for my expert web development services and creative
                  design concepts. My main focus on web design sets your website
                  apart from the online competition, ensuring a unique and
                  compelling online presence.
                </span>
              </div>
            </div>
          </div>
          <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-21ec0b7/www.aaaaa.com/app/uploads/2022/09/image-abouthover-3.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">Breathtaking Design</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">

                <span>
                  One thing that sets me apart is my approach to design. I take
                  pride in developing design elements that are flexible,
                  dynamic, and responsive, all while adhering to the highest
                  industry standards.
                </span>
              </div>
            </div>
          </div>
          {/* <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-21ec0b7/www.aaaaa.com/app/uploads/2022/09/image-abouthover-4.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">On-Brand Experiences</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">

                <span>
                  Branding is my business, and as one of the best branding
                  professionals, I personally take care of your brand
                  development and integration. I&apos;ve helped numerous brands
                  exceed their web design requirements by delivering versatility
                  through web design elements and features.
                </span>
              </div>
            </div>
          </div> */}

          {/* <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-21ec0b7/www.aaaaa.com/app/uploads/2022/09/image-abouthover-6-1.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">Partnership &amp; Collaboration</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">

                <span>
                  You can expect to receive clear and transparent communication
                  from the beginning of your web design project through til it&apos;s
                  completion. And once your project has launched, I am here to
                  support your continued success online with our web maintenance
                  services, available by request.
                </span>
              </div>
            </div>
          </div> */}

        </div>
      </section>


      <section
        className="hp-client-wrap client-wrap technologies-logos nitro-offscreen nitro-lazy-render"
        data-scroll-section=""
        data-scroll-section-id="section9"
        data-scroll-section-inview=""
      >
        <div className="client-title">
          <div className="container">
            <h3
              data-scroll=""
              className="cfadeinup-inner-hero h1 gradient-title9 "
            >
              Expert in leading industry standard platforms &amp; technologies.
            </h3>
          </div>
        </div>
        <div className="client-section client-label">
          <div className="client-slider">
            <div
              className="d-flex client-slide"
              data-scroll=""
              data-scroll-direction="horizontal"
              data-scroll-speed="3"
            >
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    loading="lazy"
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/laravel.svg"
                  ></Image>
                </span>
                <span className="d-block">Laravel</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    loading="lazy"
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-wordpress.svg"
                  ></Image>
                </span>
                <span className="d-block">Wordpress</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-shopify.svg"
                  ></Image>
                </span>
                <span className="d-block">Shopify</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/ios.svg"
                  ></Image>
                </span>
                <span className="d-block">iPhone</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/microsoft-net.svg"
                  ></Image>
                </span>
                <span className="d-block">Microsoft .NET</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-wordpress.svg"
                  ></Image>
                </span>
                <span className="d-block">Wordpress</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/client-magento.svg"
                  ></Image>
                </span>
                <span className="d-block">Magento</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-wordpress.svg"
                  ></Image>
                </span>
                <span className="d-block">Wordpress</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-shopify.svg"
                  ></Image>
                </span>
                <span className="d-block">Shopify</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/microsoft-net.svg"
                  ></Image>
                </span>
                <span className="d-block">Microsoft .Net</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/microsoft-net.svg"
                  ></Image>
                </span>
                <span className="d-block">Microsoft .Net</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-wordpress.svg"
                  ></Image>
                </span>
                <span className="d-block">Wordpress</span>
              </div>
            </div>
          </div>
        </div>
        <div className="client-section dark-bg client-label">
          <div className="client-slider">
            <div
              className="d-flex client-slide"
              data-scroll=""
              data-scroll-direction="horizontal"
              data-scroll-speed="-3"
            >
              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/nextjs.svg"
                  ></Image>
                </span>
                <span className="d-block">NextJs</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/vue-js.svg"
                  ></Image>
                </span>
                <span className="d-block">VueJS</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-react.svg"
                  ></Image>
                </span>
                <span className="d-block">React JS</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    src="/images/vue-js.svg"
                  ></Image>
                </span>
                <span className="d-block">VueJS</span>
              </div>

              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-apple.svg"
                  ></Image>
                </span>
                <span className="d-block">Apple iOS</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-android.svg"
                  ></Image>
                </span>
                <span className="d-block">Android</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/nextjs.svg"
                  ></Image>
                </span>
                <span className="d-block">NextJS</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/nextjs.svg"
                  ></Image>
                </span>
                <span className="d-block">NextJS</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/nextjs.svg"
                  ></Image>
                </span>
                <span className="d-block">NextJS</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-android.svg"
                  ></Image>
                </span>
                <span className="d-block">Android</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-android.svg"
                  ></Image>
                </span>
                <span className="d-block">Android</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">

                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="images/icon-android.svg"
                  ></Image>
                </span>
                <span className="d-block">Android</span>
              </div>
            </div>
          </div>
        </div>
        <div className="client-title client-content-btm">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-6 client-wrap-heading">
                <p>
                  I have designed, and have crafted
                  creative web design solutions using a wide variety of
                  platforms.
                </p>
                <Link
                  href="/services/"
                  className="btn-link btn-link-white"
                >
                  Which platform is right for you?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home_work" data-scroll-section>
        <div className="container">
          <header>
            <h2 className="title">Featured Projects</h2>
          </header>
        </div>
        <div className="work-casestudy-loop pattern-1">
          <div className="container">
            <div className="row">
              <div className="info_col" id="featured_0">
                <div
                  data-scroll
                  data-scroll-sticky
                  data-scroll-target="#featured_0"
                  className="casestudy-title"
                >
                  <span>godaddy.com/ventureforward</span>
                  <h3>Creating a Better Online Presence</h3>
                </div>
              </div>
              <div className="site_project">
                <div
                  className="casestudy-image"
                  style={{ backgroundColor: "#dde5ef" }}
                >
                  <div className="casestudy-image-wrapper ">
                    <Image
                      loading="lazy"
                      src="images/god.jpg"
                      alt="Godaddy"
                      height="370"
                      width="740"
                    ></Image>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="work-casestudy-loop pattern-2">
          <div className="container">
            <div className="row">
              <div className="info_col" id="featured_2"
              >
                <div
                  className="casestudy-title"
                  data-scroll
                  data-scroll-sticky
                  data-scroll-target="#featured_2"
                >
                  <span>bulletproof.com</span>
                  <h3>Lighting up an internet presence.</h3>
                </div>
              </div>
              <div className="site_project">
                <div
                  className="casestudy-image"
                  style={{ backgroundColor: "#dde5ef" }}
                >
                  <div className="casestudy-image-wrapper ">
                    <Image
                      loading="lazy"
                      src="images/bulletproof.jpg"
                      alt="Bulletproof Screenshot"
                      height="370"
                      width="740"
                    ></Image>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home_look" data-scroll-section>
        <div
          className="home_look_image"

        >
          <Image
            loading="lazy"
            alt=""
            width="522"
            height="560"
            className="image-home_look"
            src="images/PXL_20231021_180041403.MP.webp"
          ></Image>
        </div>
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-7"
              data-scroll=""
              data-scroll-speed="2">
              <h2>
                Are you looking for a website with a
                <span> fresh and modern user experience?</span>
              </h2>
              <div className="w-100">
                <p>
                  As a web designer in Los Angeles, I&apos;m here to transform your
                  digital space into an immersive journey. Reach out to me
                  today, and let&apos;s craft an online platform that leaves a
                  lasting impression.
                </p>
              </div>
              <Link
                href="/contact/"
                className="btn btn-primary"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="project-output" data-scroll-section>
        <div className="container-header">
          <h2 className="title">Experienced with</h2>
          <p>Providing Results in an Otherwise Complicated landscape</p>
        </div>
        <div className="container">
          <div className="item"

          >
            <Link lang="en" target="_blank" className="home w3c" href="https://www.w3.org/">
              <svg
                role="img"
                aria-label="W3C"
                viewBox="0 0 68 34"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m16.117 1.006 5.759 19.58 5.759-19.58h4.17 11.444v1.946l-5.879 10.128c2.065.663 3.627 1.868 4.686 3.615 1.059 1.748 1.589 3.799 1.589 6.155 0 2.914-.775 5.363-2.324 7.348s-3.555 2.978-6.017 2.978c-1.854 0-3.469-.589-4.845-1.767-1.377-1.178-2.396-2.773-3.058-4.786l3.256-1.35c.477 1.218 1.106 2.178 1.887 2.879.781.702 1.701 1.052 2.76 1.052 1.112 0 2.052-.622 2.82-1.866.768-1.245 1.152-2.74 1.152-4.489 0-1.933-.411-3.429-1.231-4.488-.954-1.244-2.45-1.867-4.489-1.867h-1.588v-1.906l5.56-9.612h-6.712l-.382.65-8.163 27.548h-.397l-5.958-19.937-5.957 19.937h-.397l-9.53-32.168h4.17l5.759 19.58 3.892-13.185-1.906-6.395z" fill="#fff"></path>
                  <path d="m64.92 1.006c-.819 0-1.554.295-2.111.861-.591.6-.92 1.376-.92 2.178s.313 1.545.887 2.128c.583.591 1.334.912 2.145.912.793 0 1.562-.321 2.161-.903.574-.557.887-1.3.887-2.136 0-.811-.321-1.57-.878-2.136-.584-.592-1.344-.904-2.171-.904zm2.643 3.065c0 .701-.271 1.351-.768 1.832-.524.507-1.174.777-1.892.777-.675 0-1.342-.278-1.84-.785s-.777-1.157-.777-1.849.287-1.368.802-1.891c.481-.49 1.131-.751 1.84-.751.726 0 1.376.271 1.883.785.49.489.752 1.147.752 1.882zm-2.559-1.807h-1.3v3.445h.65v-1.469h.642l.701 1.469h.726l-.769-1.57c.498-.102.785-.439.785-.929 0-.625-.472-.946-1.435-.946zm-.118.422c.608 0 .886.169.886.591 0 .405-.278.549-.87.549h-.549v-1.14z" fill="#fff"></path>
                  <path d="m59.807.825.676 4.107-2.391 4.575s-.918-1.941-2.443-3.015c-1.285-.905-2.122-1.102-3.431-.832-1.681.347-3.587 2.357-4.419 4.835-.995 2.965-1.005 4.4-1.04 5.718-.056 2.113.277 3.362.277 3.362s-1.452-2.686-1.438-6.62c.009-2.808.451-5.354 1.75-7.867 1.143-2.209 2.842-3.535 4.35-3.691 1.559-.161 2.791.59 3.743 1.403 1 .854 2.01 2.721 2.01 2.721z" fill="#fff"></path>
                  <path d="m60.102 24.063s-1.057 1.889-1.715 2.617c-.659.728-1.837 2.01-3.292 2.651s-2.218.762-3.656.624c-1.437-.138-2.772-.97-3.24-1.317s-1.664-1.369-2.34-2.322-1.733-2.859-1.733-2.859.589 1.91.958 2.721c.212.467.864 1.894 1.789 3.136.863 1.159 2.539 3.154 5.086 3.604 2.547.451 4.297-.693 4.73-.97s1.346-1.042 1.924-1.66c.603-.645 1.174-1.468 1.49-1.962.231-.36.607-1.092.607-1.092z" fill="#fff"></path>
                </g>
              </svg>
              <span className="text">Web Accessibility Initiative WAI</span>
            </Link>
          </div>
          <div className="item"

          >
            <Link href="https://pagespeed.web.dev/" target="_blank">
              <Image
                loading="lazy"
                width={200}
                height={200}
                src="./images/googlepagespeed.svg"
                alt="Google Pagespeed Insights Link"></Image>
              <span className="text">Google Pagespeed Insights</span>
            </Link>
          </div>
          <div className="item"

          >
            <Link href="https://www.google.com/" target="_blank">
              <Image
                loading="lazy"
                width={200}
                height={200}
                src="images/Google__G__logo.svg"
                alt="Google Search Engine Optimized Link"></Image>

              <span className="text">Google Search Engine Optimized</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="home_services" data-scroll-section>
        <div className="container">
          <h2 className="title">
            More Traffic, More Revenue <br />
            Let&apos;s Go Digital
          </h2>
          <div className="services">
            <div className="item">
              <h3 className="title">
                <span>WCAG Compliance</span>
              </h3>
              <p>
                From creative designs to ADA compliance audits and performance
                analysis, I specialize in designing personalized, accessible,
                and user-friendly experiences to ensure ADA compliance across
                various digital platforms.
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Speed Optimisation</span>
              </h3>
              <p>
                I specialize in optimizing website performance, ensuring faster load times and a smoother user experience. By fine-tuning backend functionalities and streamlining front-end elements, I can significantly boost your site&apos;s speed, enhancing both user satisfaction and SEO rankings. Whether you&apos;re looking to improve response times or reduce bounce rates, I can tailor a solution to meet your needs.
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Website Design</span>
              </h3>
              <p>
                I bring a unique blend of creativity and technical expertise to website design, crafting visually appealing and functionally robust websites tailored to meet your business objectives. Focused on user experience, I design intuitive interfaces that engage visitors and facilitate seamless interactions. Whether you&apos;re launching a new site or revamping an existing one, I&apos;m here to create a compelling online presence that resonates with your audience.
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Website Development</span>
              </h3>
              <p>
                I excel in website development, transforming designs into dynamic, fully functional websites tailored to specific business needs. Leveraging the latest technologies and best practices, I build responsive, scalable, and secure online platforms. My approach involves thorough testing and optimization to ensure top performance across all devices and browsers. Whether you need a simple static page or a complex web application, I deliver solutions that drive digital growth and enhance user engagement.
              </p>
            </div>

            {/* <div className="item">
              <h3 className="title">
                <span>Enterprise CMS Solutions</span>
              </h3>
              <p>
                I specialize in implementing enterprise CMS solutions that streamline content management processes and enhance collaboration across large organizations. By customizing robust CMS platforms, I empower businesses to manage their digital content efficiently, ensuring consistency and compliance across all channels. My expertise includes integrating advanced features like multi-language support, role-based access control, and automated workflows to create scalable, secure, and user-friendly environments that meet the complex needs of enterprise operations.
              </p>
            </div> */}

            {/* <div className="item">
              <h3 className="title">
                <span>Website Redesign Services</span>
              </h3>
              <p>
                I offer comprehensive website redesign services that breathe new life into your online presence. By assessing your current website and understanding your business goals, I craft a fresh, modern design that enhances user experience and engagement. My redesign strategies focus on improving site navigation, aesthetics, and functionality, ensuring your website aligns with the latest web standards and trends. This revitalization not only attracts more visitors but also boosts conversions, helping your business stay competitive in a rapidly evolving digital landscape.
              </p>
            </div> */}

            <div className="item">
              <h3 className="title">
                <span>Website Maintenance Services</span>
              </h3>
              <p>
                I provide reliable website maintenance services to ensure your online platform remains up-to-date, secure, and performing at its best. My services include regular updates to software and plugins, security checks to protect against vulnerabilities, and performance optimizations to keep your site running smoothly. I also offer timely troubleshooting and support to address any issues that arise, minimizing downtime and maintaining a seamless user experience. With my maintenance services, you can have peace of mind knowing your website is in expert hands, allowing you to focus on growing your business.
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Search Engine Optimization</span>
              </h3>
              <p>
                I offer specialized services in Search Engine Optimization (SEO) to enhance your website&apos;s visibility and ranking on search engines. By implementing the latest SEO strategies, I focus on optimizing your site&apos;s content, structure, and on-page elements like meta tags and images. I also improve off-page factors such as backlinks and social media engagement to boost your site&apos;s authority and search rankings. Through a combination of thorough keyword research, competitive analysis, and continuous performance monitoring, I ensure your website attracts more organic traffic and reaches its target audience effectively.
              </p>
            </div>
          </div>
          <div className="link-widget-wrap">
            <Link
              className="btn_link btn_link--light"
              href="/services/"
              target="_blank"
              rel="noopener"
            >

              More Services
              <span><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z" fill="currentColor"></path></svg></span>
            </Link>
            <Link className="btn_link btn_link--light" href="/contact/">
              Talk To Me
              <span><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z" fill="currentColor"></path></svg></span>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
