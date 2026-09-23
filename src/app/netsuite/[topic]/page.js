import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';
import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import LeadMagnetCTA from '../../../components/LeadMagnetCTA';
import { Eyebrow } from '../../../components/ui/Cta';
import { getTopic, publishedTopics } from '../../../data/netsuiteTopics';
import { getCaseStudy } from '../../../data/caseStudies';
import { ORG_ID, PERSON_ID, breadcrumbNode, faqNode, graph, url } from '../../../lib/schema';

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
      <article className="bg-[#0a0a0a] text-white">
        <header className="pt-36 pb-10 px-4 sm:px-6">
          <div className="container mx-auto max-w-3xl">
            <Link href="/netsuite/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white mb-8">
              <ArrowLeft className="w-4 h-4" /> NetSuite
            </Link>
            <div>
              <Eyebrow>NetSuite integration guide</Eyebrow>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-6 mb-6 leading-tight">{topic.h1}</h1>
            <p className="text-xl text-neutral-200 leading-relaxed">{topic.lede}</p>
          </div>
        </header>

        <div className="px-4 sm:px-6 pb-16">
          <div className="container mx-auto max-w-3xl">
            <div className="space-y-5 text-lg text-neutral-300 leading-relaxed mb-14">
              {topic.diagnosis.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-6">The options</h2>
            <div className="overflow-x-auto mb-14">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500">
                    <th className="py-3 pr-4 font-medium">Approach</th>
                    <th className="py-3 pr-4 font-medium">Best for</th>
                    <th className="py-3 font-medium">Trade-off</th>
                  </tr>
                </thead>
                <tbody>
                  {topic.decisionTable.map((row) => (
                    <tr key={row.option} className="border-b border-neutral-900 align-top">
                      <td className="py-4 pr-4 font-semibold">{row.option}</td>
                      <td className="py-4 pr-4 text-neutral-300">{row.bestFor}</td>
                      <td className="py-4 text-neutral-400">{row.tradeoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {topic.fieldMapping && (
              <>
                <h2 className="text-2xl font-bold mb-6">Field mapping decisions that matter</h2>
                <div className="overflow-x-auto mb-14">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-500">
                        <th className="py-3 pr-4 font-medium">Source</th>
                        <th className="py-3 pr-4 font-medium">NetSuite</th>
                        <th className="py-3 font-medium">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topic.fieldMapping.map(([from, to, note]) => (
                        <tr key={from} className="border-b border-neutral-900 align-top">
                          <td className="py-3 pr-4 font-mono text-xs text-neutral-200">{from}</td>
                          <td className="py-3 pr-4 font-mono text-xs text-blue-300">{to}</td>
                          <td className="py-3 text-neutral-400">{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {topic.codeSnippet && (
              <pre className="mb-14 p-6 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-300 overflow-x-auto">
                <code>{topic.codeSnippet}</code>
              </pre>
            )}

            <h2 className="text-2xl font-bold mb-6">Where these projects go wrong</h2>
            <ul className="space-y-4 mb-14">
              {topic.gotchas.map((g) => (
                <li key={g} className="flex gap-3 text-neutral-300 leading-relaxed">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-1" /> {g}
                </li>
              ))}
            </ul>

            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 mb-14">
              <h2 className="text-xl font-bold mb-3">When not to do this</h2>
              <p className="text-neutral-300 leading-relaxed">{topic.whenNotToDoThis}</p>
            </div>

            <h2 className="text-2xl font-bold mb-6">Questions</h2>
            <dl className="space-y-6 mb-14">
              {topic.faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-semibold mb-2">{q}</dt>
                  <dd className="text-neutral-400 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>

            {caseStudy && (
              <Link
                href={`/work/${caseStudy.slug}/`}
                className="group block p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 mb-8 transition-colors"
              >
                <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Related case study · {caseStudy.client}</p>
                <p className="font-semibold group-hover:text-blue-400">{caseStudy.title}</p>
              </Link>
            )}
            {related.length > 0 && (
              <ul className="mb-14 space-y-2">
                {related.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/netsuite/${t.slug}/`} className="inline-flex items-center gap-2 text-blue-400 hover:underline">
                      {t.h1} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <LeadMagnetCTA />
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
