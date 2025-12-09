import React from 'react';
import Link from 'next/link';
import { MonitorSmartphone, Rocket, ShoppingCart, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Services() {
  
  const services = [
    {
      title: "High-Converting Digital Platforms",
      desc: "Custom, mobile-optimized sites built with a conversion-first design to generate qualified leads. Includes advanced local SEO and intuitive CMS.",
      icon: MonitorSmartphone,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      title: "Funding-Ready MVP Strategy",
      desc: "Rapidly develop a scalable Minimum Viable Product (MVP). I ensure the technical foundation minimizes debt and is ready for investment and growth.",
      icon: Rocket,
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      title: "E-commerce & App Ecosystems",
      desc: "Bespoke online stores and native/cross-platform apps. Built to handle complex integrations, flexible payments, and seamless user experiences.",
      icon: ShoppingCart,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Growth Retainers & Security",
      desc: "Ongoing strategic partnership for technical support, security audits, and continuous optimization. Protect your digital investment.",
      icon: ShieldCheck,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10"
    }
  ];

  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden" data-scroll-section>
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Strategic Digital Solutions <br />
            <span className="text-neutral-500">Driven by Expertise</span>
          </h2>
          <p className="text-lg text-neutral-400">
            I don&apos;t just &apos;build websites.&apos; I engineer digital assets designed to solve business problems and maximize ROI.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-3xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-lg">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Area */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          
          {/* Primary CTA: Consultation */}
          <Link 
            href="/contact/" 
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white !text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Start Strategic Consultation
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary CTA: View Details */}
          <Link 
            href="/services/" 
            className="group inline-flex items-center gap-2 px-8 py-4 !text-neutral-400 font-medium hover:text-white transition-colors"
          >
            View Full Service Details
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>

        </div>

      </div>
    </section>
  );
}