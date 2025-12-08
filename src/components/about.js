import Link from "next/link";
// Removing import styles from "../app/about/about.module.scss";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react"; // Assuming you have Lucide icons available

export default function About() {
  // === Tailwind Approximations ===
  const styles = {
    // Replicating styles.page: Full width, padding, relative positioning
    page: "w-full py-24 md:py-32 bg-gray-900 text-white relative",
    // Replicating styles.container: Centered, limited width, default padding
    container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
    // Replicating styles.title: Large, bold heading
    title: "text-5xl md:text-6xl font-extrabold mb-4",
    // Replicating styles.subtitle: Sub-heading text, slightly smaller
    subtitle: "text-xl md:text-2xl text-gray-400 block mb-8",
  };

  // Replicating custom global classes for consistency
  const global = {
    // Replicating .title for general section H2s
    sectionTitle: "text-3xl md:text-4xl font-bold mb-8 text-white",
    // Replicating the h2/h3 styles within content
    contentHeading: "text-2xl font-bold text-white mt-8 mb-4",
    // Replicating the home_skillset structure for hover effects
    skillItem: "border-t border-gray-700 py-8 transition duration-300 hover:bg-gray-800/50",
    skillTitle: "text-3xl font-extrabold text-blue-400",
    // Styling the CTA links for visibility
    ctaLink: "text-blue-400 font-semibold hover:text-blue-300 transition duration-150",
  };
  
  // Note: The 'about_data' and 'home_skillset' sections will get Tailwind classes directly.

  return (
    <>
    
      {/* 1. Hero Section: Convert SCSS module to Tailwind classes */}
      <section className={styles.page} data-scroll-section>
        <div className={styles.container}>
          <h1 className={styles.title}>About Me: Your Technical Strategist</h1>
          <span className={styles.subtitle}>
            10+ Years of Expertise in Development, Design, and Marketing.
          </span>
        </div>
      </section>

      {/* 2. Main Content: Convert Custom Classes to Tailwind */}
      <section className="about_data py-16 bg-gray-900 text-gray-300" data-scroll-section>
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className={global.sectionTitle}>
            The Full-Stack Partner for Comprehensive Digital Solutions
          </h2>
          <p className="mb-6 leading-relaxed">
            Hi, I’m Nitya Hoyos. I am a Los Angeles-based **Full-Stack Digital Partner** with over **10 years of experience** spanning high-level development, strategic design, and performance-driven marketing. For established businesses and funded startups, I provide the essential **all-in-one solution** needed to build, launch, and grow complex digital platforms without the risk of hiring multiple siloed vendors.
          </p>

          <h3 className={global.contentHeading}>Why Experienced Companies Choose an All-in-One Expert</h3>
          <p className="mb-4 leading-relaxed">
            Experienced businesses understand the cost of fragmentation: project delays, miscommunication between agencies, and technical compromises that lead to expensive rebuilds. **I eliminate that risk.** My expertise covers:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-8">
            <li>**Development:** Building scalable, clean platforms (ReactJS, NextJS, Laravel) that eliminate technical debt and the need for future rebuilds.</li>
            <li>**Design:** Crafting conversion-focused UI/UX that drives business results and user trust.</li>
            <li>**Marketing:** Integrating SEO, analytics, and lead generation from the code level up.</li>
          </ul>

          <h3 className={global.contentHeading}>My Professional Toolkit (10+ YOE)</h3>
          <p className="mb-8 leading-relaxed">
            My specialized knowledge in **Shopify Plus, Laravel, WordPress, ReactJS, and NextJS** allows me to architect the precise solution your business needs—whether it's a high-volume e-commerce platform or a bespoke enterprise application. My work is defined by precision, strategic thinking, and a commitment to continuous learning.
          </p>
          
          <hr className="my-10 border-gray-700" /> 

          {/* === CYCLING / PERSONAL SECTION: Using Tailwind Grid for Two Columns === */}
          <div className="cycling-section-wrapper grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className={global.contentHeading}>The Drive: How Cycling Fuels My Strategic Work</h2>
              <p className="mb-6 leading-relaxed">
                While my work is deeply strategic, my passion for **cycling** mirrors the discipline I bring to every project. The challenging routes of Los Angeles require persistence and precise problem-solving—the same approach I take to debugging complex architectures and developing innovative solutions for your business.
              </p>
            </div>
            
            <div className="cycling-grid space-y-4">
              <iframe
                height="454"
                width="100%" // Making the iframe responsive within the grid column
                frameBorder="0"
                allowTransparency="true"
                scrolling="no"
                src="https://www.strava.com/athletes/15797336/latest-rides/594248b42a8f75c469c571310aedb6ddf1691468"
                className="rounded-lg shadow-xl"
              ></iframe>

              <div
                className="strava-embed-placeholder bg-gray-800 p-4 rounded-lg"
                data-embed-type="activity"
                data-embed-id="13067637439"
                data-style="standard"
                data-from-embed="false"
              ></div>

              {/* Script for Strava Embed */}
              <Script
                src="https://strava-embeds.com/embed.js"
                strategy="afterInteractive"
              />
            </div>
          </div>
          
          <hr className="my-10 border-gray-700" /> 

          <h2 className={global.sectionTitle}>Ready to Eliminate Vendor Fragmentation?</h2>
          <p className="mb-4 leading-relaxed">
            Stop managing multiple teams and paying for fragmented results. If you are an experienced business ready to build a high-performing, **future-proof digital platform** with a single point of expert accountability, let's connect.
          </p>
          <p>
            Explore my <Link href="/portfolio" className={global.ctaLink}>portfolio</Link> to see my work, or <Link href="/contact" className={global.ctaLink}>get in touch</Link> today to discuss your comprehensive project strategy.
          </p>
        </div>
      </section>

      {/* 4. Skills Section: Convert Custom Classes to Tailwind */}
      <section className="home_skillset py-16 bg-gray-900" data-scroll-section>
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-12">The Strategic Outcomes I Deliver</h3>

          {/* Skill Item 1 */}
          <div
            data-scroll=""
            className={global.skillItem}
            data-src="/images/design.jpg"
          >
            <div className="row hover-row md:grid md:grid-cols-2 gap-8 items-center">
              <div className="col-xl-5 col-lg-6 desc-title mb-4 md:mb-0">
                <h3 className={global.skillTitle}>Conversion Design</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                <span className="text-lg text-gray-300">
                  I craft user-friendly, visually striking digital experiences with a **marketing-first focus** to ensure optimal lead capture and conversion rates.
                </span>
              </div>
            </div>
          </div>

          {/* Skill Item 2 */}
          <div
            data-scroll=""
            className={global.skillItem}
            data-src="/images/development.jpg"
          >
            <div className="row hover-row md:grid md:grid-cols-2 gap-8 items-center">
              <div className="col-xl-5 col-lg-6 desc-title mb-4 md:mb-0">
                <h3 className={global.skillTitle}>Risk-Free Development</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                <span className="text-lg text-gray-300">
                  I build highly scalable, clean codebases using NextJS/ReactJS and Laravel, guaranteeing **zero technical debt** and long-term stability for your investment.
                </span>
              </div>
            </div>
          </div>

          {/* Skill Item 3 */}
          <div
            data-scroll=""
            className={global.skillItem}
            data-src="/images/full-package.jpg"
          >
            <div className="row hover-row md:grid md:grid-cols-2 gap-8 items-center">
              <div className="col-xl-5 col-lg-6 desc-title mb-4 md:mb-0">
                <h3 className={global.skillTitle}>Strategic Oversight (ROI)</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                <span className="text-lg text-gray-300">
                  I offer **end-to-end strategic oversight**, combining development and design expertise to deliver impactful projects that maximize your return on investment (ROI).
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}