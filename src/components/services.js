import Link from "next/link";
import styles from "../app/about/about.module.css";

export default function Services() {
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className="container">
          <h1 className={styles.title}>Services</h1>
          <p>
          We are fearless about taking on challenges!

          </p>
          <p>
          With collaboration at our core, we are ready to work with you to craft winning solutions. We excel at listening, and then acting on your needs, to deliver a successful project outcome. Our team of experts are equipped with the knowledge and experience needed to get the job done, and are poised to deliver a wide range of services, detailed below.
          </p>
        </div>
      </section>
      <section className="home_services" data-scroll-section>
        <div className="container">
          <h2 className="title">
            More Traffic, More Revenue <br />
            Let's Go Digital
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
                With our eCommerce agency's expert CRO insights and
                recommendations, we’ll help you supercharge your site and
                elevate your brand on Shopify Plus.{" "}
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Website Design</span>
              </h3>
              <p>
                With our eCommerce agency's expert CRO insights and
                recommendations, we’ll help you supercharge your site and
                elevate your brand on Shopify Plus.{" "}
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Website Development</span>
              </h3>
              <p>
                With our eCommerce agency's expert CRO insights and
                recommendations, we’ll help you supercharge your site and
                elevate your brand on Shopify Plus.{" "}
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Enterprise CMS Solutions</span>
              </h3>
              <p>
                With our eCommerce agency's expert CRO insights and
                recommendations, we’ll help you supercharge your site and
                elevate your brand on Shopify Plus.{" "}
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Website Redesign Services</span>
              </h3>
              <p>
                With our eCommerce agency's expert CRO insights and
                recommendations, we’ll help you supercharge your site and
                elevate your brand on Shopify Plus.{" "}
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Website Maintenance Services</span>
              </h3>
              <p>
                With our eCommerce agency's expert CRO insights and
                recommendations, we’ll help you supercharge your site and
                elevate your brand on Shopify Plus.{" "}
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Search Engine Optimization</span>
              </h3>
              <p>
                With our eCommerce agency's expert CRO insights and
                recommendations, we’ll help you supercharge your site and
                elevate your brand on Shopify Plus.{" "}
              </p>
            </div>
          </div>
          <div className="link-widget-wrap">
            <a
              className="btn_link btn_link--light"
              href="/our-services/"
              target="_blank"
              rel="noopener"
            >
            
                 More Services
                 <span><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z" fill="currentColor"></path></svg></span>
             
            </a>
            <a className="btn_link btn_link--light" href="/talk-to-specialist/">
              Talk To Specialist
              <span><svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z" fill="currentColor"></path></svg></span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
