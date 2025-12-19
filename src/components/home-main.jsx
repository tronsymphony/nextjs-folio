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
  // Platform data for technology sections
  const platforms = {
    firstRow: [
      { name: "NetSuite", icon: "/images/netsuite.svg" },
      { name: "Angular", icon: "/images/angular.svg" },
      { name: "React JS", icon: "/images/icon-react.svg" },
      { name: "Wordpress", icon: "/images/icon-wordpress.svg" },
      { name: "PostHog", icon: "/images/posthog.svg" },
      { name: "Mixpanel", icon: "/images/mixpanel.svg" },
    ],
    secondRow: [
      { name: "NextJs", icon: "/images/nextjs.svg" },
      { name: "VueJS", icon: "/images/vue-js.svg" },
      { name: "Shopify", icon: "/images/icon-shopify.svg" },
      { name: "Google Analytics", icon: "/images/ga4.svg" },
      { name: "Laravel", icon: "/images/laravel.svg" },
    ],
  };

  // Services data
  const services = [
    {
      title: "Enterprise ERP & NetSuite Solutions",
      description:
        "Specialized development for NetSuite and ERP integrations. I automate workflows, build custom SuiteCommerce experiences, and optimize your operational data flow to maximize efficiency and ROI.",
    },
    {
      title: "Advanced Analytics & UX Strategy",
      description:
        "Stop guessing. I implement deep tracking with PostHog, Mixpanel, and GA4 to visualize user behavior. I use this data to refine UI/UX designs, reduce churn, and increase conversion rates scientifically.",
    },
    {
      title: "Small Business & Startup Development",
      description:
        "From high-converting WordPress sites to scalable React/Next.js web apps. I build cost-effective, custom solutions that establish credibility and generate leads without the enterprise price tag.",
    },
    {
      title: "Custom React & Angular Apps",
      description:
        "Building complex, interactive single-page applications (SPAs) that feel like native software. Whether migrating legacy code or starting fresh, I ensure clean, maintainable architecture.",
    },
    {
      title: "E-commerce & Shopify Growth",
      description:
        "Custom online stores optimized for sales. I handle everything from theme customization to complex inventory integrations, ensuring a seamless checkout experience for your customers.",
    },
    {
      title: "Maintenance & Technical Partnership",
      description:
        "Ongoing support to keep your digital investment secure. I provide regular updates, security monitoring, and strategic advice as your business technology needs evolve.",
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
    {
      id: "vibe-coder-rescue",
      title: "Vibe Coder Rescue: Finishing the Final 20%",
      description:
        "Stuck on the last 20% of your AI-assisted build? I help founders and 'vibe coders' turn prototypes into secure, scalable, production-ready platforms.",
      benefits: [
        "**Production Hardening:** Implementation of secure auth, complex logic, and custom integrations.",
        "**Scalable Architecture:** Refactoring AI boilerplate into a foundation that lasts years, not months.",
      ],
    },
  ];

  return (
    <section className="pt-20">
      {/* <section className="threedot" data-scroll-section> */}
      {/* <HomeDot /> */}
      {/* </section> */}

      {/* Hero Section - Split Screen Redesign */}
      <section className="relative w-full min-h-[92vh] flex items-center bg-[#050505] overflow-hidden px-4 sm:px-6 py-12 lg:py-0">
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_70%,transparent_100%)]"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Typography */}
            <div className="flex flex-col text-left">
              <div className="inline-flex items-center gap-2 mb-6 animate-[fadeInUp_0.8s_ease-out_forwards]">
                 <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                 <span className="text-emerald-400 font-mono text-sm uppercase tracking-[0.2em] font-bold">
                    Full-Stack Digital Partner
                 </span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] opacity-0">
                DESIGN. <br/>
                DEVELOP. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  GROW.
                </span>
              </h1>

              <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-xl mb-10 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] opacity-0">
                Scale your business without the agency overhead. I integrate premium <span className="text-white font-bold">UI/UX Design</span>, 
                <span className="text-blue-400"> Enterprise Development</span>, and <span className="text-purple-400">Marketing Strategy</span> into one cohesive solution for growth.
              </p>

              <div className="flex flex-wrap gap-4 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] opacity-0">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white !text-black font-bold text-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  Start Your Project <ArrowRight className="w-5 h-5"/>
                </Link>
                <Link
                  href=""
                  className="px-8 py-4 border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-colors"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            {/* Right Column: 3D Visual */}
            <div className="relative hidden lg:block perspective-[2000px] animate-[fadeInLeft_1s_ease-out_0.6s_forwards] opacity-0">
               {/* The tilted card container */}
               <div className="relative w-full aspect-[4/3] bg-[#0F0F0F] rounded-xl border border-white/10 shadow-2xl transform transition-transform duration-700 hover:rotate-y-[-5deg] hover:rotate-x-[5deg] [transform:rotateY(-12deg)_rotateX(6deg)_rotateZ(-2deg)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                  
                  {/* Window Controls */}
                  <div className="h-10 border-b border-white/5 bg-[#141414] flex items-center px-4 gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                     <div className="ml-4 px-3 py-1 bg-black/50 rounded-md text-[10px] font-mono text-gray-500">
                        BusinessLogic.ts
                     </div>
                  </div>

                  {/* Code Content */}
                  <div className="p-6 font-mono text-sm leading-relaxed text-gray-400">
                     <div className="flex gap-4">
                        <div className="text-gray-700 select-none text-right">
                           {Array.from({length: 12}).map((_, i) => <div key={i}>{i+1}</div>)}
                        </div>
                        <div className="w-full">
                           <div className="text-purple-400">const <span className="text-yellow-400">YourGrowth</span> = <span className="text-blue-400">{'{'}</span></div>
                           <div className="pl-4">
                              <span className="text-sky-400">strategy</span>: <span className="text-green-400">&rsquo;Data-Driven UX&rsquo;</span>,
                           </div>
                           <div className="pl-4">
                              <span className="text-sky-400">design</span>: <span className="text-green-400">&rsquo;Modern & Conversional&rsquo;</span>,
                           </div>
                           <div className="pl-4">
                              <span className="text-sky-400">techStack</span>: [<span className="text-green-400">&rsquo;Next.js&rsquo;</span>, <span className="text-green-400">&rsquo;NetSuite&rsquo;</span>, <span className="text-green-400">&rsquo;Wordpress&rsquo;</span>, <span className="text-green-400">&rsquo;Angular&rsquo;</span>],
                           </div>
                           <div className="pl-4">
                              <span className="text-sky-400">marketing</span>: <span className="text-green-400">&rsquo;SEO & Analytics&rsquo;</span>,
                           </div>
                           <div className="pl-4 py-2">
                              <span className="text-gray-500">\/\/ Result:</span>
                           </div>
                           <div className="pl-4">
                              <span className="text-purple-400">return</span> <span className="text-yellow-400">MaximumROI</span><span className="text-blue-400">()</span>;
                           </div>
                           <div><span className="text-blue-400">{'}'}</span>;</div>
                        </div>
                     </div>
                  </div>
                  
                  {/* Glow effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent pointer-events-none"></div>
               </div>

               {/* Back Decoration Card */}
               <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl blur-xl transform [transform:rotateY(-12deg)_rotateX(6deg)_translateZ(-50px)] opacity-50"></div>
            </div>

          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(40px); }
            to { opacity: 1; transform: translateX(0); }
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
                  <span className="img-wrapper flex items-center justify-center bg-white/5 rounded-xl p-4">
                    <Zap className="w-12 h-12 text-blue-400" />
                  </span>
                  <span className="d-block mt-2">{platform.name}</span>
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
                  <span className="img-wrapper flex items-center justify-center bg-white/5 rounded-xl p-4">
                    <Code className="w-12 h-12 text-purple-400" />
                  </span>
                  <span className="d-block mt-2">{platform.name}</span>
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

      {/* Latest Blog Posts Section */}
      <section className="py-24 bg-[#050505] px-4 sm:px-6 border-t border-white/5" data-scroll-section>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
                Latest <span className="text-blue-500">Insights.</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Stay updated with the latest trends in AI integration and strategic web development.
              </p>
            </div>
            <Link 
              href="/blog" 
              className="group flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors uppercase tracking-widest text-sm"
            >
              View All Posts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300">
               <div className="p-8">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-full mb-6 inline-block">
                     AI Strategy
                  </span>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                     <Link href="/blog/how-ai-can-transform-your-small-business">
                        Maximizing ROI: How AI Can Transform Your Small Business in 2025
                     </Link>
                  </h3>
                  <p className="text-gray-400 mb-8 line-clamp-2 text-sm">
                     Learn how artificial intelligence can streamline operations, enhance customer service, and drive growth for small businesses.
                  </p>
                  <Link 
                    href="/blog/how-ai-can-transform-your-small-business"
                    className="inline-flex items-center gap-2 text-white font-bold group/link text-sm"
                  >
                    Read Article <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>

            <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300">
               <div className="p-8">
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest rounded-full mb-6 inline-block">
                     Web Development
                  </span>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                     <Link href="/blog/integrating-ai-to-supercharge-your-website">
                        The Future of Web Development: Integrating AI to Supercharge Your Website
                     </Link>
                  </h3>
                  <p className="text-gray-400 mb-8 line-clamp-2 text-sm">
                     Explore how AI-driven features like intelligent search and personalized recommendations can elevate your website.
                  </p>
                  <Link 
                    href="/blog/integrating-ai-to-supercharge-your-website"
                    className="inline-flex items-center gap-2 text-white font-bold group/link text-sm"
                  >
                    Read Article <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>

            <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300">
               <div className="p-8">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-full mb-6 inline-block">
                     Rescue
                  </span>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                     <Link href="/blog/from-vibe-coding-to-production-ready">
                        From &apos;Vibe Coding&apos; to Production-Ready: Finishing Your Project
                     </Link>
                  </h3>
                  <p className="text-gray-400 mb-8 line-clamp-2 text-sm">
                     Built a great prototype with AI but stuck on the last 20%? Here is how to turn those vibes into a production-ready application.
                  </p>
                  <Link 
                    href="/blog/from-vibe-coding-to-production-ready"
                    className="inline-flex items-center gap-2 text-white font-bold group/link text-sm"
                  >
                    Read Article <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
