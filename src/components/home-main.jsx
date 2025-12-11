"use client";
import Image from "next/image";
import Link from "next/link";
import ComparisonSection from "./section/ComparisonSection";
import ContactForm from "./ContactForm";
import ProjectCalculator from "./ProjectCalculator/ProjectCalculator";
import Showcase from "./section/Showcase";
import ValueProps from "./section/ValueProps";
import Services from "./section/Services";
import {
  Shield,
  Zap,
  Clock,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Users,
  Code,
  Bell,
  BarChart,
  Check,
  Star,
  Award,
} from "lucide-react";

import { X, TrendingUp } from "lucide-react"; // Importing Lucide Icons
import { useState } from "react";
import FeaturedProjects from "./section/FeaturedProjects";

export default function HomeMain() {
  const [isHovered, setIsHovered] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // Note: Replaced raw SVG paths with Lucide components for cleaner JSX and better maintainability.
  // Assuming these Lucide icons map to the original SVG intent:
  // X (for Limitation marker)
  // Check (for Advantage marker)
  // Limitation Icons: Code (for Templates/Customization), Zap (for Performance)
  // Advantage Icons: Award (for Experience), Shield (for Security), TrendingUp (for Strategic Growth)

  const aiLimitations = [
    {
      title: "Boilerplate Risk & Technical Debt",
      desc: "AI-generated or cheap code bases quickly become unmaintainable and insecure.",
      Icon: Code,
    },
    {
      title: "Performance Compromise",
      desc: "Bloated code and unnecessary dependencies kill load times, SEO, and user experience.",
      Icon: Zap,
    },
    {
      title: "Marketing & Design Blind Spots",
      desc: "Limited customization prevents the integration of strategic design or complex marketing funnels.",
      Icon: X, // Using X for generic "problem"
    },
  ];

  const strategicAdvantages = [
    {
      title: "Holistic Expertise (Dev, Design, Marketing)",
      desc: "10+ years of problem-solving expertise aligned with your business goals, not just code functions.",
      Icon: Award,
    },
    {
      title: "Minimizing Risk & Technical Debt",
      desc: "Clean, hand-crafted code ensures high security, optimal performance, and long-term scalability.",
      Icon: Shield,
    },
    {
      title: "Strategic Growth Foundation",
      desc: "Building a platform designed to evolve and scale with your business's future requirements.",
      Icon: TrendingUp,
    },
  ];

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
  const strategicValueProps = [
    {
      id: "holistic-expertise",
      title: "Holistic Expertise: Dev + Design + Marketing",
      description:
        "My 10+ years of cross-disciplinary experience means you hire a partner, not just a programmer, eliminating costly communication gaps and maximizing results.",
      benefits: [
        "**Unified Vision:** Flawless execution where design supports conversion, and code supports SEO.",
        "**Faster Velocity:** No delays waiting for handoffs between external design or marketing agencies.",
      ],
    },
    {
      id: "risk-mitigation",
      title: "Future-Proof Platforms & Risk Mitigation",
      description:
        "Unlike AI boilerplate or cheap outsourcing that leads to technical debt, I hand-craft a scalable foundation.",
      benefits: [
        "**Minimized Rebuild Risk:** Clean, documented code that grows with your business needs.",
        "Enterprise-level security and performance built from the ground up, not patched on later.",
      ],
    },
    {
      id: "strategic-partnership",
      title: "Strategic Partnership, Not Freelance Task-Taker",
      description:
        "I integrate into your team, advising on the right technical strategy to meet specific business objectives (lead generation, conversion, scaling).",
      benefits: [
        "Direct communication with a decision-making expert—no account managers or middlemen.",
        "Agile project scopes that adapt to evolving market demands and opportunities.",
      ],
    },
  ];

  return (
    <section className="pt-20">
      {/* <section className="threedot" data-scroll-section> */}
      {/* <HomeDot /> */}
      {/* </section> */}

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 sm:px-6 py-24">
        {/* 1. Background Effects */}

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Central Blue Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* 2. Content Container */}
        <div className="relative z-10 container mx-auto text-center max-w-4xl">
          {/* Animated Wrapper: Fades in and slides up */}
          <div className="animate-[fadeInUp_1s_ease-out_forwards] opacity-0">
            {/* H1 Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-8 leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0e96ee] via-[#4eebd5] via-[#fdd68d] to-[#fb8c61]">
                Code Built by an Expert,
              </span>
              <br className="hidden md:block" />
              <span className="text-white drop-shadow-lg">
                Not Generated by AI.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
              I am your full-stack digital partner. With{" "}
              <span className="text-white font-semibold">10+ years</span> in
              development, design, and marketing, I build strategic, scalable
              platforms that minimize risk and maximize long-term business ROI.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white !text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                Partner on Your Project
                {/* Animated Arrow Icon */}
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Optional: Add Keyframes for the animation inline if not in global CSS */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      <Showcase></Showcase>

      <ProjectCalculator></ProjectCalculator>

      <ComparisonSection 
        aiLimitations={aiLimitations} 
        strategicAdvantages={strategicAdvantages} 
      />

      <ValueProps strategicValueProps={strategicValueProps} />

      {/* Featured Projects Section */}
      <FeaturedProjects></FeaturedProjects>

      <Services services={services} />

      {/* Technologies Section */}
      <section
        className="hp-client-wrap client-wrap technologies-logos nitro-offscreen nitro-lazy-render pt-8"
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
    </section>
  );
}
