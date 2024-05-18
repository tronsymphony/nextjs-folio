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

      <section data-scroll-section className={styles.portfolioItems}>
        <div className={styles.container}>
          <h2 className={styles.title}></h2>
          <div className={styles.workGrid}>
            <div className={styles.workGridItem}>
              <Link href="https://github.com/tronsymphony">
                <Image
                  loading="lazy"
                  alt="NodeJS"
                  width="294"
                  height="308"
                  className={styles.workGridItemImage}
                  src="/images/PXL_20231015_163749011.MP.webp"
                ></Image>
                <span className={styles.title}>NodeJS/NestJS Backend</span>
                <span className={styles.description}>
                  User authentication along with session management api.
                </span>
                <span class="btn_link btn_link--light" href="/contact/">Reach Out<span><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z" fill="currentColor"></path></svg></span></span>
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
                  src="/images/PXL_20231015_163749011.MP.webp"
                ></Image>
                <span className={styles.title}>NodeJS/NestJS Backend</span>
                <span className={styles.description}>
                  User authentication along with session management api.
                </span>
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
                  src="/images/PXL_20231015_163749011.MP.webp"
                ></Image>
                <span className={styles.title}>NodeJS/NestJS Backend</span>
                <span className={styles.description}>
                  User authentication along with session management api.
                </span>
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
                  src="/images/PXL_20231015_163749011.MP.webp"
                ></Image>
                <span className={styles.title}>NodeJS/NestJS Backend</span>
                <span className={styles.description}>
                  User authentication along with session management api.
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
