import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';

const ACCENTS = ['from-purple-400 to-pink-500', 'from-emerald-400 to-cyan-500', 'from-cyan-400 to-blue-500', 'from-orange-400 to-amber-500'];

export default function Portfolio({ projects }) {
  return (
    <>
      {/* ------------------- 1. HERO SECTION ------------------- */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase">Work</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-800 bg-neutral-900/50 backdrop-blur-md">
            <Layers size={14} className="text-blue-400" />
            <span className="text-sm font-medium text-neutral-300 uppercase tracking-widest">Case Studies</span>
          </div>
        </div>
      </section>

      {/* ------------------- 2. PROJECTS LOOP ------------------- */}
      <section className="relative py-20 bg-[#0a0a0a] px-4 sm:px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col gap-32">
            {projects.map((project, index) => (
              <article key={project.slug} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* TEXT COLUMN: alternates sides on large screens */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                  <div className="sticky top-32">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs font-mono text-neutral-500">0{index + 1}</span>
                      <div className={`h-[1px] w-12 bg-gradient-to-r ${ACCENTS[index % ACCENTS.length]}`}></div>
                      <span className="text-sm font-bold text-neutral-400 uppercase tracking-wider">{project.client}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{project.title}</h2>

                    <p className="text-lg text-neutral-400 mb-8 leading-relaxed">{project.summary}</p>

                    <div className="flex flex-wrap gap-3 mb-10">
                      {[...project.integrations, ...project.stack].map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-xs font-medium text-neutral-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/work/${project.slug}/`}
                      className="inline-flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors"
                    >
                      Read the case study
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>

                {/* IMAGE COLUMN */}
                <div className="lg:col-span-7">
                  <Link
                    href={`/work/${project.slug}/`}
                    className="block relative rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-shadow duration-500"
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={project.heroImage}
                        alt={`${project.client} project screenshot`}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-8 bg-black/40 backdrop-blur-md flex items-center px-4 gap-2 z-20">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                    </div>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
