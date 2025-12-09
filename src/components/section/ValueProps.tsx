import React from 'react';
import { Check, ArrowUpRight } from 'lucide-react';

export default function ValueProps() {
  // Mock Data (Replace with your actual import)
  const strategicValueProps = [
    {
      id: "risk-reduction",
      title: "Risk Reduction",
      description: "We don't just write code; we anticipate failure points. By auditing security, scalability, and compliance before a single line is written, we prevent costly pivots down the road.",
      benefits: ["Security-first architecture", "Compliance auditing", "Zero-downtime deployment strategies"]
    },
    {
      id: "holistic-strategy",
      title: "Holistic Strategy",
      description: "Silos kill projects. By integrating Development, Design, and Marketing into a single workflow, we ensure your platform isn't just functional—it's market-ready.",
      benefits: ["Unified design & dev workflow", "SEO-optimized codebase", "Conversion-focused UI/UX"]
    },
    {
      id: "long-term-roi",
      title: "Long-Term ROI",
      description: "Cheap code is expensive debt. We build scalable platforms designed to grow with your business for years, effectively amortizing your investment over a longer lifespan.",
      benefits: ["Modular component systems", "Future-proof tech stack", "Lower long-term maintenance costs"]
    }
  ];

  return (
    <section id="strategic-value-props" className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-20 max-w-4xl">
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Why Strategic Clients Choose <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Expert Partnership
            </span>
          </h2>
          <p className="text-xl text-neutral-400">
            We move beyond &apos;task completion&apos; to provide the strategic foresight required for high-stakes digital platforms.
          </p>
        </div>

        {/* The "Ledger" List */}
        <div className="border-t border-neutral-800">
          {strategicValueProps.map((skill, index) => (
            <article
              key={skill.id}
              id={skill.id}
              className="group relative border-b border-neutral-800 transition-colors duration-500 hover:border-neutral-600"
              itemScope
              itemType="https://schema.org/Service"
            >
              {/* Hover Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-900/5 to-blue-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="grid md:grid-cols-12 gap-8 py-12 md:py-16 items-start relative z-10">
                
                {/* 1. Title Column */}
                <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-neutral-600 group-hover:text-blue-400 transition-colors">
                      0{index + 1}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-300 group-hover:text-white transition-colors" itemProp="name">
                      {skill.title}
                    </h2>
                  </div>
                  {/* Decorative Arrow on Desktop */}
                  <div className="hidden md:block mt-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowUpRight className="text-blue-400" size={32} />
                  </div>
                </div>

                {/* 2. Description & Benefits Column */}
                <div className="md:col-span-7 lg:col-span-6 md:pl-8 border-l border-neutral-800/0 md:border-neutral-800/50 md:group-hover:border-neutral-700 transition-colors">
                  
                  {skill.description && (
                    <p className="text-lg text-neutral-400 mb-8 leading-relaxed group-hover:text-neutral-300 transition-colors" itemProp="description">
                      {skill.description}
                    </p>
                  )}

                  <ul className="grid sm:grid-cols-2 gap-4">
                    {skill.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        itemProp="offers"
                        className="flex items-start group/item"
                      >
                        <div className="mt-1 mr-3 shrink-0 rounded-full bg-emerald-500/10 p-1 group-hover/item:bg-emerald-500/20 transition-colors">
                           <Check className="w-3 h-3 text-emerald-400" />
                        </div>
                        <span className="text-neutral-400 text-sm font-medium group-hover/item:text-white transition-colors">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Schema Metadata */}
              <meta itemProp="provider" content="Full-Stack Digital Strategy, Development, and Marketing Expert" />
              <meta itemProp="areaServed" content="Global Remote and Los Angeles, California" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}