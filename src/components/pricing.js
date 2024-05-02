import Link from "next/link";
import styles from "../app/pricing/pricing.module.css";

export default function About() {
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className="container">
          <h1 className={styles.title}>About</h1>
        </div>
      </section>

      <div className={styles["nst-widget-ohio_heading"]} data-scroll-section>
        <div className="nst-widget-container">
          <div className="ohio-widget heading -center">
            <div className="subtitle">
              Suitable For Every Individual/Business
            </div>
            <h3 className="title">Pricing Plans</h3>
          </div>
        </div>
      </div>

      <section
        data-scroll-section
        className="nst-section nst-inner-section 
        "
      >
        <div className="nst-container nst-column-gap-default">
          <div className="nst-column">
            <div className="nst-widget-wrap nst-element-populated">
              <div className="nst-element nst-element-9e6157e">
                <div className="nst-widget-container">
                  <div className="ohio-widget pricing-table">
                    <div className="pricing-table-headline">
                      <h5 className="title">Startup Plan</h5>
                      <p className="subtitle -unspace">
                        Good for Basic Start-ups
                      </p>
                    </div>
                    <div className="pricing-table-price">
                      <span className="price-number">
                        $100{" "}
                      </span>
                    </div>
                    <div className="pricing-table-features">
                      <ul className={styles["-unlist -large"]}>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">
                            Functional Website &amp; Design
                          </span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title"> 1-4 Pages</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">Design Customization</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">Responsive Design</span>
                        </li>
                        <li className="missing">
                          <i className="icon">
                            <img src="images/close.svg" alt="" />
                          </i>
                          <span className="title">
                            Custom Design Or Feature
                          </span>
                        </li>
                        <li className="missing">
                          <i className="icon">
                            <img src="images/close.svg" alt="" />
                          </i>
                          <span className="title">Content Upload</span>
                        </li>
                        <li className="missing">
                          <i className="icon">
                            <img src="images/close.svg" alt="" />
                          </i>
                          <span className="title"> E-Commerce</span>
                        </li>
                        <li className="missing">
                          <i className="icon">
                            <img src="images/close.svg" alt="" />
                          </i>
                          <span className="title"> Live Chat</span>
                        </li>
                        <li className="missing">
                          <i className="icon">
                            <img src="images/close.svg" alt="" />
                          </i>
                          <span className="title">SEO</span>
                        </li>
                      </ul>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="nst-column"
          >
            <div className="nst-widget-wrap nst-element-populated">
              <div
                className="nst-element nst-element-fa8bc78"
              >
                <div className="nst-widget-container">
                  <div className="ohio-widget pricing-table">
                    <div className="pricing-table-headline">
                      <h5 className="title">PROFESSIONAL Plan</h5>
                      <p className="subtitle -unspace">
                        Good for Professionals
                      </p>
                    </div>
                    <div className="pricing-table-price">
                      <span className="price-number">
                        $250{" "}
                      </span>
                    </div>
                    <div className="pricing-table-features">
                      <ul className={styles["-unlist -large"]}>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title"> Functional website</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">1-10 Pages</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">Design customization</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">
                            Custom Design &amp; Features
                          </span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">Content upload</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">
                            E-commerce + Payment Setup
                          </span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">10 Revisions</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">
                            Live Chat (Only On Request)
                          </span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">Basic SEO</span>
                        </li>
                      </ul>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="nst-column"
          >
            <div className="nst-widget-wrap nst-element-populated">
              <div
                className="nst-element nst-element-38f6f90"
              >
                <div className="nst-widget-container">
                  <div className="ohio-widget pricing-table">
                    <div className="pricing-table-headline">
                      <h5 className="title">Premium Plan</h5>
                      <p className="subtitle -unspace">
                        Good for Luxury Seekers
                      </p>
                    </div>
                    <div className="pricing-table-price">
                      <span className="price-number">
                        $399{" "}
                      </span>
                    </div>
                    <div className="pricing-table-features">
                      <ul className={styles["-unlist -large"]}>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">
                            Functional Website &amp; Design
                          </span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">10-15 pages</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">Design customization</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">
                            Custom Design &amp; Features
                          </span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">5 Revisions</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">
                            E-commerce + Business Growth
                          </span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">20 Revisions</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">Live Chat Automation</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">SEO + FREE Strategy</span>
                        </li>
                      </ul>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="nst-column"
          >
            <div className="nst-widget-wrap nst-element-populated">
              <div
                className="nst-element nst-element-f3e9e45"
              >
                <div className="nst-widget-container">
                  <div className="ohio-widget pricing-table">
                    <div className="pricing-table-headline">
                      <h5 className="title">Custom</h5>
                      <p className="subtitle -unspace">
                        Good for Large Businesses
                      </p>
                    </div>
                    <div className="pricing-table-price">
                      <span className="price-number"># </span>
                    </div>
                    <div className="pricing-table-features">
                      <ul className={styles["-unlist -large"]}>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">
                            Functional Website &amp; Design
                          </span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title"># Pages</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">Design Customization</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">Responsive Design</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">
                            Custom Design Or Feature
                          </span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">Content Upload</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title"> E-Commerce + Strategy</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title"> Live Chat &amp; More</span>
                        </li>
                        <li className="exist">
                          <i className="icon">
                            <img src="/images/check.svg" alt="check" />
                          </i>
                          <span className="title">Many More</span>
                        </li>
                      </ul>
                    </div>
                    
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
