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

      <section data-scroll-section className={styles.portfolioItems}>
        <div className={styles.container}>
          <h2 className={styles.title}></h2>
          <div className={styles.workGrid}>
            <div className={styles.workGridItem}>
              <Link href="https://github.com/tronsymphony/nextjs-folio">
                <Image
                  loading="lazy"
                  alt="NodeJS"
                  width="294"
                  height="308"
                  className={styles.workGridItemImage}
                  src="/images/nestjs.jpg"
                ></Image>
                <span className={styles.title}>NodeJS/NestJS Backend</span>
                <span className={styles.description}>
                  User authentication along with session management api.
                </span>
                <span class="btn_link btn_link--light" href="/contact/">View Project<span><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z" fill="currentColor"></path></svg></span></span>
              </Link>
              
            </div>
            <div className={styles.workGridItem}>
              <Link href="https://github.com/tronsymphony">
                <Image
                  loading="lazy"
                  alt="NodeJS"
                  width="294"
                  height="308"
                  className={styles.workGridItemImage}
                  src="/images/laravel.jpg"
                ></Image>
                <span className={styles.title}>Laravel Backend</span>
                <span className={styles.description}>
                  User authentication along with session management api.
                </span>
                <span class="btn_link btn_link--light" href="/contact/">View Project<span><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z" fill="currentColor"></path></svg></span></span>
              </Link>
            </div>
            <div className={styles.workGridItem}>
              <Link href="https://github.com/tronsymphony/nextjs-folio">
                <Image
                  loading="lazy"
                  alt="NodeJS"
                  width="294"
                  height="308"
                  className={styles.workGridItemImage}
                  src="/images/nextjs.jpg"
                ></Image>
                <span className={styles.title}>Nextjs Backend</span>
                <span className={styles.description}>
                  User authentication along with session management api.
                </span>
                <span class="btn_link btn_link--light" href="/contact/">View Project<span><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z" fill="currentColor"></path></svg></span></span>
              </Link>
            </div>
            <div className={styles.workGridItem}>
              <Link href="https://github.com/tronsymphony/vnzla/blob/main/wp-content/themes/banescocontigo/blocks/src/accordions/edit.js">
                <Image
                  loading="lazy"
                  alt="NodeJS"
                  width="294"
                  height="308"
                  className={styles.workGridItemImage}
                  src="/images/wp.jpg"
                ></Image>
                <span className={styles.title}>Wordpress</span>
                <span className={styles.description}>
                  User authentication along with session management api.
                </span>
                <span class="btn_link btn_link--light" href="/contact/">View Project<span><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z" fill="currentColor"></path></svg></span></span>
              </Link>
            </div>
            <div className={styles.workGridItem}>
              <Link href="https://github.com/tronsymphony">
                <Image
                  loading="lazy"
                  alt="NodeJS"
                  width="294"
                  height="308"
                  className={styles.workGridItemImage}
                  src="/images/shopify.jpg"
                ></Image>
                <span className={styles.title}>Shopify</span>
                <span className={styles.description}>
                  User authentication along with session management api.
                </span>
                <span class="btn_link btn_link--light" href="/contact/">View Project<span><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z" fill="currentColor"></path></svg></span></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
