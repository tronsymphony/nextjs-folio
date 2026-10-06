import { notFound } from 'next/navigation';
import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import LeadMagnetCTA from '../../../components/LeadMagnetCTA';
import { ArrowLink } from '../../../components/ui/Cta';
import { Block, Callout, DataTable, FaqList, LinkRows, NumberedList, PageHero, Prose, formatDay } from '../../../components/ui/Page';
import { getTopic, publishedTopics } from '../../../data/netsuiteTopics';
import { getCaseStudy } from '../../../data/caseStudies';
import { ORG_ID, PERSON_ID, breadcrumbNode, faqNode, graph, url } from '../../../lib/schema';
import { CONFIG, RECORDS, SYSTEMS, estimate } from '../../../lib/estimator/netsuite';
import { PERSON, formatUSD } from '../../../lib/site';

const APPROACHES = [
  ['connector', 'Connector'],
  ['middleware', 'Middleware'],
  ['custom', 'Custom code'],
];

// The estimator's figures for this integration, one row per approach, so the
// cost section is computed from the same published method as the tool.
function costRows({ system, records, direction }) {
  return APPROACHES.map(([approach, label]) => ({
    label,
    ...estimate({ systems: [system], records, direction, approach }),
  }));
}

export function generateStaticParams() {
  return publishedTopics().map(({ slug }) => ({ topic: slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: `/netsuite/${topic.slug}/` },
    openGraph: { type: 'article', title: topic.title, description: topic.description, url: `/netsuite/${topic.slug}/` },
  };
}

export default async function NetSuiteTopicPage({ params }) {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const caseStudy = topic.relatedCaseStudy && getCaseStudy(topic.relatedCaseStudy);
  const related = topic.relatedTopics.map(getTopic).filter(Boolean);

  // Sections are numbered in the order they appear, skipping absent ones.
  let n = 0;
  const next = () => String(++n).padStart(2, '0');

  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Article',
            headline: topic.h1,
            description: topic.description,
            url: url(`/netsuite/${topic.slug}/`),
            dateModified: topic.updatedAt,
            author: { '@id': PERSON_ID },
            publisher: { '@id': ORG_ID },
          },
          breadcrumbNode([['Home', '/'], ['NetSuite', '/netsuite/'], [topic.h1, `/netsuite/${topic.slug}/`]]),
          faqNode(topic.faqs)
        )}
      />
      <article className="bg-canvas">
        <PageHero
          back={['/netsuite/', 'NetSuite guides']}
          eyebrow="NetSuite integration guide"
          size="md"
          title={topic.h1}
          lede={topic.lede}
          facts={[
            ['Updated', formatDay(topic.updatedAt)],
            ['Written by', PERSON.name],
            ['Covers', topic.estimate ? 'Approach, cost, mapping' : 'Approach, trade-offs'],
            ['Questions', `${topic.faqs.length} answered below`],
          ]}
        />

        <Block index={next()} label="The situation">
          <Prose paragraphs={topic.diagnosis} />
        </Block>

        {topic.estimate && (
          <Block index={next()} label="What it costs" title="Cost and timeline by approach">
            <CostSection spec={topic.estimate} />
          </Block>
        )}

        <Block index={next()} label="The options" title="Which approach fits">
          <DataTable
            columns={['Approach', 'Best for', 'Trade-off']}
            rows={topic.decisionTable.map((r) => [r.option, r.bestFor, r.tradeoff])}
          />
        </Block>

        {topic.fieldMapping && (
          <Block index={next()} label="Field mapping" title="Mapping decisions that matter">
            <DataTable columns={['Source', 'NetSuite', 'Note']} rows={topic.fieldMapping} mono={[0, 1]} />
          </Block>
        )}

        {topic.codeSnippet && (
          <Block index={next()} label="Example" wide>
            <pre className="p-6 md:p-8 rounded-3xl bg-canvas-2 border border-line text-[13px] leading-relaxed text-ink/85 overflow-x-auto font-mono">
              <code>{topic.codeSnippet}</code>
            </pre>
          </Block>
        )}

        <Block index={next()} label="Where it goes wrong" title="The mistakes that cost the most">
          <NumberedList items={topic.gotchas} tone="accent" />
        </Block>

        <Block index={next()} label="Before you build">
          <Callout label="When not to do this">{topic.whenNotToDoThis}</Callout>
        </Block>

        <Block index={next()} label="Questions">
          <FaqList faqs={topic.faqs} />
        </Block>

        {(caseStudy || related.length > 0 || topic.relatedLinks) && (
          <Block index={next()} label="Read next">
            <LinkRows
              items={[
                ...(caseStudy
                  ? [{ href: `/work/${caseStudy.slug}/`, title: caseStudy.title, tag: `Case study · ${caseStudy.client}` }]
                  : []),
                ...(topic.relatedLinks || []),
                ...related.map((t) => ({ href: `/netsuite/${t.slug}/`, title: t.h1, tag: 'Guide' })),
              ]}
            />
          </Block>
        )}

        <Block label="Free checklist">
          <LeadMagnetCTA />
        </Block>
      </article>
      <Footer />
    </>
  );
}

function CostSection({ spec }) {
  const rows = costRows(spec);
  const system = SYSTEMS.find((x) => x.id === spec.system);
  const records = RECORDS.filter((r) => spec.records.includes(r.id)).map((r) => r.label.toLowerCase());
  const range = ([lo, hi], f = (v) => v) => (lo === hi ? f(lo) : `${f(lo)}–${f(hi)}`);
  return (
    <>
      <div className="grid sm:grid-cols-3 border-t border-line">
        {rows.map((r, i) => (
          <div key={r.label} className={`pt-6 pb-8 sm:px-6 sm:first:pl-0 ${i > 0 ? 'sm:border-l border-line' : ''} border-b sm:border-b-0 border-line`}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-5">{r.label}</p>
            <p className="text-3xl md:text-[2.5rem] font-medium tracking-[-0.04em] leading-none">{range(r.cost, formatUSD)}</p>
            <p className="mt-4 text-sm text-muted">
              {range(r.hours)} hours · {range(r.weeks)} weeks
            </p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-muted leading-relaxed max-w-3xl">
        For a {spec.direction === 'two-way' ? 'two-way' : 'one-way'} NetSuite–{system.label} integration moving {records.join(', ')}, at
        medium volume with hourly sync and some existing NetSuite customization. Hours are priced at {formatUSD(CONFIG.RATE.low)}–
        {formatUSD(CONFIG.RATE.high)} an hour and include discovery and {Math.round(CONFIG.TESTING_SHARE * 100)}% for testing and cutover.
        Connector and middleware figures leave out license fees, which are paid to the vendor. These are estimates from the published
        method, not a quote.
      </p>
      <div className="mt-8">
        <ArrowLink href={`/tools/netsuite-integration-estimator/?system=${spec.system}`}>Change the inputs in the estimator</ArrowLink>
      </div>
    </>
  );
}

