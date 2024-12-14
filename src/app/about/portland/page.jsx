// Portland SEO Page
import Footer from "../../../components/footer";
import HomeFollow from "../../../components/home-follow";

export default function PortlandSEO() {
  return (
    <>
      <HomeFollow />

      <section className="page" data-scroll-section>
        <div className="container">
          <h1 className="title">Portland SEO Services</h1>
          <p className="subtitle">
            Drive Traffic, Boost Visibility, and Maximize Your Online Success in Portland
          </p>
        </div>
      </section>

      <section className="about_data" data-scroll-section>
        <div className="container">
          <h2 className="title">Why SEO Matters in Portland</h2>
          <p>
            Portland is a city that thrives on creativity, innovation, and local business support. To stand out in this dynamic market, having a strong online presence is essential. Search Engine Optimization (SEO) helps your website rank higher on search engines, connecting you with your target audience. Whether you run a cozy coffee shop, a tech startup, or a growing enterprise, SEO is the key to success.
          </p>
          <p>
            At Casa Dev, I offer tailored SEO solutions for Portland businesses. From keyword research to technical optimizations, I ensure your website attracts the right visitors and converts them into loyal customers.
          </p>
        </div>
      </section>

      <section className="seo-services" data-scroll-section>
        <div className="container">
          <h2 className="title">Our Portland SEO Services</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>Keyword Research & Strategy</h3>
              <p>
                Discover the most effective keywords to target your ideal audience. I analyze search trends and competition to ensure your content ranks where it matters.
              </p>
            </div>
            <div className="service-item">
              <h3>On-Page Optimization</h3>
              <p>
                Enhance your website’s content, meta tags, headers, and structure to align with the latest SEO best practices.
              </p>
            </div>
            <div className="service-item">
              <h3>Technical SEO</h3>
              <p>
                Boost your website’s performance with faster loading times, mobile optimization, and clean code. Technical SEO ensures search engines can easily index and rank your site.
              </p>
            </div>
            <div className="service-item">
              <h3>Local SEO</h3>
              <p>
                Reach Portland customers with local SEO strategies, including Google My Business optimization, local keywords, and citation building.
              </p>
            </div>
            <div className="service-item">
              <h3>Content Marketing</h3>
              <p>
                Engage your audience with compelling, SEO-friendly content that builds trust, educates, and converts visitors into loyal customers.
              </p>
            </div>
            <div className="service-item">
              <h3>Analytics & Reporting</h3>
              <p>
                Track your progress with detailed reports and insights. I use advanced analytics tools to measure your site’s performance and refine strategies as needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-me" data-scroll-section>
        <div className="container">
          <h2>Why Choose Casa Dev for Your Portland SEO?</h2>
          <ul>
            <li>
              <strong>Proven Results:</strong> My strategies have helped businesses across industries achieve top rankings and significant traffic growth.
            </li>
            <li>
              <strong>Customized Solutions:</strong> Every business is unique, and I tailor my SEO approach to meet your specific goals.
            </li>
            <li>
              <strong>Transparent Communication:</strong> You’ll receive regular updates and detailed reports to keep you informed every step of the way.
            </li>
            <li>
              <strong>Local Expertise:</strong> As someone who understands Portland’s market, I position your business for success in this thriving community.
            </li>
          </ul>
        </div>
      </section>

      <section className="cta" data-scroll-section>
        <div className="container">
          <h3>Ready to Elevate Your Online Presence?</h3>
          <p>
            Let’s work together to boost your website’s visibility and achieve meaningful results. Contact me today for a free consultation!
          </p>
          <a href="/contact" className="btn-primary">
            Get Started
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export const metadata = {
  metadataBase: new URL("https://casa-dev.com"),
  alternates: {
    canonical: "/portland",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: "Portland SEO Services | Casa Dev",
  description:
    "Achieve higher rankings and drive more traffic with Casa Dev's expert Portland SEO services. Contact us for tailored strategies that deliver real results!",
  keywords:
    "Portland SEO, SEO services in Portland, local SEO Portland, SEO expert Portland, digital marketing Portland, Casa Dev SEO",
};
