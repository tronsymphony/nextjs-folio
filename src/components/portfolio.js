import Image from "next/image";
import Link from "next/link";
import styles from "../app/portfolio/portfolio.module.scss";

export default function Portfolio() {
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className={styles.container}>
          <h1 className={styles.title}>Portfolio</h1>
          <span className={styles.subtitle}>Personal Projects & Work</span>
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

    </>
  );
}
