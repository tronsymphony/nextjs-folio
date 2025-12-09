import Link from "next/link";
import Script from "next/script";
import { 
  Code, Layers, LineChart, MapPin, 
  Bike, Check, ArrowRight, Terminal 
} from "lucide-react";

export default function About() {
  
  // Tech Stack Data
  const techStack = [
    { name: "React / Next.js", icon: Code },
    { name: "Laravel / PHP", icon: Terminal },
    { name: "Shopify Plus", icon: Layers },
    { name: "Technical SEO", icon: LineChart },
  ];

  // Outcomes Data
  const outcomes = [
    {
      title: "Conversion Design",
      desc: "I craft user-friendly, visually striking digital experiences with a marketing-first focus to ensure optimal lead capture and conversion rates."
    },
    {
      title: "Risk-Free Development",
      desc: "I build highly scalable, clean codebases using Next.js and Laravel, guaranteeing zero technical debt and long-term stability for your investment."
    },
    {
      title: "Strategic Oversight",
      desc: "End-to-end strategic oversight, combining development and design expertise to deliver impactful projects that maximize your ROI."
    }
  ];

  return (
    <>
      {/* ------------------- 1. HERO SECTION ------------------- */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 bg-[#0a0a0a] overflow-hidden" data-scroll-section>
        {/* Background Glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] -z-10 rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-bold mb-6 tracking-wide uppercase">
            <MapPin size={12} /> Los Angeles Based
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase leading-[1.1]">
            Your Technical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Strategist.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 font-medium">
            10+ Years of Expertise in Development, Design, and Marketing.
          </p>
        </div>
      </section>

      {/* ------------------- 2. BIO & STRATEGY ------------------- */}
      <section className="py-20 bg-[#0a0a0a] px-4 sm:px-6 relative" data-scroll-section>
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: Main Bio (Span 7) */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-bold text-white mb-6">
                The Full-Stack Partner for <br />
                <span className="text-blue-500">Comprehensive Solutions</span>
              </h2>
              
              <div className="prose prose-invert max-w-none text-neutral-400 leading-relaxed text-lg space-y-6">
                <p>
                  Hi, I’m <strong className="text-white">Nitya Hoyos</strong>. I am a Los Angeles-based Full-Stack Digital Partner with over 10 years of experience spanning high-level development, strategic design, and performance-driven marketing.
                </p>
                <p>
                  For established businesses and funded startups, I provide the essential <strong className="text-white">all-in-one solution</strong> needed to build, launch, and grow complex digital platforms without the risk of hiring multiple siloed vendors.
                </p>
                
                

                <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl mt-8">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Layers className="text-emerald-400" size={20} />
                    Why Companies Choose an Expert
                  </h3>
                  <p className="text-sm mb-4">
                    Experienced businesses understand the cost of fragmentation: project delays, miscommunication, and expensive rebuilds. I eliminate that risk covering:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Development: Scalable, clean platforms (React/Next.js/Laravel).",
                      "Design: Conversion-focused UI/UX driving trust.",
                      "Marketing: SEO & Analytics baked into the code."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <Check className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT: Toolkit & Stats (Span 5) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Tech Stack Card */}
              <div className="p-8 rounded-3xl bg-neutral-900/30 border border-neutral-800">
                <h3 className="text-xl font-bold text-white mb-6">Professional Toolkit (10+ YOE)</h3>
                <div className="grid grid-cols-2 gap-4">
                  {techStack.map((tech, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 transition-colors">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <tech.icon size={18} />
                      </div>
                      <span className="text-sm font-medium text-neutral-300">{tech.name}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-neutral-500 leading-relaxed">
                  I architect the precise solution your business needs—whether it&apos;s a high-volume e-commerce platform or a bespoke enterprise application.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ------------------- 3. PERSONAL / CYCLING ------------------- */}
      <section className="py-20 bg-[#050505] border-y border-neutral-900 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Bike className="text-orange-500" size={24} />
                </div>
                <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">The Drive</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                How Cycling Fuels <br /> My Strategic Work
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                While my work is deeply strategic, my passion for cycling mirrors the discipline I bring to every project. 
              </p>
              <p className="text-neutral-400 text-lg leading-relaxed">
                The challenging routes of Los Angeles require persistence and precise problem-solving—the same approach I take to debugging complex architectures and developing innovative solutions for your business.
              </p>
            </div>

            {/* Strava Embed Wrapper */}
            <div className="relative">
              {/* Decorative Ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 -z-10"></div>
              
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                 {/* Iframe */}
                 <div className="relative w-full h-[454px]">
                    <iframe
                      height="454"
                      width="100%"
                      frameBorder="0"
                      allowTransparency="true"
                      scrolling="no"
                      src="https://www.strava.com/athletes/15797336/latest-rides/594248b42a8f75c469c571310aedb6ddf1691468"
                      className="w-full h-full"
                    ></iframe>
                 </div>
                 
                 {/* Optional: Load Script if Strava requires it for interactivity outside iframe */}
                 <Script
                    src="https://strava-embeds.com/embed.js"
                    strategy="lazyOnload"
                  />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------- 4. OUTCOMES (Ledger Style) ------------------- */}
      <section className="py-24 bg-[#0a0a0a] px-4 sm:px-6" data-scroll-section>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-white mb-16 text-center">
            The Strategic Outcomes I Deliver
          </h2>

          <div className="flex flex-col border-t border-neutral-800">
            {outcomes.map((item, index) => (
              <div 
                key={index}
                className="group flex flex-col md:flex-row items-start md:items-center py-10 border-b border-neutral-800 hover:border-neutral-600 transition-colors duration-300"
              >
                {/* Number */}
                <span className="hidden md:block w-16 text-neutral-600 font-mono text-sm group-hover:text-blue-400 transition-colors">
                  0{index + 1}
                </span>

                {/* Title */}
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <h3 className="text-2xl font-bold text-neutral-200 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:w-1/2 md:pl-8">
                  <p className="text-neutral-400 leading-relaxed text-lg group-hover:text-neutral-300 transition-colors">
                    {item.desc}
                  </p>
                </div>
                
                 {/* Arrow */}
                 <div className="hidden md:flex flex-1 justify-end opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="text-blue-400" />
                 </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Ready to Eliminate Vendor Fragmentation?</h3>
            <div className="flex justify-center gap-6">
               <Link href="/portfolio" className="text-neutral-400 hover:text-white underline underline-offset-4 decoration-neutral-700 hover:decoration-white transition-all">
                  View Portfolio
               </Link>
               <Link href="/contact" className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4 decoration-blue-500/30 hover:decoration-blue-400 transition-all">
                  Get in Touch
               </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}