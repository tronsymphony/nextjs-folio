import React from 'react';
import Link from 'next/link';
import { 
  Search, Code, Zap, MapPin, 
  ArrowRight, Check, BarChart, 
  Target, Rocket 
} from 'lucide-react';

export default function LocationPageContent({ city, region, introText, specificContext }) {
  const services = [
    {
      title: "Strategic Web Development",
      description: `Custom, high-performance platforms built for ${city} businesses that need more than just a template.`,
      icon: Code,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      title: "Technical SEO & Growth",
      description: "Advanced optimization to ensure your business dominates local search results and captures high-intent leads.",
      icon: Search,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      title: "AI Integration",
      description: "Leverage artificial intelligence to automate local workflows and personalize the customer experience.",
      icon: Zap,
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      title: "Data-Driven Strategy",
      description: "In-depth analytics and performance tracking to measure every dollar of your digital investment.",
      icon: BarChart,
      color: "text-orange-400",
      bg: "bg-orange-500/10"
    }
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-gray-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-900/30 border border-blue-800/50 text-blue-400 text-xs font-bold mb-8 tracking-widest uppercase">
            <MapPin size={12} /> Digital Partner in {city}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
            Elevate Your Business in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {city}.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
            {introText}
          </p>
        </div>
      </section>

      {/* Strategic Value Section */}
      <section className="py-24 px-4 sm:px-6 border-y border-white/5 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
                Why Strategic Digital Presence Matters in {city}
              </h2>
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                <p>
                  {region} is a competitive hub. To stand out, you need more than just a website—you need a 
                  <span className="text-white"> growth-oriented digital platform</span> that combines 
                  engineering excellence with conversion strategy.
                </p>
                <p>
                  {specificContext}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, i) => (
                <div key={i} className="p-6 rounded-lg bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all group">
                  <div className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-4 sm:px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">The Casa Dev Advantage</h2>
            <p className="text-gray-400 text-lg">Direct partnership, zero overhead, maximum results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Holistic Expertise", 
                desc: "10+ years combining development, design, and marketing into one cohesive strategy.",
                icon: Target
              },
              { 
                title: "No Technical Debt", 
                desc: "Hand-crafted code (React, Laravel) that ensures long-term scalability and security.",
                icon: Check
              },
              { 
                title: "Local Market Insight", 
                desc: `Deep understanding of the ${city} market to position your brand for maximum impact.`,
                icon: Rocket
              }
            ].map((item, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">
            Ready to Lead in <br /> {city}?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Stop competing for table scraps. Let&apos;s build a digital presence that dominates your local industry.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white !text-black font-black text-xl hover:bg-gray-200 transition-all rounded-lg"
          >
            Start Your Project <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </main>
  );
}
