// Irvine SEO Page
import Footer from "../../../components/footer";
import HomeFollow from "../../../components/home-follow";

export default function IrvineSEO() {
  return (
    <>
      <HomeFollow />

      <section className="page" data-scroll-section>
        <div className="container">
          <h1 className="title">Irvine SEO Services</h1>
          <p className="subtitle">
            Maximize Your Online Visibility and Drive Success in Irvine
          </p>
        </div>
      </section>

      <section className="about_data" data-scroll-section>
        <div className="container">
          <h2 className="title">Why SEO Matters in Irvine</h2>
          <p>
            Irvine is a city known for its innovation, business-friendly environment, and growing economy. In such a competitive landscape, having a strong online presence is essential to capture your audience&apos;s attention. Search Engine Optimization (SEO) ensures your business ranks higher on search engines, making it easier for customers to find you. Whether you&apos;re a tech company, a local service provider, or an e-commerce business, SEO is key to staying ahead of the competition.
          </p>
          <p>
            At Casa Dev, I offer tailored SEO strategies designed for businesses in Irvine. From keyword research to on-page and technical SEO, I help you attract high-quality traffic and convert visitors into loyal customers.
          </p>
        </div>
      </section>

      <section className="seo-services" data-scroll-section>
        <div className="container">
          <h2 className="title">Our Irvine SEO Services</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>Keyword Research & Strategy</h3>
              <p>
                Discover the most effective keywords to reach your ideal audience in Irvine. I analyze search trends and competition to ensure your content ranks effectively.
              </p>
            </div>
            <div className="service-item">
              <h3>On-Page Optimization</h3>
              <p>
                Optimize your website’s content, meta tags, headers, and structure to align with the latest SEO standards and best practices.
              </p>
            </div>
            <div className="service-item">
              <h3>Technical SEO</h3>
              <p>
                Improve your website’s performance with faster load times, mobile optimization, and clean code. Technical SEO ensures search engines can index and rank your site seamlessly.
              </p>
            </div>
            <div className="service-item">
              <h3>Local SEO</h3>
              <p>
                Connect with Irvine customers using targeted local SEO strategies, including Google My Business optimization, local keywords, and citation building.
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
                Measure your progress with detailed reports and insights. I use advanced analytics tools to track your site’s performance and refine strategies as needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-me" data-scroll-section>
        <div className="container">
          <h2>Why Choose Casa Dev for Your Irvine SEO?</h2>
          <ul>
            <li>
              <strong>Proven Results:</strong> My data-driven SEO strategies have helped businesses achieve significant traffic growth and top search engine rankings.
            </li>
            <li>
              <strong>Customized Strategies:</strong> I tailor my approach to match your business’s unique goals and target audience.
            </li>
            <li>
              <strong>Clear Communication:</strong> Receive regular updates and comprehensive reports to keep you informed about your campaign’s progress.
            </li>
            <li>
              <strong>Local Expertise:</strong> With a deep understanding of Irvine’s market, I position your business to thrive in this community.
            </li>
          </ul>
        </div>
      </section>

      <section className="cta" data-scroll-section>
        <div className="container">
          <h3>Let’s Build Your Online Success</h3>
          <p>
            Take your website to new heights with personalized SEO services that deliver results. Contact me today for a free consultation and start growing your online presence in Irvine.
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
    canonical: "/about/irvine",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: "Irvine SEO Services | Casa Dev",
  description:
    "Boost your website's rankings and attract more customers with Casa Dev's expert Irvine SEO services. Contact us today for customized strategies that deliver measurable results!",
  keywords:
    "Irvine SEO, SEO services in Irvine, local SEO Irvine, SEO expert Irvine, digital marketing Irvine, Casa Dev SEO",
};
