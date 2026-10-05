import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import { Block, LinkRows, NumberedList, PageHero, Prose, WRAP } from '../../../components/ui/Page';
import { getCaseStudy, publishedCaseStudies } from '../../../data/caseStudies';
import { breadcrumbNode, caseStudyNode, graph } from '../../../lib/schema';

export function generateStaticParams() {
  return publishedCaseStudies().map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.seoTitle || `${cs.client} Case Study`,
    description: cs.summary,
    alternates: { canonical: `/work/${cs.slug}/` },
    openGraph: { type: 'article', title: cs.title, description: cs.summary, url: `/work/${cs.slug}/` },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const isExternal = cs.liveUrl?.startsWith('http');
  const all = publishedCaseStudies();
  const nextCase = all[(all.findIndex((c) => c.slug === cs.slug) + 1) % all.length];

  let n = 0;
  const next = () => String(++n).padStart(2, '0');

  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          caseStudyNode(cs),
          breadcrumbNode([['Home', '/'], ['Work', '/work/'], [cs.client, `/work/${cs.slug}/`]])
        )}
      />
      <article className="bg-ink">
        <PageHero
          back={['/work/', 'All work']}
          eyebrow={cs.industry}
          size="md"
          title={cs.title}
          lede={cs.summary}
          facts={[
            ['Client', cs.client],
            ...(cs.role ? [['Role', cs.role]] : []),
            ['Built with', cs.stack.join(', ')],
            ...(cs.integrations.length > 0 ? [['Integrations', cs.integrations.join(', ')]] : []),
          ]}
        >
          {cs.liveUrl && (
            <a
              href={cs.liveUrl}
              {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
              className="group inline-flex items-center gap-2 pl-6 pr-5 py-3.5 rounded-full border border-line font-medium hover:border-paper transition-colors duration-300"
            >
              See it live
              <ArrowUpRight className="w-4 h-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </PageHero>

        <div className={`${WRAP} pb-20 md:pb-28`}>
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-ink-3" data-reveal>
            <Image src={cs.heroImage} alt={`${cs.client} screenshot`} fill priority className="object-cover object-top" sizes="(max-width: 1440px) 100vw, 1440px" />
          </div>
        </div>

        {cs.metrics.length > 0 && (
          <Block index={next()} label="Results">
            <dl className="grid sm:grid-cols-3 border-t border-line">
              {cs.metrics.map((m, i) => (
                <div key={m.label} className={`pt-6 pb-8 sm:px-6 sm:first:pl-0 ${i > 0 ? 'sm:border-l border-line' : ''}`}>
                  <dd className="text-4xl md:text-5xl font-medium tracking-[-0.04em]">{m.value}</dd>
                  <dt className="mt-3 text-muted">{m.label}</dt>
                  {m.note && <p className="mt-2 text-sm text-faint">{m.note}</p>}
                </div>
              ))}
            </dl>
          </Block>
        )}

        <Block index={next()} label="The problem">
          <Prose paragraphs={[cs.problem]} />
        </Block>

        <Block index={next()} label="The approach">
          <NumberedList
            tone="accent"
            items={cs.approach.map((step) => (
              <>
                <h3 className="text-2xl font-medium tracking-[-0.03em] text-paper mb-3">{step.heading}</h3>
                <p className="text-muted leading-relaxed">{step.body}</p>
              </>
            ))}
          />
        </Block>

        {cs.quote && (
          <Block index={next()} label="In their words">
            <figure>
              <blockquote className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.03em]">
                &ldquo;{cs.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {cs.quote.author}, {cs.quote.title}
              </figcaption>
            </figure>
          </Block>
        )}

        {nextCase && nextCase.slug !== cs.slug && (
          <Block label="Next case study">
            <LinkRows items={[{ href: `/work/${nextCase.slug}/`, title: nextCase.title, tag: nextCase.client, body: nextCase.summary }]} />
          </Block>
        )}
      </article>
      <Footer />
    </>
  );
}
