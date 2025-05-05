"use client";
import Image from "next/image";
import Link from "next/link";
import HomeDot from "./homepage-threedot";
import ContactForm from "./ContactForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ProjectCalculator from "./ProjectCalculator/ProjectCalculator";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function HomeMain() {
  const skills = [
    {
      id: "development-expertise",
      title: "Custom Solutions Without Agency Overhead",
      description:
        "Working directly with a skilled solo developer means personalized attention and faster results:",
      benefits: [
        "Direct communication with the person building your solution - no account managers or miscommunication",
        "Flexible timelines and project scopes that adapt to your evolving business needs",
      ],
    },
    {
      id: "responsive-design",
      title: "From Concept to Launch - All In One Place",
      description:
        "As your single point of contact for design and development, I streamline the entire process:",
      benefits: [
        "Unified vision across both design and technical implementation",
        "Faster turnaround times without multiple team handoffs",
        "Cost-effective approach that maximizes your investment",
      ],
    },
    {
      id: "marketing",
      title: "Results-Driven Digital Strategy",
      description:
        "Your digital presence should work as hard as you do to grow your business:",
      benefits: [
        "SEO-optimized websites that help local customers find your business",
        "Lead generation systems that convert visitors into paying customers",
        "Analytics implementation to measure ROI and continuously improve",
      ],
    },
    {
      id: "value-proposition",
      title: "Why Small Businesses & Startups Choose Me",
      benefits: [
        "Enterprise-quality solutions at prices accessible to growing businesses",
        "Ongoing support and maintenance to protect your digital investment",
        "Technical partnership that scales with your business growth",
      ],
    },
  ];

  // Client types specifically targeted
  const clientTypes = [
    {
      title: "For Small Businesses",
      description:
        "Affordable custom websites and apps that generate real leads and sales without the enterprise price tag.",
      icon: "/images/small-business-icon.svg",
    },
    {
      title: "For Startups",
      description:
        "Quick-to-market MVPs and iterative development that helps you validate ideas, attract investors, and grow.",
      icon: "/images/startup-icon.svg",
    },
    {
      title: "For Professional Services",
      description:
        "Polished digital presence for consultants, lawyers, realtors and healthcare providers that converts prospects to clients.",
      icon: "/images/professional-icon.svg",
    },
  ];

  // Platform data for technology sections
  const platforms = {
    firstRow: [
      { name: "Laravel", icon: "/images/laravel.svg" },
      { name: "Wordpress", icon: "/images/icon-wordpress.svg" },
      { name: "Shopify", icon: "/images/icon-shopify.svg" },
      { name: "iPhone", icon: "/images/ios.svg" },
      { name: "Microsoft .NET", icon: "/images/microsoft-net.svg" },
      { name: "Magento", icon: "/images/client-magento.svg" },
    ],
    secondRow: [
      { name: "NextJs", icon: "/images/nextjs.svg" },
      { name: "VueJS", icon: "/images/vue-js.svg" },
      { name: "React JS", icon: "/images/icon-react.svg" },
      { name: "Apple iOS", icon: "/images/icon-apple.svg" },
      { name: "Android", icon: "/images/icon-android.svg" },
    ],
  };

  // Services data
  const services = [
    {
      title: "Small Business Websites",
      description:
        "Cost-effective websites designed specifically for small businesses that need to establish credibility, generate leads, and convert customers. Includes mobile optimization, local SEO, and simple content management systems that you can update yourself.",
    },
    {
      title: "Startup MVP Development",
      description:
        "Rapidly develop your Minimum Viable Product to validate your idea and secure funding. I'll help turn your concept into a functional product quickly, using agile methods that allow us to pivot based on user feedback and market response.",
    },
    {
      title: "E-commerce Solutions",
      description:
        "Custom online stores that help you sell products and services with flexible payment options, inventory management, and seamless checkout experiences. Whether you're launching your first online store or optimizing an existing one, I'll build a solution that drives sales.",
    },
    {
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android that extend your business reach. From customer loyalty apps to operational tools, I develop mobile solutions that provide real value to your business and customers.",
    },
    {
      title: "Maintenance & Support",
      description:
        "Ongoing technical partnership to keep your digital assets secure, up-to-date, and performing at their best. My maintenance services include regular updates, security monitoring, performance optimization, and responsive support when issues arise.",
    },
    {
      title: "Local SEO & Digital Marketing",
      description:
        "Targeted optimization to help nearby customers find your business online. I implement proven SEO strategies specific to local businesses, including Google Business optimization, local keyword targeting, and review management to improve your visibility in local search results.",
    },
  ];

  // Featured projects data
  const featuredProjects = [
    {
      id: "featured_0",
      site: "localcafe.com",
      title: "Online Ordering System for Local Café",
      image: "/images/god.jpg",
      bgColor: "#dde5ef",
    },
    {
      id: "featured_2",
      site: "startupname.com",
      title: "Funding-Winning MVP for Health Tech Startup",
      image: "/images/bulletproof.jpg",
      bgColor: "#dde5ef",
    },
  ];

  return (
    <section className="Home_main__OVLM4">
      <section className="threedot" data-scroll-section>
        <HomeDot />
      </section>

      {/* Hero Section */}
      <section className="Home_welcome__aWiKA" data-scroll-section>
        <div className="Home_container__97eC3">
          <div data-scroll="" className="svg-mask cfadeinup-hero">
            <h1
              className="welcome_h3 gradient-title5"
              data-scroll
              data-scroll-speed="0"
            >
              Web & App Development for Growing Businesses
            </h1>
            <span className="welcome_h3_role" data-scroll data-scroll-speed="0">
              I&rsquo;m a solo developer who delivers agency-quality websites
              and apps at prices small businesses and startups can afford
            </span>
            <div
              className="welcome_h3_role_btn"
              data-scroll
              data-scroll-speed="0"
            >
              <a href="/contact" className="btn btn-primary">
                Connect With Me
              </a>
            </div>
          </div>
          <div className="Home_btn_content__PvvjD"></div>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-10 sm:mb-12">
  <h2 className="gradient-title5">
    Why Your Business Needs Professional Web Development
  </h2>
  <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
    AI and site builders offer speed, but not the performance, flexibility, or polish your business deserves.
  </p>
</div>


          {/* Section 1 */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start md:items-center mb-12 md:mb-16">
            <div>
              <h3 className="!text-lg md:text-2xl font-bold text-white mb-4 sm:mb-6">
                The Limitations of AI and Site Builders
              </h3>

              <div className="space-y-6">
                {/* Point Item */}
                {[
                  {
                    title: "Template Constraints",
                    desc: "AI and site builders lock you into rigid templates that limit your brand's unique expression and ability to evolve with your business.",
                    iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                  },
                  {
                    title: "Performance Issues",
                    desc: "Automatically generated code often results in bloated websites with slower load times and poor performance metrics that hurt SEO and user experience.",
                    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
                  },
                  {
                    title: "Limited Customization",
                    desc: "Complex business requirements and custom features are often impossible to implement without direct code access and expertise.",
                    iconPath:
                      "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
                  },
                ].map(({ title, desc, iconPath }, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 p-2 bg-red-900 rounded-full shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={iconPath}
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg text-gray-200">
                        {title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-400">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat Box */}
            <div className="relative min-h-[200px] md:h-auto w-full">
              <div className="relative md:absolute bg-gray-900 rounded-lg shadow-lg border border-gray-700 p-6 flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-red-400 mb-2">
                    71%
                  </div>
                  <p className="text-sm sm:text-base text-gray-300">
                    of businesses report limitations with auto-generated
                    websites that impact their growth
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start md:items-center">
            {/* Benefits List */}
            <div className="order-2 md:order-1 relative min-h-[200px] md:h-auto w-full">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg opacity-30" />
              <div className=" md:absolute bg-gray-900 rounded-lg shadow-lg border border-gray-700 p-6">
                <ul className="space-y-4 py-2 text-sm sm:text-base">
                  {[
                    "Custom-built functionality tailored to your business needs",
                    "Optimized performance with clean, efficient code",
                    "Scalable architecture that grows with your business",
                    "SEO-friendly structure built for conversion",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="p-1 bg-blue-900 rounded-full shrink-0">
                        <svg
                          className="w-4 h-4 text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits Explanation */}
            <div className="order-1 md:order-2">
              <h3 className="!text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                The Professional Development Advantage
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Experience & Expertise",
                    desc: "Professional developers bring years of problem-solving experience and technical knowledge to create solutions that perfectly align with your business objectives.",
                    iconPath:
                      "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                  },
                  {
                    title: "Security & Reliability",
                    desc: "Custom development follows best practices for security, performance, and accessibility that automated tools simply cannot match.",
                    iconPath:
                      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  },
                  {
                    title: "Strategic Growth",
                    desc: "Professional developers build with scalability in mind, creating foundations that can evolve as your business grows and technology changes.",
                    iconPath:
                      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                  },
                ].map(({ title, desc, iconPath }, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 p-2 bg-blue-900 rounded-full shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={iconPath}
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg text-gray-200">
                        {title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-400">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 sm:mt-16 text-center">
            <a
              href="/contact"
              className="btn_link btn_link--light inline-block px-6 py-3"
            >
              Discuss Your Project
            </a>
            <p className="mt-4 text-gray-400 text-sm sm:text-base">
              Let&apos;s create a website that truly represents your business
              potential
            </p>
          </div>
        </div>
      </section>

      <ProjectCalculator></ProjectCalculator>

      {/* Skills Section */}
      <section
        id="skills-expertise"
        className="home_skillset"
        data-scroll-section
      >
        <div className="container">
          <h1 className="section-title">Why Work With a Me?</h1>

          {skills.map((skill) => (
            <article
              key={skill.id}
              id={skill.id}
              data-scroll=""
              className="hover-reveal-effect canvas-reveal cfadeinup is-inview skill-item"
              itemScope
              itemType="https://schema.org/Service"
            >
              <div className="row hover-row">
                <div className="col-xl-5 col-lg-6 desc-title">
                  <h2 className="h2" itemProp="name">
                    {skill.title}
                  </h2>
                </div>
                <div className="col-xl-5 col-lg-6 desc-text">
                  {skill.description && (
                    <p itemProp="description">{skill.description}</p>
                  )}
                  <ul>
                    {skill.benefits.map((benefit, index) => (
                      <li key={index} itemProp="offers">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <meta
                itemProp="provider"
                content="Web Development and Digital Marketing Professional"
              />
              <meta itemProp="areaServed" content="Los Angeles, California" />
            </article>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
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
              <div className="info_col" id="featured_2">
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

      <section className="home_services" data-scroll-section>
        <div className="container">
          <h2 className="title">Solutions for Growing Businesses</h2>
          <div className="services">
            <div className="item">
              <h3 className="title">
                <span>Small Business Websites</span>
              </h3>
              <p>
                Affordable, mobile-optimized sites that establish credibility,
                generate leads, and convert customers. Includes local SEO and
                easy-to-update content management.
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Startup MVP Development</span>
              </h3>
              <p>
                Rapidly develop your concept into a functional product to
                validate ideas and secure funding, with agile methods that adapt
                to market feedback.
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>E-commerce & Apps</span>
              </h3>
              <p>
                Custom online stores and mobile apps that extend your reach with
                seamless user experiences, flexible payment options, and
                intuitive interfaces.
              </p>
            </div>
            <div className="item">
              <h3 className="title">
                <span>Maintenance & Local SEO</span>
              </h3>
              <p>
                Ongoing technical support, security updates, and targeted
                optimization to keep your digital assets performing at their
                best and visible to local customers.
              </p>
            </div>
          </div>
          <div className="link-widget-wrap">
            <Link className="btn_link btn_link--light" href="/services/">
              View Details
              <span>
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </Link>
            <Link className="btn_link btn_link--light" href="/contact/">
              Get Quote
              <span>
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
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

      {/* Technologies Section */}
      <section
        className="hp-client-wrap client-wrap technologies-logos nitro-offscreen nitro-lazy-render"
        data-scroll-section=""
      >
        <div className="client-title">
          <div className="container">
            <h2
              data-scroll=""
              className="cfadeinup-inner-hero h1 gradient-title9"
            >
              Enterprise-grade technology at small business prices.
            </h2>
          </div>
        </div>

        {/* First Row of Technology Icons */}
        <div className="client-section client-label">
          <div className="client-slider">
            <div
              className="d-flex client-slide"
              data-scroll=""
              data-scroll-direction="horizontal"
              data-scroll-speed="3"
            >
              {platforms.firstRow.map((platform, index) => (
                <div
                  key={index}
                  className="client-block d-flex justify-content-center align-items-center flex-column"
                >
                  <span className="img-wrapper">
                    <Image
                      loading="lazy"
                      height="80"
                      width="62"
                      style={{ width: "62px", height: "80px" }}
                      aria-hidden="true"
                      alt=""
                      className="lazyloaded"
                      decoding="async"
                      src={platform.icon}
                    />
                  </span>
                  <span className="d-block">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row of Technology Icons */}
        <div className="client-section dark-bg client-label">
          <div className="client-slider">
            <div
              className="d-flex client-slide"
              data-scroll=""
              data-scroll-direction="horizontal"
              data-scroll-speed="-3"
            >
              {platforms.secondRow.map((platform, index) => (
                <div
                  key={index}
                  className="client-block d-flex justify-content-center align-items-center flex-column"
                >
                  <span className="img-wrapper">
                    <Image
                      height="80"
                      width="62"
                      style={{ width: "62px", height: "80px" }}
                      aria-hidden="true"
                      alt=""
                      className="lazyloaded"
                      decoding="async"
                      src={platform.icon}
                    />
                  </span>
                  <span className="d-block">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="client-title client-content-btm">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-6 client-wrap-heading">
                <p>
                  I select the right technology for your specific business needs
                  and budget - not the most expensive option.
                </p>
                <Link href="/contact/" className="btn-link btn-link-white">
                  Let&rsquo;s discuss your technology options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="project-output" data-scroll-section>
        <div className="container-header">
          <h2 className="title">Professional Standards</h2>
          <p>Delivering enterprise-quality work for growing businesses.</p>
        </div>
        <div className="container">
          <div className="item">
            <Link
              lang="en"
              target="_blank"
              className="home w3c"
              href="https://www.w3.org/"
            >
              <span className="text">Web Accessibility Compliance</span>
            </Link>
          </div>
          <div className="item">
            <Link href="https://pagespeed.web.dev/" target="_blank">
              <span className="text">Fast-Loading Websites</span>
            </Link>
          </div>
          <div className="item">
            <Link href="https://www.google.com/" target="_blank">
              <span className="text">Local SEO Specialist</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="home_about" data-scroll-section>
        <div className="container">
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="containerre">
              <h2 className="gradient-title5">
                Ready to Discuss Your Project?
              </h2>
              <p>
                As a solo developer, I work with a limited number of clients to
                ensure each project gets the attention it deserves. I&rsquo;m
                currently accepting new projects starting next month.
              </p>
              <p>
                Let&rsquo;s schedule a free 30-minute consultation to discuss
                your business goals and how a custom web or mobile solution can
                help you achieve them.
              </p>
              <ContactForm />
            </div>
          </ThemeProvider>
        </div>
        <div data-scroll data-scroll-speed="2">
          <Image
            loading="lazy"
            alt="Solo Developer working on custom solutions for small businesses"
            width="294"
            height="308"
            className="img-fluid lazyloaded"
            decoding="async"
            src="/images/PXL_20231015_163749011.MP.webp"
          />
        </div>
      </section>
    </section>
  );
}
