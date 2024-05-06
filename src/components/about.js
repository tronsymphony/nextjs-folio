import Link from "next/link";
import styles from "../app/about/about.module.scss";

export default function About() {
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className={styles.container}>
          <h1 className={styles.title}>About</h1>
          <span className={styles.subtitle}>Creative web and app developer with a flair for design.</span>
        </div>
      </section>
      <section className="home_skillset" data-scroll-section>
        <div className="container">
          <h4>I can help you with ...</h4>
          <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-21ec0b7/www.aaaaa.com/app/uploads/2022/09/image-abouthover-2.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">Design</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                <span>
                With a proven history in website design, I craft robust, user-friendly digital solutions, focusing on development 
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
                <h3 className="h2">Development</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                {" "}
                <span>
                  I build scalable websites from scratch that fit seamlessly with design. My focus is on PHP CMS, NextJS, React Phone Apps or Shopify.
                </span>
              </div>
            </div>
          </div>
          <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-21ec0b7/www.aaaaa.com/app/uploads/2022/09/image-abouthover-4.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">The full package
                </h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                {" "}
                <span>
                  A complete website from concept to implementation, that&apos;s what makes me stand out. My great sense for design and my development skills enable me to create kick-ass projects.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
