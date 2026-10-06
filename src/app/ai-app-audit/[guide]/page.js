import { notFound } from 'next/navigation';
import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import { Accent } from '../../../components/ui/Cta';
import { Block, Callout, ClosingCta, FaqList, LinkRows, PageHero, Prose, formatDay } from '../../../components/ui/Page';
import { getGuide, publishedGuides } from '../../../data/appAuditGuides';
import { OFFERS, PERSON, formatUSD } from '../../../lib/site';
import { ORG_ID, PERSON_ID, breadcrumbNode, faqNode, graph, url } from '../../../lib/schema';

export function generateStaticParams() {
  return publishedGuides().map(({ slug }) => ({ guide: slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { guide: slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/ai-app-audit/${guide.slug}/` },
    openGraph: { type: 'article', title: guide.title, description: guide.description, url: `/ai-app-audit/${guide.slug}/` },
  };
}

export default async function AppAuditGuidePage({ params }) {
  const { guide: slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const related = guide.related.map(getGuide).filter(Boolean);
  const audit = OFFERS.appAudit;

  let n = 0;
  const next = () => String(++n).padStart(2, '0');

  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Article',
            headline: guide.h1,
            description: guide.description,
            url: url(`/ai-app-audit/${guide.slug}/`),
            dateModified: guide.updatedAt,
            author: { '@id': PERSON_ID },
            publisher: { '@id': ORG_ID },
          },
          breadcrumbNode([['Home', '/'], ['AI-Built App Audit', '/ai-app-audit/'], [guide.h1, `/ai-app-audit/${guide.slug}/`]]),
          faqNode(guide.faqs)
        )}
      />
      <article className="bg-canvas">
        <PageHero
          back={['/ai-app-audit/', 'AI-built app audit']}
          eyebrow="Security guide"
          size="md"
          title={guide.h1}
          lede={guide.lede}
          facts={[
            ['Updated', formatDay(guide.updatedAt)],
            ['Written by', PERSON.name],
            ['Checks', `${guide.checks.length}, each with a fix`],
            ['You need', 'A browser and a terminal'],
          ]}
        />

        <Block index={next()} label="Why it matters">
          <Prose paragraphs={guide.intro} />
        </Block>

        <Block index={next()} label="The checks" title="Run these before launch" wide>
          <ol className="border-t border-line">
            {guide.checks.map((c, i) => (
              <li key={c.title} className="grid md:grid-cols-12 gap-x-8 gap-y-5 py-10 border-b border-line">
                <div className="md:col-span-4 flex gap-4">
                  <span className="font-mono text-xs text-accent pt-2">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-2xl font-medium tracking-[-0.03em] leading-[1.12]">{c.title}</h3>
                </div>
                <div className="md:col-span-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint mb-3">How to check</p>
                  <p className="text-ink/85 leading-relaxed">{c.how}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint mb-3">Fix</p>
                  <p className="text-muted leading-relaxed">{c.fix}</p>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        {guide.codeSnippet && (
          <Block index={next()} label="Example" wide>
            <pre className="p-6 md:p-8 rounded-3xl bg-canvas-2 border border-line text-[13px] leading-relaxed text-ink/85 overflow-x-auto font-mono">
              <code>{guide.codeSnippet}</code>
            </pre>
          </Block>
        )}

        <Block index={next()} label="Beyond the checklist">
          <Callout label="When to get help">{guide.whenToGetHelp}</Callout>
        </Block>

        <Block index={next()} label="Questions">
          <FaqList faqs={guide.faqs} />
        </Block>

        {related.length > 0 && (
          <Block index={next()} label="Read next">
            <LinkRows items={related.map((g) => ({ href: `/ai-app-audit/${g.slug}/`, title: g.h1, tag: `${g.checks.length} checks` }))} />
          </Block>
        )}

        <ClosingCta
          title={<>Want someone else to <Accent>run these checks?</Accent></>}
          body={`The ${audit.name} covers everything on this page and more, in ${audit.durationDays} business days, with the file and line for each issue.${
            audit.price ? ` ${formatUSD(audit.price)} flat.` : ''
          }`}
          href="/ai-app-audit/"
          cta="See the audit"
        />
      </article>
      <Footer />
    </>
  );
}
