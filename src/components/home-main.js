import Image from "next/image";
import Link from "next/link";
// import HomePricing from "../components/home-pricing"
import HomeDot from "../components/homepage-threedot"
export default function HomeMain() {
  return (
    <section className="Home_main__OVLM4" >
      <section className="threedot" data-scroll-section>
        <HomeDot />
      </section>
      <section className="Home_welcome__aWiKA" data-scroll-section>
        <div className="Home_container__97eC3">
          <div data-scroll="" className="svg-mask cfadeinup-hero ">
            <h1 className="welcome_h3 gradient-title5" data-scroll data-scroll-speed="0">I am a fullstack developer in Los Angeles CA</h1>
            <span className="welcome_h3_role" data-scroll data-scroll-speed="0">
              I&#39;ve been developing various projects in a variety of languages such as PHP, JavaScript and C# for many years, I have experience with all types of industries and web applications.
            </span>
          </div>
          <div className="Home_btn_content__PvvjD"></div>
        </div>
      </section>
      <section className="home_about" data-scroll-section>
        <div className="container">
          <h2 className="title">
            Crafting Digital Solutions in Los Angeles
          </h2>
          <p className="ptitle">
            I&#39;ve created applications using all sorts of web technologies. Some of those range from Wordpress, Shopify CMS systems to frameworks such as NextJS, Laravel, and Umbraco.
          </p>
          <div className="ptitle">
            I have a passion for learning and am currently pursuing IT certifications such as CCNA and Comptia SEC+.
          </div>
        </div>
        <div data-scroll data-scroll-speed="2">
          <Image
            loading="lazy"
            alt="Crafting Digital Magic in the Heart of Los Angeles"
            width="294"
            height="308"
            className="img-fluid lazyloaded"
            decoding="async"
            src="/images/PXL_20231015_163749011.MP.webp"
          ></Image>
        </div>
      </section>
      <section className="home_info" data-scroll-section>
        <div className="container">
          <div className="row">
            <div data-scroll="" className="">
              <div data-scroll="" className="cfadeinup-inner-hero ">
                <h2 className="hero-heading gradient-title5">
                  Safe Streets Map
                </h2>
              </div>
              <div data-scroll="" className="cfadeinup-inner-sub ">
                <p className="ptitle">
                  An app designed to assist commuters in their daily commutes and errands.
                </p>
                <p className="tech-title">
                  Tech stack: ReactJS, NextJS, PostgreSQL and NodeJS.
                </p>
                <div className="tech-title">Includes a native ReactJS app</div>
              </div>
              <div className="we-text">

                <Link href="/contact/" className="btn btn-primary">
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="stats-block " data-scroll data-scroll-speed="2">
              <Image
                loading="lazy"
                height="400"
                width="400"
                aria-hidden="true"
                alt=""
                className="lazyloaded"
                decoding="async"
                src="/images/stm.jpg"
              ></Image>

            </div>
          </div>
        </div>
      </section>

      <section className="home_skillset" data-scroll-section>
        <div className="container">
          <h4>
            What makes me a great designer/developer option for your new
            project?
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
                <h3 className="h2">Digital Marketing</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">

              <span>One of my distinguishing qualities in digital marketing is my strategic approach. I focus on creating adaptable, targeted, and measurable campaigns that not only adhere to the highest industry standards but are also designed to dynamically engage audiences and drive growth.</span>

              </div>
            </div>
          </div> */}

          <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-21ec0b7/www.aaaaa.com/app/uploads/2022/09/image-abouthover-6-1.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">Advertising &  Marketing</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">

                <span>
                  Paid advertising offers key opportunities to drive impactful results. Through Google Ads, you can target potential customers at the exact moment they are searching for your products or services. Social media campaigns also allow precise targeting based on demographics, geographic locations, and purchasing behaviors. With over 3.5 billion Google searches daily and consumers spending nearly an hour on Facebook, the era of billboards and radio spots is long gone. Today, an effective online presence is crucial; merely having a website isn&apos;t enough.

                </span>
              </div>
            </div>
          </div>
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
                    style={{ width: "62px", height: "80px" }}
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
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-wordpress.svg"
                  ></Image>
                </span>
                <span className="d-block">Wordpress</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-shopify.svg"
                  ></Image>
                </span>
                <span className="d-block">Shopify</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
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
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/microsoft-net.svg"
                  ></Image>
                </span>
                <span className="d-block">Microsoft .NET</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-wordpress.svg"
                  ></Image>
                </span>
                <span className="d-block">Wordpress</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/client-magento.svg"
                  ></Image>
                </span>
                <span className="d-block">Magento</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-wordpress.svg"
                  ></Image>
                </span>
                <span className="d-block">Wordpress</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-shopify.svg"
                  ></Image>
                </span>
                <span className="d-block">Shopify</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/microsoft-net.svg"
                  ></Image>
                </span>
                <span className="d-block">Microsoft .Net</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/microsoft-net.svg"
                  ></Image>
                </span>
                <span className="d-block">Microsoft .Net</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-wordpress.svg"
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
                    style={{ width: "62px", height: "80px" }}
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
                    style={{ width: "62px", height: "80px" }}
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
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-react.svg"
                  ></Image>
                </span>
                <span className="d-block">React JS</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
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
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-apple.svg"
                  ></Image>
                </span>
                <span className="d-block">Apple iOS</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-android.svg"
                  ></Image>
                </span>
                <span className="d-block">Android</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
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
                    style={{ width: "62px", height: "80px" }}
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
                    style={{ width: "62px", height: "80px" }}
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
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-android.svg"
                  ></Image>
                </span>
                <span className="d-block">Android</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-android.svg"
                  ></Image>
                </span>
                <span className="d-block">Android</span>
              </div>
              <div className="client-block d-flex justify-content-center align-items-center flex-column">
                <span className="img-wrapper">
                  <Image
                    height="80"
                    width="62"
                    style={{ width: "62px", height: "80px" }}
                    aria-hidden="true"
                    alt=""
                    className="lazyloaded"
                    decoding="async"
                    src="/images/icon-android.svg"
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
                  I have designed, and have crafted creative web
                  solutions using a wide variety of platforms.
                </p>
                <Link href="/services/" className="btn-link btn-link-white">
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
                      src="/images/god.jpg"
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
              <div className="info_col" id="featured_2">
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
                      src="/images/bulletproof.jpg"
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
        <div className="home_look_image">
          <Image
            loading="lazy"
            alt=""
            width="522"
            height="560"
            className="image-home_look"
            src="/images/PXL_20231021_180041403.MP.webp"
          ></Image>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7" data-scroll="" data-scroll-speed="2">
              <h2>
                Are you looking for a website with a
                <span> fresh and modern user experience?</span>
              </h2>
              <div className="w-100">
                <p>
                  As a web designer in Los Angeles, I&apos;m here to transform
                  your digital space into an immersive journey. Reach out to me
                  today, and let&apos;s craft an online platform that leaves a
                  lasting impression.
                </p>
              </div>
              <Link href="/contact/" className="btn btn-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="project-output" data-scroll-section>
        <div className="container-header">
          <h2 className="title">Experienced with</h2>
          <p>Providing Results in an otherwise complicated web landscape.</p>
        </div>
        <div className="container">
          <div className="item">
            <Link
              lang="en"
              target="_blank"
              className="home w3c"
              href="https://www.w3.org/"
            >
              <svg
                role="img"
                aria-label="W3C"
                viewBox="0 0 68 34"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="m16.117 1.006 5.759 19.58 5.759-19.58h4.17 11.444v1.946l-5.879 10.128c2.065.663 3.627 1.868 4.686 3.615 1.059 1.748 1.589 3.799 1.589 6.155 0 2.914-.775 5.363-2.324 7.348s-3.555 2.978-6.017 2.978c-1.854 0-3.469-.589-4.845-1.767-1.377-1.178-2.396-2.773-3.058-4.786l3.256-1.35c.477 1.218 1.106 2.178 1.887 2.879.781.702 1.701 1.052 2.76 1.052 1.112 0 2.052-.622 2.82-1.866.768-1.245 1.152-2.74 1.152-4.489 0-1.933-.411-3.429-1.231-4.488-.954-1.244-2.45-1.867-4.489-1.867h-1.588v-1.906l5.56-9.612h-6.712l-.382.65-8.163 27.548h-.397l-5.958-19.937-5.957 19.937h-.397l-9.53-32.168h4.17l5.759 19.58 3.892-13.185-1.906-6.395z"
                    fill="#fff"
                  ></path>
                  <path
                    d="m64.92 1.006c-.819 0-1.554.295-2.111.861-.591.6-.92 1.376-.92 2.178s.313 1.545.887 2.128c.583.591 1.334.912 2.145.912.793 0 1.562-.321 2.161-.903.574-.557.887-1.3.887-2.136 0-.811-.321-1.57-.878-2.136-.584-.592-1.344-.904-2.171-.904zm2.643 3.065c0 .701-.271 1.351-.768 1.832-.524.507-1.174.777-1.892.777-.675 0-1.342-.278-1.84-.785s-.777-1.157-.777-1.849.287-1.368.802-1.891c.481-.49 1.131-.751 1.84-.751.726 0 1.376.271 1.883.785.49.489.752 1.147.752 1.882zm-2.559-1.807h-1.3v3.445h.65v-1.469h.642l.701 1.469h.726l-.769-1.57c.498-.102.785-.439.785-.929 0-.625-.472-.946-1.435-.946zm-.118.422c.608 0 .886.169.886.591 0 .405-.278.549-.87.549h-.549v-1.14z"
                    fill="#fff"
                  ></path>
                  <path
                    d="m59.807.825.676 4.107-2.391 4.575s-.918-1.941-2.443-3.015c-1.285-.905-2.122-1.102-3.431-.832-1.681.347-3.587 2.357-4.419 4.835-.995 2.965-1.005 4.4-1.04 5.718-.056 2.113.277 3.362.277 3.362s-1.452-2.686-1.438-6.62c.009-2.808.451-5.354 1.75-7.867 1.143-2.209 2.842-3.535 4.35-3.691 1.559-.161 2.791.59 3.743 1.403 1 .854 2.01 2.721 2.01 2.721z"
                    fill="#fff"
                  ></path>
                  <path
                    d="m60.102 24.063s-1.057 1.889-1.715 2.617c-.659.728-1.837 2.01-3.292 2.651s-2.218.762-3.656.624c-1.437-.138-2.772-.97-3.24-1.317s-1.664-1.369-2.34-2.322-1.733-2.859-1.733-2.859.589 1.91.958 2.721c.212.467.864 1.894 1.789 3.136.863 1.159 2.539 3.154 5.086 3.604 2.547.451 4.297-.693 4.73-.97s1.346-1.042 1.924-1.66c.603-.645 1.174-1.468 1.49-1.962.231-.36.607-1.092.607-1.092z"
                    fill="#fff"
                  ></path>
                </g>
              </svg>
              <span className="text">Web Accessibility Initiative WAI</span>
            </Link>
          </div>
          <div className="item">
            <Link href="https://pagespeed.web.dev/" target="_blank">
              <Image
                loading="lazy"
                width={200}
                height={200}
                src="/images/googlepagespeed.svg"
                alt="Google Pagespeed Insights Link"
              ></Image>
              <span className="text">Google Pagespeed Insights</span>
            </Link>
          </div>
          <div className="item">
            <Link href="https://www.google.com/" target="_blank">
              <Image
                loading="lazy"
                width={200}
                height={200}
                src="/images/Google__G__logo.svg"
                alt="Google Search Engine Optimized Link"
              ></Image>

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
                I specialize in optimizing website performance, ensuring faster
                load times and a smoother user experience. By fine-tuning
                backend functionalities and streamlining front-end elements, I
                can significantly boost your site&apos;s speed, enhancing both
                user satisfaction and SEO rankings. Whether you&apos;re looking
                to improve response times or reduce bounce rates, I can tailor a
                solution to meet your needs.
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Website Design</span>
              </h3>
              <p>
                I bring a unique blend of creativity and technical expertise to
                website design, crafting visually appealing and functionally
                robust websites tailored to meet your business objectives.
                Focused on user experience, I design intuitive interfaces that
                engage visitors and facilitate seamless interactions. Whether
                you&apos;re launching a new site or revamping an existing one,
                I&apos;m here to create a compelling online presence that
                resonates with your audience.
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Website Development</span>
              </h3>
              <p>
                I excel in website development, transforming designs into
                dynamic, fully functional websites tailored to specific business
                needs. Leveraging the latest technologies and best practices, I
                build responsive, scalable, and secure online platforms. My
                approach involves thorough testing and optimization to ensure
                top performance across all devices and browsers. Whether you
                need a simple static page or a complex web application, I
                deliver solutions that drive digital growth and enhance user
                engagement.
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
                I provide reliable website maintenance services to ensure your
                online platform remains up-to-date, secure, and performing at
                its best. My services include regular updates to software and
                plugins, security checks to protect against vulnerabilities, and
                performance optimizations to keep your site running smoothly. I
                also offer timely troubleshooting and support to address any
                issues that arise, minimizing downtime and maintaining a
                seamless user experience. With my maintenance services, you can
                have peace of mind knowing your website is in expert hands,
                allowing you to focus on growing your business.
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Search Engine Optimization</span>
              </h3>
              <p>
                I offer specialized services in Search Engine Optimization (SEO)
                to enhance your website&apos;s visibility and ranking on search
                engines. By implementing the latest SEO strategies, I focus on
                optimizing your site&apos;s content, structure, and on-page
                elements like meta tags and images. I also improve off-page
                factors such as backlinks and social media engagement to boost
                your site&apos;s authority and search rankings. Through a
                combination of thorough keyword research, competitive analysis,
                and continuous performance monitoring, I ensure your website
                attracts more organic traffic and reaches its target audience
                effectively.
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
              <span>
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </Link>
            <Link className="btn_link btn_link--light" href="/contact/">
              Talk To Me
              <span>
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
