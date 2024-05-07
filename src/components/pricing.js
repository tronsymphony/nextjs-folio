import Link from "next/link";
import styles from "../app/pricing/pricing.module.scss";

export default function About() {
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className={styles.container}>
          <h1 className={styles.title}>Pricing</h1>
          <span className={styles.subtitle}>Pricing for your next level digital products</span>
        </div>
      </section>

      <div className={styles.nstWidgetOhioHeading} data-scroll-section>
        <div className="nst-widget-container">
          <div className="ohio-widget heading -center">
            <div className="subtitle">
              Suitable For Every Individual/Business
            </div>
            <h3 className={styles.title}>Pricing Plans</h3>
          </div>
        </div>
      </div>

      <section
        data-scroll-section
        className={styles.nstSection}
      >
        <div className={styles.nstContainer}>
          <div className={styles.nstColumn}>
            <div className="nst-widget-container">
              <div className="ohio-widget pricing-table">
                <div className={styles.pricingTableHeadline}>
                  <h5 className={styles.title}>Startup Plan</h5>
                  <p className={styles.subtitle}>
                    Good for Basic Start-ups
                  </p>
                </div>
                <div className={styles.pricingTablePrice}>
                  <span className="price-number">
                    $100{" "}
                  </span>
                </div>
                <div className={styles.pricingTableFeatures}>
                  <ul className={styles["-unlist -large"]}>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>
                        Functional Website &amp; Design
                      </span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}> 1-4 Pages</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>Design Customization</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>Responsive Design</span>
                    </li>
                    <li className={styles.missing}>
                      <i className={styles.icon}>
                        <img src="../images/close.svg" alt="close" />
                      </i>
                      <span className={styles.title}>
                        Custom Design Or Feature
                      </span>
                    </li>
                    <li className={styles.missing}>
                      <i className={styles.icon}>
                        <img src="../images/close.svg" alt="close" />
                      </i>
                      <span className={styles.title}>Content Upload</span>
                    </li>
                    <li className={styles.missing}>
                      <i className={styles.icon}>
                        <img src="../images/close.svg" alt="close" />
                      </i>
                      <span className={styles.title}> E-Commerce</span>
                    </li>
                    <li className={styles.missing}>
                      <i className={styles.icon}>
                        <img src="../images/close.svg" alt="close" />
                      </i>
                      <span className={styles.title}> Live Chat</span>
                    </li>
                    <li className={styles.missing}>
                      <i className={styles.icon}>
                        <img src="../images/close.svg" alt="close" />
                      </i>
                      <span className={styles.title}>SEO</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
          <div
            className={styles.nstColumn}
          >
            <div className="nst-widget-container">
              <div className="ohio-widget pricing-table">
                <div className={styles.pricingTableHeadline}>
                  <h5 className={styles.title}>Professional Plan</h5>
                  <p className={styles.subtitle}>
                    Good for Professionals
                  </p>
                </div>
                <div className={styles.pricingTablePrice}>
                  <span className="price-number">
                    $250{" "}
                  </span>
                </div>
                <div className={styles.pricingTableFeatures}>
                  <ul className={styles["-unlist -large"]}>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}> Functional website</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>1-10 Pages</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>Design customization</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>
                        Custom Design &amp; Features
                      </span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>Content upload</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>
                        E-commerce + Payment Setup
                      </span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>10 Revisions</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>
                        Live Chat (Only On Request)
                      </span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>Basic SEO</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
          <div
            className={styles.nstColumn}
          >
            <div className="nst-widget-container">
              <div className="ohio-widget pricing-table">
                <div className={styles.pricingTableHeadline}>
                  <h5 className={styles.title}>Premium Plan</h5>
                  <p className={styles.subtitle}>
                    Good for Luxury Seekers
                  </p>
                </div>
                <div className={styles.pricingTablePrice}>
                  <span className="price-number">
                    $399{" "}
                  </span>
                </div>
                <div className={styles.pricingTableFeatures}>
                  <ul>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>
                        Functional Website &amp; Design
                      </span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>10-15 pages</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>Design customization</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>
                        Custom Design &amp; Features
                      </span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>5 Revisions</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>
                        E-commerce + Business Growth
                      </span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>20 Revisions</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>Live Chat Automation</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>SEO + FREE Strategy</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
          <div
            className={styles.nstColumn}
          >
            <div className="nst-widget-container">
              <div className="ohio-widget pricing-table">
                <div className={styles.pricingTableHeadline}>
                  <h5 className={styles.title}>Custom</h5>
                  <p className={styles.subtitle}>
                    Good for Large Businesses
                  </p>
                </div>
                <div className={styles.pricingTablePrice}>
                  <span className="price-number"># </span>
                </div>
                <div className={styles.pricingTableFeatures}>
                  <ul className={styles["-unlist -large"]}>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>
                        Functional Website &amp; Design
                      </span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}># Pages</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>Design Customization</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>Responsive Design</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>
                        Custom Design Or Feature
                      </span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>Content Upload</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}> E-Commerce + Strategy</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}> Live Chat &amp; More</span>
                    </li>
                    <li className="exist">
                      <i className={styles.icon}>
                        <img src="/images/check.svg" role="presentation" alt="check" />
                      </i>
                      <span className={styles.title}>Many More</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
