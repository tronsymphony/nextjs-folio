import React from 'react';
import { Check, ArrowUpRight } from 'lucide-react';

interface ValuePropItem {
  id: string;
  title: string;
  description: string;
  benefits: string[];
}

interface ValuePropsProps {
  strategicValueProps: ValuePropItem[];
}

export default function ValueProps({ strategicValueProps }: ValuePropsProps) {
  // Use passed data or fallback to empty array
  const valueProps = strategicValueProps || [];

  return (
    <section id="strategic-value-props" className="relative py-16 bg-[#0a0a0a] overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12 max-w-4xl">
           <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Why Strategic Clients Choose <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Expert Partnership
            </span>
          </h2>
          <p className="text-lg text-neutral-400">
            We move beyond &apos;task completion&apos; to provide the strategic foresight required for high-stakes digital platforms.
          </p>
        </div>

        {/* The "Ledger" List */}
        <div className="border-t border-neutral-800">
          {valueProps.map((skill, index) => (
            <article
              key={skill.id || index}
              id={skill.id}
              className="group relative border-b border-neutral-800 transition-colors duration-500 hover:border-neutral-600"
              itemScope
              itemType="https://schema.org/Service"
            >
              {/* Hover Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-900/5 to-blue-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="grid md:grid-cols-12 gap-8 py-8 md:py-10 items-start relative z-10">
                
                {/* 1. Title Column */}
                <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between h-full">
                   <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-neutral-600 group-hover:text-blue-400 transition-colors">
                      0{index + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-neutral-300 group-hover:text-white transition-colors" itemProp="name">
                      {skill.title}
                    </h3>
                  </div>
                  {/* Decorative Arrow on Desktop */}
                  <div className="hidden md:block mt-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowUpRight className="text-blue-400" size={32} />
                  </div>
                </div>

                {/* 2. Description & Benefits Column */}
                <div className="md:col-span-7 lg:col-span-6 md:pl-8 border-l border-neutral-800/0 md:border-neutral-800/50 md:group-hover:border-neutral-700 transition-colors">
                  
                   {skill.description && (
                    <p className="text-base text-neutral-400 mb-8 leading-relaxed group-hover:text-neutral-300 transition-colors" itemProp="description">
                      {skill.description}
                    </p>
                  )}

                  <ul className="grid sm:grid-cols-2 gap-4">
                    {skill.benefits && skill.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        itemProp="offers"
                        className="flex items-start group/item"
                      >
                        <div className="mt-1 mr-3 shrink-0 rounded-md bg-emerald-500/10 p-1 group-hover/item:bg-emerald-500/20 transition-colors">
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