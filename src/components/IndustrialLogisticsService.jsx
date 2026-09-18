'use client';

import Link from 'next/link';
import {
  Truck,
  Database,
  Building2,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Workflow,
  Search,
  FileSpreadsheet,
  Clock,
  Zap,
} from 'lucide-react';
import ContactForm from './ContactForm';

export default function IndustrialLogisticsService() {
  const painPoints = [
    {
      title: 'Manual CoStar & Permit Scraping',
      desc: 'Sales reps spending 15+ hours a week manually checking industrial leases and property filings to find warehouse tenants.',
    },
    {
      title: 'NetSuite & Legacy ERP Bottlenecks',
      desc: 'Complex ERPs locked away from customers, forcing endless phone calls and email back-and-forth for simple quotes.',
    },
    {
      title: 'Slow Rental & Equipment Quoting',
      desc: 'Losing high-value forklift and material handling equipment deals due to days-long manual quote preparation cycles.',
    },
  ];

  const solutions = [
    {
      icon: Search,
      title: 'CoStar & Commercial Real Estate Pipeline Automation',
      desc: 'Automated ingestion of newly leased industrial facilities, commercial permits, and tenant data directly into your NetSuite / CRM pipeline.',
    },
    {
      icon: Database,
      title: 'NetSuite / ERP 2-Way Synchronization',
      desc: 'Real-time sync of parts catalogs, serialized equipment availability, customer tier pricing, and maintenance history with zero manual data entry.',
    },
    {
      icon: Cpu,
      title: 'B2B Equipment Rental & RFQ Engine',
      desc: 'Customer self-service portals with interactive fleet selectors, dynamic delivery calculation, and instant binding quote generation.',
    },
    {
      icon: Layers,
      title: 'Multi-Branch & Warehouse Fleet Portals',
      desc: 'Unified visibility across all branch locations, service truck inventories, and technician dispatch systems.',
    },
  ];

  const features = [
    'Direct 2-way Oracle NetSuite REST/SuiteTalk API Integration',
    'Custom CoStar / CRE Lease alert webhook receivers',
    'Self-service customer rental, parts, and invoice portal',
    'Automated quote-to-order pipeline with custom approval workflows',
    'Mobile-optimized technician and warehouse floor scan tools',
    'Role-based access control (RBAC) and enterprise-grade security',
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* ------------------- 1. HERO SECTION ------------------- */}
      <section className="relative pt-36 pb-24 px-4 sm:px-6 overflow-hidden border-b border-neutral-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-600/10 blur-[130px] -z-10 rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-8">
            <Truck className="w-4 h-4" /> Material Handling, Logistics & Industrial Distribution
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8">
            High-Performance Web Platforms for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
              Warehousing & Logistics Leaders
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            We build custom ERP-integrated portals, equipment rental engines, and automated lead
            generation systems that turn market intelligence (like CoStar industrial data) into closed
            deals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact-section"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              Schedule an Industrial Tech Consult <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-8 py-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-semibold rounded-xl transition-all duration-200"
            >
              Calculate Project Scope
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------- 2. PAIN POINTS VS SOLUTIONS ------------------- */}
      <section className="py-24 px-4 sm:px-6 bg-[#0f0f10] border-b border-neutral-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">
              The Growth Bottleneck
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight">
              Why Generic Websites Fail Industrial Equipment & Logistics Companies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#141416] border border-red-500/10 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                  <ShieldAlert className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- 3. CORE ARCHITECTURE & CAPABILITIES ------------------- */}
      <section className="py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">
              Tailored Architecture
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight">
              Enterprise Systems Built Specifically for Material Handling
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {solutions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#121316] border border-neutral-800 hover:border-blue-500/40 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center mb-6 transition-colors">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checklist */}
          <div className="bg-gradient-to-br from-[#121316] to-[#181a1f] border border-neutral-800 rounded-3xl p-8 sm:p-12">
            <h3 className="text-2xl font-bold text-white mb-8">What You Get With Every Deployment:</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-neutral-300 text-sm font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------- 4. COSTAR LEAD ACCELERATOR EXPLAINER ------------------- */}
      <section className="py-24 px-4 sm:px-6 bg-[#0c0d10] border-y border-neutral-900">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-r from-blue-900/20 via-neutral-900 to-emerald-900/20 border border-blue-500/30 rounded-3xl p-8 sm:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6">
              <Zap className="w-3.5 h-3.5" /> CoStar Intelligence Automation
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Turn Commercial Real Estate Leases into Forklift & Racking Deals
            </h2>
            <p className="text-neutral-300 text-base leading-relaxed mb-6">
              When a company leases a new 100,000 sq ft distribution facility, they need equipment
              within 30 to 60 days. We engineer custom middleware that pulls new commercial lease
              filings, matches decision-maker profiles, and triggers personalized outreach before your
              competitors even know the space is occupied.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-neutral-800">
              <div>
                <p className="text-3xl font-extrabold text-blue-400">10x</p>
                <p className="text-xs text-neutral-400 mt-1">Faster lead response to facility expansions</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-emerald-400">0 hrs</p>
                <p className="text-xs text-neutral-400 mt-1">Manual data entry into your ERP / CRM</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-cyan-400">100%</p>
                <p className="text-xs text-neutral-400 mt-1">Custom code ownership with zero lock-in</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------- 5. CONTACT FORM SECTION ------------------- */}
      <section id="contact-section" className="py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Let&apos;s Build Your Industrial Platform
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
              Speak directly with a senior engineer specialized in NetSuite integrations and logistics
              platforms. No agency layers or account managers.
            </p>
          </div>

          <div className="bg-[#121316] border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
