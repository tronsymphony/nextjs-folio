import Image from "next/image";
import styles from "../app/pricing/pricing.module.scss";

const plans = [
  {
    title: "Startup Plan",
    subtitle: "Good for Basic Start-ups",
    price: "$150",
    features: [
      { feature: "Functional Website & Design", available: true },
      { feature: "1-4 Pages", available: true },
      { feature: "Design Customization", available: true },
      { feature: "Responsive Design", available: true },
      { feature: "Custom Design Or Feature", available: false },
      { feature: "Content Upload", available: false },
      { feature: "E-Commerce", available: false },
      { feature: "Live Chat", available: false },
      { feature: "SEO", available: false },
    ],
  },
  {
    title: "Professional Plan",
    subtitle: "Good for Professionals",
    price: "$250",
    features: [
      { feature: "Functional Website", available: true },
      { feature: "1-10 Pages", available: true },
      { feature: "Design Customization", available: true },
      { feature: "Custom Design & Features", available: true },
      { feature: "Content Upload", available: true },
      { feature: "E-commerce + Payment Setup", available: true },
      { feature: "10 Revisions", available: true },
      { feature: "Live Chat (Only On Request)", available: true },
      { feature: "Basic SEO", available: true },
    ],
  },
  {
    title: "Premium Plan",
    subtitle: "Good for Luxury Seekers",
    price: "$399",
    features: [
      { feature: "Functional Website & Design", available: true },
      { feature: "10-15 Pages", available: true },
      { feature: "Design Customization", available: true },
      { feature: "Custom Design & Features", available: true },
      { feature: "5 Revisions", available: true },
      { feature: "E-commerce + Business Growth", available: true },
      { feature: "20 Revisions", available: true },
      { feature: "Live Chat Automation", available: true },
      { feature: "SEO + FREE Strategy", available: true },
    ],
  },
  {
    title: "Custom",
    subtitle: "Good for Large Businesses",
    price: "Custom Pricing",
    features: [
      { feature: "Functional Website & Design", available: true },
      { feature: "# Pages", available: true },
      { feature: "Design Customization", available: true },
      { feature: "Responsive Design", available: true },
      { feature: "Custom Design Or Feature", available: true },
      { feature: "Content Upload", available: true },
      { feature: "E-Commerce + Strategy", available: true },
      { feature: "Live Chat & More", available: true },
      { feature: "Many More", available: true },
    ],
  },
];

export default function Pricing() {
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className={styles.container}>
          <h1 className={styles.title}>Pricing</h1>
          <span className={styles.subtitle}>
            Pricing for your next-level digital products
          </span>
        </div>
      </section>

      <div className={styles.nstWidgetOhioHeading} data-scroll-section>
        <div className="nst-widget-container">
          <div className="ohio-widget heading -center">
            <div className="subtitle">Suitable For Every Individual/Business</div>
            <h3 className={styles.title}>Pricing Plans</h3>
          </div>
        </div>
      </div>

      <section data-scroll-section className={styles.nstSection}>
        <div className={styles.nstContainer}>
          {plans.map((plan, index) => (
            <div className={styles.nstColumn} key={index}>
              <div className="nst-widget-container">
                <div className="ohio-widget pricing-table">
                  <div className={styles.pricingTableHeadline}>
                    <h5 className={styles.title}>{plan.title}</h5>
                    <p className={styles.subtitle}>{plan.subtitle}</p>
                  </div>
                  <div className={styles.pricingTablePrice}>
                    <span className="price-number">{plan.price}</span>
                  </div>
                  <div className={styles.pricingTableFeatures}>
                    <ul className={styles["-unlist -large"]}>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className={feature.available ? "exist" : "missing"}>
                          <i className={styles.icon}>
                            <Image
                              width={20}
                              height={20}
                              src={feature.available ? "/images/check.svg" : "/images/close.svg"}
                              alt={feature.available ? "check" : "close"}
                              role="presentation"
                            />
                          </i>
                          <span className={styles.title}>{feature.feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
