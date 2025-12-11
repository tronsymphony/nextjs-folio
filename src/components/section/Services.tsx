import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceItem {
  title: string;
  desc: string; // Note: home-main uses 'description' but previous Services used 'desc'. Will need to map or standardize.
  // Actually, home-main uses 'description'. I should standardize to 'description' or map it.
  // Let's use 'description' to match home-main, but Services used 'desc'.
  // I will use 'description' in the interface and fallback if needed, but since I'm rewriting the component I can choose 'description'.
  // However, `services` array in `home-main.jsx` uses `description`.
  // Wait, `services` in `home-main.jsx` (lines 163-194) uses `title` and `description`.
  // The old `Services.tsx` expected `desc`, `icon`, `color`, `bg`.
  // The new data in `home-main.jsx` DOES NOT have `icon`, `color`, `bg`.
  // This is a discrepancy. I need to handle the missing icons/colors.
  // I will import a default set of icons or map them based on title if possible, or just use a generic icon if none provided?
  // Let's look at `home-main.jsx` again.
  // It has `platforms` (icons) but `services` (text only).
  // I should probably map the new services to icons or accept that they might be missing.
  // For now, I will import some default icons and cycle through them or map by index if no icon is provided.
}

// In home-main.jsx, services array items have: title, description.
// In Services.tsx, it used: title, desc, icon, color, bg.

import { MonitorSmartphone, Rocket, ShoppingCart, ShieldCheck } from 'lucide-react';

const ICONS = [MonitorSmartphone, Rocket, ShoppingCart, ShieldCheck, MonitorSmartphone, Rocket]; // Fallback loop
const COLORS = ["text-blue-400", "text-purple-400", "text-emerald-400", "text-yellow-400", "text-blue-400", "text-purple-400"];
const BGS = ["bg-blue-500/10", "bg-purple-500/10", "bg-emerald-500/10", "bg-yellow-500/10", "bg-blue-500/10", "bg-purple-500/10"];

interface ServicesProps {
  services: any[]; // relaxed type to accept the incoming data
}

export default function Services({ services }: ServicesProps) {
  
  const displayServices = (services || []).map((service, index) => ({
    ...service,
    // Map missing visual props from index if not present
    icon: service.icon || ICONS[index % ICONS.length],
    color: service.color || COLORS[index % COLORS.length],
    bg: service.bg || BGS[index % BGS.length],
    desc: service.description || service.desc // Handle both keys
  }));

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
          {displayServices.map((service, index) => {
             const Icon = service.icon;
             return (
            <div 
              key={index}
              className="group relative p-8 rounded-3xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${service.color}`} />
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
          )})}
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