import React from 'react';
import Link from 'next/link';
import { X, Check, AlertTriangle, TrendingUp, ShieldAlert, Zap, Layers, Lock } from 'lucide-react';

export default function ComparisonSection() {
  // Data for the component (You can move this outside or to a prop)
  const aiLimitations = [
    { title: "Generic & Unoriginal", desc: "Cookie-cutter designs that fail to differentiate your brand.", Icon: Layers },
    { title: "Security Vulnerabilities", desc: "Generated code often misses critical security patches.", Icon: Lock },
    { title: "Zero Strategic Insight", desc: "AI cannot understand your specific business goals or audience.", Icon: AlertTriangle },
  ];

  const strategicAdvantages = [
    { title: "Tailored Brand Strategy", desc: "Every pixel is designed to convert your specific audience.", Icon: Layers },
    { title: "Enterprise-Grade Security", desc: "Hand-written, audited code that protects your users.", Icon: Lock },
    { title: "Long-Term Scalability", desc: "Built to grow with your business, not require a rebuild.", Icon: TrendingUp },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 bg-[#0a0a0a] overflow-hidden">
      
      {/* Background Texture (Consistent with Hero) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            The Choice: <span className="text-neutral-500 line-through decoration-red-500/50">Boilerplate</span> vs. <span className="text-blue-400">Strategic Platform</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Your website is a business asset. Don&apos;t risk your future on AI shortcuts that force a costly rebuild in 12 months.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
          
          {/* CENTER VS BADGE (Hidden on Mobile) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-[#0a0a0a] border border-neutral-800 rounded-full items-center justify-center shadow-2xl">
            <span className="font-black text-neutral-500 italic text-xl">VS</span>
          </div>

          {/* LEFT COLUMN: The Risk (Instability) */}
          <div className="group relative p-8 rounded-3xl border-2 border-dashed border-neutral-800 bg-neutral-900/30 hover:border-red-900/50 transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">The Cost of Shortcuts</h3>
                <p className="text-red-400 text-sm font-medium">High Risk • Low ROI</p>
              </div>
            </div>

            {/* List */}
            <div className="space-y-6">
              {aiLimitations.map((item, i) => (
                <div key={i} className="flex gap-4 items-start opacity-70 group-hover:opacity-100 transition-opacity">
                  <X className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-neutral-200">{item.title}</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stat Box */}
            <div className="mt-8 pt-8 border-t border-neutral-800/50">
               <div className="flex items-center gap-4">
                 <div className="text-4xl font-black text-neutral-700">71%</div>
                 <p className="text-xs text-neutral-500 leading-tight">
                   of businesses report limitations with auto-generated sites requiring expensive redesigns.
                 </p>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Strategic Advantage (Stability) */}
          <div className="relative p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-900/10 to-transparent shadow-[0_0_50px_rgba(59,130,246,0.05)]">
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-full h-full bg-blue-500/5 rounded-3xl blur-xl -z-10"></div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">The Strategic Advantage</h3>
                <p className="text-blue-400 text-sm font-medium">Minimized Risk • Max ROI</p>
              </div>
            </div>

            {/* List */}
            <div className="space-y-6">
              {strategicAdvantages.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 p-0.5 bg-blue-500 rounded-full shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

             {/* Summary Box */}
             <div className="mt-8 pt-8 border-t border-blue-500/20">
               <ul className="space-y-3">
                 {[
                   "Code written for performance & security.",
                   "Scalable architecture for future growth.",
                   "Conversion-optimized structure.",
                 ].map((text, idx) => (
                   <li key={idx} className="flex items-center gap-2 text-sm text-neutral-300">
                     <Check className="w-4 h-4 text-blue-500" />
                     {text}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white !text-black font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Schedule Strategy Session
            <TrendingUp className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
          <p className="mt-4 text-neutral-500 text-sm">
            Invest in a platform built for success, not a shortcut built to fail.
          </p>
        </div>

      </div>
    </section>
  );
}