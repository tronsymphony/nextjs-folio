import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredCaseStudies } from "../../data/caseStudies";
import { Accent, ArrowLink, SectionHead } from "../ui/Cta";

// Selected work: large images in a two-column grid, details underneath.
export default function FeaturedProjects({ index = "03" }: { index?: string }) {
  const projects = featuredCaseStudies();

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-8 pt-28 md:pt-40">
      <SectionHead index={index} label="Selected work" title={<>Work that ships <Accent>and stays up.</Accent></>} />

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-20">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}/`}
            data-reveal
            style={{ "--reveal-delay": `${(i % 2) * 120}ms` } as React.CSSProperties}
            className={`group block ${i % 2 === 1 ? "md:mt-28" : ""}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-3">
              <Image
                src={project.heroImage}
                alt={`${project.client}: ${project.title}`}
                fill
                className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="absolute top-5 right-5 flex items-center justify-center w-12 h-12 rounded-full bg-paper text-ink opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
            <div className="mt-6 flex items-baseline justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span>{project.client}</span>
              <span className="text-faint">{project.industry}</span>
            </div>
            <h3 className="mt-3 text-2xl md:text-3xl font-medium tracking-[-0.03em] leading-[1.1] max-w-xl">{project.title}</h3>
            <p className="mt-3 text-muted leading-relaxed max-w-xl">{project.summary}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16" data-reveal>
        <ArrowLink href="/work/">All case studies</ArrowLink>
      </div>
    </section>
  );
}
