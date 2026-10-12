import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import { ArrowLink } from '../../../components/ui/Cta';
import { Block, FaqList, LinkRows, NumberedList, PageHero, Prose } from '../../../components/ui/Page';
import { STAGES, ediDocuments, ediSlug, getEdiByCode, getEdiDocument } from '../../../data/ediDocuments';
import { ORG_ID, PERSON_ID, breadcrumbNode, faqNode, graph, url } from '../../../lib/schema';

export function generateStaticParams() {
  return ediDocuments.map((d) => ({ doc: ediSlug(d.code) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { doc: slug } = await params;
  const d = getEdiDocument(slug);
  if (!d) return {};
  return {
    title: d.title,
    description: `${d.summary} What the EDI ${d.code} contains, where it fits, how it maps to NetSuite, and the mistakes that cause chargebacks.`,
    alternates: { canonical: `/edi/${slug}/` },
    openGraph: { type: 'article', title: d.title, description: d.summary, url: `/edi/${slug}/` },
  };
}

// One linked chip per document code, used in the flow strip.
function DocChip({ code, current = false }) {
  const d = getEdiByCode(code);
  if (current) {
    return (
      <span className="inline-flex flex-col px-4 py-3 rounded-2xl bg-ink text-canvas">
        <span className="font-mono text-[13px]">{code}</span>
        <span className="text-[13px] opacity-75">{d.name}</span>
      </span>
    );
  }
  return (
    <Link href={`/edi/${ediSlug(code)}/`} className="inline-flex flex-col px-4 py-3 rounded-2xl border border-line hover:border-ink transition-colors">
      <span className="font-mono text-[13px]">{code}</span>
      <span className="text-[13px] text-muted">{d.name}</span>
    </Link>
  );
}

export default async function EdiDocumentPage({ params }) {
  const { doc: slug } = await params;
  const d = getEdiDocument(slug);
  if (!d) notFound();
  const sameStage = ediDocuments.filter((x) => x.stage === d.stage && x.code !== d.code);

  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Article',
            headline: d.title,
            description: d.summary,
            url: url(`/edi/${slug}/`),
            author: { '@id': PERSON_ID },
            publisher: { '@id': ORG_ID },
          },
          breadcrumbNode([
            ['Home', '/'],
            ['EDI reference', '/edi/'],
            [`EDI ${d.code}`, `/edi/${slug}/`],
          ]),
          faqNode(d.faqs)
        )}
      />
      <article className="bg-canvas">
        <PageHero
          back={['/edi/', 'EDI reference']}
          eyebrow={`EDI ${d.code} · ${STAGES[d.stage]}`}
          size="md"
          title={d.title}
          lede={d.summary}
          facts={[
            ['Document', `X12 ${d.code}: ${d.name}`],
            ['Sent by', d.from],
            ['Sent to', d.to],
            ['In NetSuite', d.netsuite],
          ]}
        />

        <Block index="01" label="What it is">
          <Prose paragraphs={d.about} />
        </Block>

        <Block index="02" label="What it carries">
          <NumberedList items={d.carries} />
          <p className="mt-6 text-sm text-faint max-w-2xl">
            In plain language. Each trading partner’s implementation guide sets the exact fields it requires.
          </p>
        </Block>

        {(d.flow.before.length > 0 || d.flow.after.length > 0) && (
          <Block index="03" label="Where it fits" wide>
            <div className="flex flex-wrap items-center gap-3">
              {d.flow.before.map((c) => (
                <DocChip key={c} code={c} />
              ))}
              {d.flow.before.length > 0 && <ArrowRight className="w-5 h-5 text-faint" aria-hidden="true" />}
              <DocChip code={d.code} current />
              {d.flow.after.length > 0 && <ArrowRight className="w-5 h-5 text-faint" aria-hidden="true" />}
              {d.flow.after.map((c) => (
                <DocChip key={c} code={c} />
              ))}
            </div>
            <p className="mt-6 text-muted">Documents usually exchanged before and after the {d.code}.</p>
          </Block>
        )}

        <Block index="04" label="In NetSuite">
          <Prose paragraphs={[d.netsuiteDetail]} />
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <ArrowLink href="/netsuite/netsuite-edi-integration/">NetSuite EDI integration guide</ArrowLink>
            <ArrowLink href="/netsuite-audit/">Have your EDI setup reviewed</ArrowLink>
          </div>
        </Block>

        <Block index="05" label="Common mistakes">
          <NumberedList items={d.mistakes} tone="accent" />
        </Block>

        <Block index="06" label="Questions">
          <FaqList faqs={d.faqs} />
        </Block>

        {sameStage.length > 0 && (
          <Block index="07" label={`More ${STAGES[d.stage].toLowerCase()} documents`}>
            <LinkRows
              items={sameStage.map((x) => ({ href: `/edi/${ediSlug(x.code)}/`, tag: `EDI ${x.code}`, title: x.name, body: x.summary }))}
            />
          </Block>
        )}
      </article>
      <Footer />
    </>
  );
}
