"use client";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "./ContactForm";
import ProjectCalculator from "./ProjectCalculator/ProjectCalculator";

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
      {/* <section className="threedot" data-scroll-section> */}
      {/* <HomeDot /> */}
      {/* </section> */}

      {/* Hero Section */}
      <section className="Home_welcome__aWiKA" data-scroll-section>
        <div className="Home_container__97eC3">
          {/* Retain the scroll and mask classes */}
          <div data-scroll="" className="svg-mask cfadeinup-hero !max-w-2xl">
            {/* H1: Expert Focus (Retains original style and gradient) */}
            <h1 className="!text-4xl uppercase font-black leading-[1.2] mb-5 break-words text-transparent bg-clip-text bg-gradient-to-r from-[#0e96ee] via-[#4eebd5] via-[#fdd68d] to-[#fb8c61] tracking-[-0.025em]">
              Code Built by an Expert, Not Generated by AI.
            </h1>

            {/* *** IMPROVED SUBTITLE *** Highlights 10+ years of expertise across Development, Design, and Marketing
             */}
            <span className="welcome_h3_role" data-scroll data-scroll-speed="0">
              I am your full-stack digital partner. With 10+ years in
              development, design, and marketing, I build strategic, scalable
              platforms that minimize risk and maximize long-term business ROI.
            </span>

            {/* CTA: Strategic Partnering */}
            <div
              className="welcome_h3_role_btn"
              data-scroll
              data-scroll-speed="0"
            >
              <Link href="/contact" className="btn btn-primary">
                Partner on Your Strategic Project
                {/* Optional Icon */}
                {/* <ArrowUpRight className="ml-2 w-5 h-5" /> */}
              </Link>
            </div>
          </div>
          <div className="Home_btn_content__PvvjD"></div>
        </div>
      </section>

      <section className=" text-white py-16 px-6 md:px-12 overflow-hidden relative">
        {/* Content container */}
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="!text-center mb-10 relative">
            <div className="inline-block px-3 py-1 bg-blue-600 text-xs font-bold rounded-full mb-4 text-white">
              STRATEGIC PARTNERSHIP SHOWCASE
            </div>
            <h2 className="!text-3xl md:text-5xl font-bold mb-4 gradient-title5">
              From Complex Problem to Scalable Digital Platform
            </h2>
            <p className="!text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              The{" "}
              <span className="!text-blue-400 font-semibold">
                Safe Streets Map
              </span>{" "}
              is an example of how **holistic expertise (Dev, Design,
              Marketing)** solves complex challenges to deliver measurable,
              real-world results.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="inline-flex items-center px-3 py-1 bg-gray-800 rounded-full">
                <Award className="!text-purple-400 mr-2" size={16} />
                <span className="!text-gray-200 text-sm font-medium">
                  10+ Years of Expertise
                </span>
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-gray-800 rounded-full">
                <Star className="!text-yellow-400 mr-2" size={16} />
                <span className="!text-gray-200 text-sm font-medium">
                  Minimized Long-Term Risk
                </span>
              </div>
            </div>

            <a
              href="https://safestreetsmap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary "
            >
              See Strategic Results In Action
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          {/* Project showcase (No structural change needed here) */}
          <div className="grid gap-6 items-start">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
              <img
                src="./images/map.webp"
                alt="Screenshot of Safe Streets Map application"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 z-20">
                <span className="px-4 py-2 bg-blue-600 text-sm font-bold rounded-lg shadow-lg">
                  STRATEGIC FULL-STACK BUILD
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-gray-900">
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-blue-900 bg-opacity-70 text-xs font-medium rounded-full">
                    React
                  </span>
                  <span className="px-3 py-1 bg-green-900 bg-opacity-70 text-xs font-medium rounded-full">
                    Node.js
                  </span>
                  <span className="px-3 py-1 bg-yellow-900 bg-opacity-70 text-xs font-medium rounded-full">
                    MongoDB
                  </span>
                  <span className="px-3 py-1 bg-purple-900 bg-opacity-70 text-xs font-medium rounded-full">
                    Mapbox API
                  </span>
                  <span className="px-3 py-1 bg-red-900 bg-opacity-70 text-xs font-medium rounded-full">
                    Tailwind CSS
                  </span>
                </div>
              </div>
            </div>

            {/* Condensed value proposition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left side: Focus on Strategy and Design */}
              <div className="p-6 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
                <h3 className="!text-2xl font-bold text-white mb-4 flex items-center">
                  <Code className="mr-3 text-blue-400" size={24} />
                  Holistic Project Strategy & Execution
                </h3>
                <p className="!text-gray-300 mb-4">
                  Leveraging 10+ years of combined **Dev, Design, and
                  Marketing** experience to eliminate team silos and ensure a
                  unified vision.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mt-1 mr-3 p-1 rounded-full bg-green-500 bg-opacity-20">
                      <Check className="!text-green-400" size={16} />
                    </div>
                    <div>
                      <span className="font-semibold text-white">
                        Integrated Design & UX
                      </span>
                      <p className="!text-gray-300 text-sm">
                        Design choices made with a marketing/conversion focus.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-3 p-1 rounded-full bg-green-500 bg-opacity-20">
                      <Check className="!text-green-400" size={16} />
                    </div>
                    <div>
                      <span className="font-semibold text-white">
                        Scalable, Clean Codebase
                      </span>
                      <p className="!text-gray-300 text-sm">
                        Hand-crafted structure, future-proofed against
                        limitations.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Right side */}
              <div className="space-y-6">
                <div className="p-5 rounded-lg bg-gray-800 border-l-4 border-blue-500">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-500 bg-opacity-20 rounded-lg mr-4">
                      <MapPin className="!text-blue-100" size={24} />
                    </div>
                    <div>
                      <h3 className="!text-lg font-semibold text-white mb-2">
                        Client Success: Results Over Features
                      </h3>
                      <p className="!text-gray-300 text-base">
                        &apos;The Safe Streets Map completely transformed how
                        our community advocates for safety improvements and data
                        collection.&apos;
                      </p>
                      <p className="!text-blue-400 text-sm mt-2 font-medium">
                        — Community Safety Coalition
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-gray-800">
                  <h3 className="!text-lg font-semibold text-white mb-2">
                    Strategic Project Highlights
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-700 rounded-lg">
                      <div className="text-sm font-medium text-blue-400">
                        <MapPin className="inline mr-1 mb-1" size={14} />
                        Data-Driven Mapping
                      </div>
                      <div className="text-xs text-gray-300">
                        Real-time hazard reporting
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-700 rounded-lg">
                      <div className="text-sm font-medium text-green-400">
                        <Users className="inline mr-1 mb-1" size={14} />
                        Community Engagement
                      </div>
                      <div className="text-xs text-gray-300">
                        Built-in viral mechanics
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-700 rounded-lg">
                      <div className="text-sm font-medium text-yellow-400">
                        <Bell className="inline mr-1 mb-1" size={14} />
                        Custom Alert System
                      </div>
                      <div className="text-xs text-gray-300">
                        Marketing/Lead capture ready
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-700 rounded-lg">
                      <div className="text-sm font-medium text-purple-400">
                        <BarChart className="inline mr-1 mb-1" size={14} />
                        Actionable Analytics
                      </div>
                      <div className="text-xs text-gray-300">
                        Safety trend insights
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA section: Focus on Consultation/Strategy */}
            <div className="p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-lg border border-blue-700 shadow-lg mt-6">
              <div className="md:flex items-center justify-between">
                <div className="md:mr-8 mb-6 md:mb-0">
                  <h3 className="!text-2xl font-bold text-white mb-3">
                    Ready for a Partner Who Minimizes Risk?
                  </h3>
                  <p className="!text-gray-200">
                    Book a consultation to start your next strategic,
                    future-proof project.
                  </p>
                </div>
                <div className="!text-center md:text-right">
                  <a href="/contact" className="btn btn-primary">
                    Book Strategy Session
                  </a>
                  <p className="!text-sm text-gray-300 mt-2">
                    Dedicated expertise starts here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectCalculator></ProjectCalculator>

      <section className="py-16 bg-gray-900 text-white px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header: Focus on Strategic Imperative */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-title5">
              The Choice: Boilerplate Code vs. Strategic Platform
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-3">
              Your website is a business asset. Don't risk your future on AI
              shortcuts or cheap code that forces a costly rebuild in 12 months.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Left Column - Limitations (Risk) */}
            <div className="p-6 rounded-lg border border-gray-700 bg-gray-800">
              <h3 className="!text-xl font-bold text-white mb-4 flex items-center">
                <span className="p-1 bg-red-900 rounded-full mr-3">
                  <X className="w-5 h-5 text-red-400" />
                </span>
                The True Cost of Shortcuts (Risk)
              </h3>

              <div className="space-y-4">
                {aiLimitations.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="mt-1 p-1 bg-red-900 rounded-full shrink-0">
                      <item.Icon className="h-4 w-4 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-gray-200">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">71%</div>
                  <p className="text-xs text-gray-300">
                    of businesses report limitations with auto-generated
                    websites that require expensive redesigns.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Advantages (Value) */}
            <div className="p-6 rounded-lg border border-gray-700 bg-gray-800">
              <h3 className="!text-xl font-bold text-white mb-4 flex items-center">
                <span className="p-1 bg-blue-900 rounded-full mr-3">
                  <Check className="w-5 h-5 text-blue-400" />
                </span>
                The Strategic Advantage (ROI)
              </h3>

              <div className="space-y-4">
                {strategicAdvantages.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="mt-1 p-1 bg-blue-900 rounded-full shrink-0">
                      <item.Icon className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-gray-200">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 mt-6">
                <ul className="space-y-2 text-sm">
                  {[
                    "Holistic solution focusing on Dev, Design, and Marketing.",
                    "Code written for performance, maintainability, and security.",
                    "Scalable architecture that supports long-term business growth.",
                    "Conversion-optimized structure built to maximize ROI.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <div className="p-1 bg-blue-900 rounded-full shrink-0">
                        <Check className="w-3 h-3 text-blue-400" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA - Focus on Strategy Session */}
          <div className="text-center pt-8">
            <Link
              href="/contact"
              className="btn_link btn_link--light inline-block px-8 py-3 text-lg font-semibold border-2 border-blue-500 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Schedule Your Strategy Session
            </Link>
            <p className="mt-3 text-gray-400 text-sm">
              Invest in a platform built for success, not a shortcut built to
              fail.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <div className="container !pt-8">
        {/* Updated Headline: Focus on why you are superior */}
        <h2 className="gradient-title5 text-center text-4xl font-bold mb-12">
          Why Strategic Clients Choose Expert Partnership
        </h2>
      </div>

      <section
        id="strategic-value-props"
        className="home_skillset"
        data-scroll-section
      >
        <div className="container">
          {/* Mapping over the strategicValueProps data */}
          {strategicValueProps.map((skill) => (
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
                  <ul className="space-y-2 mt-4">
                    {skill.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        itemProp="offers"
                        className="flex items-start"
                      >
                        {/* Optional: Add a checkmark icon to the list items for visual emphasis */}
                        <Check className="w-5 h-5 text-green-400 mr-3 shrink-0 mt-1" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Retain Schema Markup for SEO/Context */}
              <meta
                itemProp="provider"
                content="Full-Stack Digital Strategy, Development, and Marketing Expert"
              />
              <meta
                itemProp="areaServed"
                content="Global Remote and Los Angeles, California"
              />
            </article>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <header className="container">
        <h2 className="gradient-title5">Featured Projects</h2>
      </header>
      <section className="home_work" data-scroll-section>
        <div className="container"></div>
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
          <h2 className="title">
            {/* Updated Title: Focus on Strategic Outcomes */}
            Strategic Digital Solutions Driven by Expertise
          </h2>
          <div className="services">
            {/* Item 1: Focus on High-Value Business Foundation */}
            <div className="item">
              <h3 className="title">
                <span>High-Converting Digital Platforms</span>
              </h3>
              <p>
                Custom, mobile-optimized sites built with a **conversion-first
                design** to generate qualified leads and sales. Includes
                advanced local SEO and intuitive content management systems.
              </p>
            </div>

            {/* Item 2: Focus on Risk Mitigation and Strategy */}
            <div className="item">
              <h3 className="title">
                <span>Funding-Ready MVP & Product Strategy</span>
              </h3>
              <p>
                Rapidly develop a **scalable Minimum Viable Product** (MVP)
                using agile methods. I ensure the technical foundation minimizes
                debt and is ready for investment and growth.
              </p>
            </div>

            {/* Item 3: Focus on Complex Solutions */}
            <div className="item">
              <h3 className="title">
                <span>Custom E-commerce & Mobile App Ecosystems</span>
              </h3>
              <p>
                Bespoke online stores and native/cross-platform apps. Solutions
                are built to handle complex integrations, flexible payment
                options, and seamless user experiences across all devices.
              </p>
            </div>

            {/* Item 4: Focus on Long-Term Partnership */}
            <div className="item">
              <h3 className="title">
                <span>Performance Retainers & Growth Optimization</span>
              </h3>
              <p>
                Ongoing strategic partnership for **technical support, security
                audits, and continuous optimization**. Protect your digital
                investment and ensure high visibility with targeted Local SEO
                and performance tuning.
              </p>
            </div>
          </div>
          <div className="link-widget-wrap">
            {/* CTA 1: View Strategy/Details */}
            <Link className="btn_link btn_link--light" href="/services/">
              View Full Service & Strategy Details
              <span>
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.293 1.707 1.707.293 7.414 6l-5.707 5.707-1.414-1.414L4.585 6z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </Link>
            {/* CTA 2: Get Quote/Start Strategic Conversation */}
            <Link className="btn_link btn_link--light" href="/contact/">
              Start Strategic Consultation
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
    </section>
  );
}
