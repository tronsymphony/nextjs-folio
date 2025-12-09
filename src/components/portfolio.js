import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Layers } from "lucide-react";

export default function Portfolio() {
  
  // Data: Easy to add new projects here
  const projects = [
    {
      id: "godaddy",
      client: "GoDaddy",
      title: "Venture Forward",
      desc: "Creating a better online presence. I engineered a data-heavy platform processing millions of micro-business data points to visualize economic impact.",
      link: "https://godaddy.com/ventureforward",
      image: "/images/god.jpg",
      tags: ["React", "Data Viz", "Next.js"],
      color: "from-teal-400 to-blue-500" // Custom gradient accent
    },
    {
      id: "bulletproof",
      client: "Bulletproof",
      title: "E-Commerce Experience",
      desc: "Lighting up an internet presence. A headless Shopify implementation designed for speed, SEO domination, and high-conversion user flows.",
      link: "https://bulletproof.com",
      image: "/images/bulletproof.jpg",
      tags: ["Shopify Headless", "Vue.js", "Performance"],
      color: "from-orange-400 to-amber-500"
    }
  ];

  return (
    <>
      {/* ------------------- 1. HERO SECTION ------------------- */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 bg-[#0a0a0a] overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase">
            Portfolio
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-md">
            <Layers size={14} className="text-blue-400" />
            <span className="text-sm font-medium text-neutral-300 uppercase tracking-widest">
              Selected Works & Case Studies
            </span>
          </div>
        </div>
      </section>

      {/* ------------------- 2. PROJECTS LOOP ------------------- */}
      <section className="relative py-20 bg-[#0a0a0a] px-4 sm:px-6">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          
          <div className="flex flex-col gap-32">
            {projects.map((project, index) => (
              <article 
                key={project.id}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                
                {/* TEXT COLUMN */}
                {/* Logic: If index is even (0, 2), text is on Left. If odd (1, 3), text is on Right (order-last) */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                  
                  {/* Sticky Header Effect using pure CSS */}
                  <div className="sticky top-32">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs font-mono text-neutral-500">0{index + 1}</span>
                      <div className={`h-[1px] w-12 bg-gradient-to-r ${project.color}`}></div>
                      <span className="text-sm font-bold text-neutral-400 uppercase tracking-wider">{project.client}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all">
                      {project.title}
                    </h2>

                    <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                      {project.desc}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-medium text-neutral-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link 
                      href={project.link}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors"
                    >
                      View Live Project
                      <ExternalLink size={18} />
                    </Link>
                  </div>
                </div>

                {/* IMAGE COLUMN */}
                <div className="lg:col-span-7">
                  <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-shadow duration-500">
                    
                    {/* Overlay Gradient on Hover */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                    
                    {/* Image Wrapper for Scaling */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.client} Project Screenshot`}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>

                    {/* Decorative Browser Bar */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-black/40 backdrop-blur-md flex items-center px-4 gap-2 z-20">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                    </div>

                  </div>
                </div>

              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-32 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Have a project in mind?</h3>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white !text-black font-bold rounded-full transition-transform hover:scale-105"
            >
              Start a Conversation
              <ArrowUpRight size={20} />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}