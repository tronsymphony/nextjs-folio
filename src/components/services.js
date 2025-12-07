import Link from "next/link";
import styles from "../app/about/about.module.scss";

export default function Services() {
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className={styles.container}>
          <h1 className={styles.title}>Services</h1>
          <span className={styles.subtitle}>
            Crafting Next-Level Digital Experiences
          </span>
          <p>
            Collaboration is at the heart of everything I do. Together, we can 
            create exceptional digital solutions tailored to your business needs. 
            From innovative apps to visually stunning websites, I offer a diverse 
            range of services to ensure your project&apos;s success.
          </p>
        </div>
      </section>

      <section className="home_services" data-scroll-section>
        <div className="container">
          <h2 className="title">
            Boost Traffic, Drive Revenue <br /> Let&apos;s Go Digital
          </h2>
          <div className="services">
            {[
              {
                title: "WCAG Compliance",
                description:
                  "From creative designs to ADA compliance audits, I specialize in accessible, user-friendly digital experiences that meet ADA standards.",
              },
              {
                title: "Speed Optimization",
                description:
                  "Optimize your site for speed and performance. I ensure faster load times, better SEO rankings, and an enhanced user experience.",
              },
              {
                title: "Website Design",
                description:
                  "Combining creativity and technical expertise, I craft visually appealing, user-focused websites that engage and convert.",
              },
              {
                title: "Website Development",
                description:
                  "Building responsive, scalable, and secure platforms tailored to your business needs. From static pages to complex web apps, I deliver results.",
              },
              {
                title: "Enterprise CMS Solutions",
                description:
                  "Streamline content management with advanced CMS solutions. Perfect for large organizations needing efficiency and compliance.",
              },
              {
                title: "Website Redesign",
                description:
                  "Revamp your site with a fresh, modern design. Improve navigation, aesthetics, and functionality to stay competitive.",
              },
              {
                title: "Website Maintenance",
                description:
                  "Ensure your site is secure, updated, and performing at its best. I offer reliable maintenance services for peace of mind.",
              },
              {
                title: "Search Engine Optimization",
                description:
                  "Boost visibility and rankings with expert SEO strategies. I optimize your site&apos;s content, structure, and off-page elements to drive organic traffic.",
              },
            ].map((service, index) => (
              <div className="item" key={index}>
                <h3 className="title">
                  <span>{service.title}</span>
                </h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
          <div className="link-widget-wrap">
            <Link
              className="btn_link btn_link--light"
              href="/contact/"
              target="_blank"
              rel="noopener"
            >
              More Services
              <span>
                <svg
                  width="8"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </Link>
            <Link className="btn_link btn_link--light" href="/contact/">
              Talk to Me
              <span>
                <svg
                  width="8"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
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

      <section className="home_skillset" data-scroll-section>
        <div className="container">
          <h4>
            What Makes Me the Best Developer for Your Next Project?
          </h4>
          {[
            {
              title: "Longevity",
              description:
                "I&apos;ve proudly served the Los Angeles community for nearly a decade, delivering exceptional web development with a personal touch.",
            },
            {
              title: "Web Dev & Design Focus",
              description:
                "Known for expert development and creative design, I focus on creating websites that stand out from the competition.",
            },
            {
              title: "Breathtaking Design",
              description:
                "My design approach combines flexibility, responsiveness, and adherence to industry standards for truly stunning results.",
            },
            {
              title: "On-Brand Experiences",
              description:
                "Your brand is unique, and so is my approach. I deliver design elements that reflect your identity while driving results.",
            },
            {
              title: "One-of-a-Kind Solutions",
              description:
                "I create custom, comprehensive solutions tailored to your specific needs, ensuring standout results for every project.",
            },
            {
              title: "Partnership & Collaboration",
              description:
                "From start to finish, I prioritize clear communication and deliver ongoing support for your continued success online.",
            },
          ].map((skill, index) => (
            <div
              className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
              key={index}
            >
              <div className="row hover-row">
                <div className="col-xl-5 col-lg-6 desc-title">
                  <h3 className="h2">{skill.title}</h3>
                </div>
                <div className="col-xl-5 col-lg-6 desc-text">
                  <span>{skill.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
