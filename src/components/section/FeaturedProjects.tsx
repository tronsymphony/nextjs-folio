import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import image from "next/image";

export default function FeaturedProjects() {
  
  // Project Data
  const projects = [
    {
      id: "totalwarehouse",
      client: "Total Warehouse",
      title: "Digital Showroom",
      url: "https://showroom.totalwarehouse.com",
      desc: "A custom Next.js application fully integrated with Oracle NetSuite. This digital showroom streamlines inventory browsing and quote generation by syncing real-time product data directly from the ERP.",
      image: "/images/totalwarehouse.jpg",
      tags: ["Next.js", "Oracle NetSuite", "Real-Time Data"],
      color: "from-purple-400 to-pink-500"
    },
    {
      id: "godaddy",
      client: "GoDaddy",
      title: "Venture Forward",
      url: "https://godaddy.com/ventureforward",
      desc: "Creating a better online presence. I engineered a data-heavy platform processing millions of micro-business data points to visualize economic impact.",
      image: "/images/god.jpg", // Ensure this path matches your public folder
      tags: ["React", "Data Visualization", "Next.js"],
      color: "from-cyan-400 to-blue-500"
    },
    {
      id: "bulletproof",
      client: "Bulletproof",
      title: "E-Commerce Experience",
      url: "https://bulletproof.com",
      desc: "Lighting up an internet presence. A headless Shopify implementation designed for speed, SEO domination, and high-conversion user flows.",
      image: "/images/bulletproof.jpg",
      tags: ["Headless Shopify", "Performance", "Vue.js"],
      color: "from-orange-400 to-amber-500"
    }
  ];

  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      
      {/* 1. Background Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        
        {/* 2. Header */}
        <header className="mb-20 md:mb-32 max-w-4xl">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase">
            Featured <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Projects
            </span>
          </h2>
          <div className="h-1 w-24 bg-blue-500 rounded-full"></div>
        </header>

        {/* 3. Projects Loop */}
        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((project, index) => (
            <div key={project.id} className="group grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              
              {/* TEXT COLUMN */}
              {/* Logic: Sticky position + Alternating Order */}
              <div className={`md:col-span-5 flex flex-col justify-center sticky top-32 self-start ${index % 2 === 1 ? 'md:order-last md:pl-12' : 'md:pr-12'}`}>
                
                {/* Project Meta */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-mono text-neutral-500">0{index + 1}</span>
                  <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{project.client}</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-medium text-neutral-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link 
                  href={project.url}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors border-b border-white/20 hover:border-blue-400 pb-1 w-fit"
                >
                  Visit Live Site
                  <ArrowUpRight size={18} />
                </Link>
              </div>

              {/* IMAGE COLUMN */}
              {/* Logic: Takes up 7 columns. On odd indexes, it moves to the left (order-first) */}
              <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-first' : ''}`}>
                <div className="relative rounded-xl bg-neutral-900 border border-neutral-800 p-2 shadow-2xl group-hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-2">
                  
                  {/* Browser Chrome (Decoration) */}
                  <div className="h-8 bg-neutral-950 rounded-t-lg flex items-center px-4 gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    {/* Fake URL Bar */}
                    <div className="ml-4 h-4 bg-neutral-800 rounded-full w-full max-w-[200px]"></div>
                  </div>

                  {/* Image Wrapper */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#dde5ef]">
                    <Image
                      src={project.image}
                      alt={`${project.client} Project`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}