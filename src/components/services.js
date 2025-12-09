import Link from "next/link";
import { 
  Accessibility, Zap, Palette, Code, 
  Database, RefreshCw, Wrench, Search, 
  ArrowRight, Check 
} from "lucide-react";

export default function Services() {
  
  // Data for Services Grid
  const servicesList = [
    {
      title: "WCAG Compliance",
      description: "From creative designs to ADA audits, I specialize in accessible, user-friendly experiences meeting ADA standards.",
      icon: Accessibility,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      title: "Speed Optimization",
      description: "Optimize for speed and performance. Faster load times mean better SEO rankings and enhanced user experience.",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10"
    },
    {
      title: "Website Design",
      description: "Combining creativity and technical expertise to craft visually appealing, user-focused websites that engage and convert.",
      icon: Palette,
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      title: "Website Development",
      description: "Responsive, scalable, and secure platforms. From static pages to complex web apps, I deliver robust code.",
      icon: Code,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Enterprise CMS",
      description: "Streamline content management with advanced solutions. Perfect for large organizations needing efficiency.",
      icon: Database,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },
    {
      title: "Website Redesign",
      description: "Revamp your site with a modern design. Improve navigation, aesthetics, and functionality to stay competitive.",
      icon: RefreshCw,
      color: "text-orange-400",
      bg: "bg-orange-500/10"
    },
    {
      title: "Maintenance",
      description: "Ensure your site is secure, updated, and performing at its best. Reliable maintenance for peace of mind.",
      icon: Wrench,
      color: "text-red-400",
      bg: "bg-red-500/10"
    },
    {
      title: "SEO Strategy",
      description: "Boost visibility with expert SEO. I optimize content, structure, and off-page elements to drive organic traffic.",
      icon: Search,
      color: "text-pink-400",
      bg: "bg-pink-500/10"
    },
  ];

  // Data for "Why Me" Section
  const whyMeList = [
    { title: "Longevity", desc: "Serving the community for nearly a decade with exceptional web development." },
    { title: "Dev & Design Focus", desc: "Expert development meets creative design to make your brand stand out." },
    { title: "Breathtaking Design", desc: "Flexible, responsive, and industry-standard compliant designs." },
    { title: "On-Brand Experiences", desc: "Design elements that reflect your identity while driving results." },
    { title: "One-of-a-Kind Solutions", desc: "Custom, comprehensive solutions tailored to your specific needs." },
    { title: "Partnership", desc: "Prioritizing clear communication and ongoing support for continued success." },
  ];

  return (
    <>
      {/* ------------------- 1. HERO HEADER ------------------- */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 bg-[#0a0a0a] overflow-hidden" data-scroll-section>
         {/* Background Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

         <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
              Services
            </h1>
            <p className="text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8">
              Crafting Next-Level Digital Experiences
            </p>
            <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              Collaboration is at the heart of everything I do. From innovative apps to visually stunning websites, 
              I offer a diverse range of services to ensure your project&apos;s success.
            </p>
         </div>
      </section>

      {/* ------------------- 2. SERVICES GRID ------------------- */}
      <section className="py-20 bg-[#0a0a0a] px-4 sm:px-6 relative" data-scroll-section>
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Boost Traffic, <span className="text-blue-500">Drive Revenue.</span>
            </h2>
            <p className="text-neutral-500 text-lg uppercase tracking-widest font-bold">Let&apos;s Go Digital</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {servicesList.map((service, index) => (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/80 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="/contact/" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-3 bg-white !text-black font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Talk to Me
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/contact/" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-3 border border-neutral-700 !text-white font-medium rounded-full hover:bg-neutral-800 transition-all"
            >
              More Services
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------- 3. WHY ME (List Style) ------------------- */}
      <section className="py-24 bg-[#0a0a0a] px-4 sm:px-6 border-t border-neutral-900" data-scroll-section>
        <div className="container mx-auto max-w-5xl">
          <h4 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center max-w-3xl mx-auto">
            What Makes Me the <span className="text-emerald-400">Best Developer</span> for Your Next Project?
          </h4>

          <div className="flex flex-col border-t border-neutral-800">
            {whyMeList.map((skill, index) => (
              <div 
                key={index}
                className="group flex flex-col md:flex-row items-start md:items-center py-8 border-b border-neutral-800 hover:border-neutral-600 transition-colors duration-300"
              >
                {/* Number */}
                <span className="hidden md:block w-16 text-neutral-600 font-mono text-sm group-hover:text-emerald-400 transition-colors">
                  0{index + 1}
                </span>

                {/* Title */}
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-neutral-200 group-hover:text-white transition-colors">
                    {skill.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:w-1/2 md:pl-8">
                  <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                    {skill.desc}
                  </p>
                </div>

                {/* Arrow Icon (Desktop Only) */}
                <div className="hidden md:flex flex-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <Check className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}