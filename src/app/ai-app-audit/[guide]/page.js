import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Search, Wrench } from 'lucide-react';
import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import { Eyebrow, PrimaryCta } from '../../../components/ui/Cta';
import { getGuide, publishedGuides } from '../../../data/appAuditGuides';
import { OFFERS, formatUSD } from '../../../lib/site';
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
      <article className="bg-ink text-white">
        <header className="pt-36 pb-10 px-4 sm:px-6">
          <div className="container mx-auto max-w-3xl">
            <Link href="/ai-app-audit/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white mb-8">
              <ArrowLeft className="w-4 h-4" /> AI-built app audit
            </Link>
            <div>
              <Eyebrow>Security guide</Eyebrow>
            </div>
            <h1 className="text-4xl sm:text-5xl font-medium tracking-[-0.04em] mt-6 mb-6 leading-tight">{guide.h1}</h1>
            <p className="text-xl text-neutral-200 leading-relaxed">{guide.lede}</p>
          </div>
        </header>

        <div className="px-4 sm:px-6 pb-16">
          <div className="container mx-auto max-w-3xl">
            <div className="space-y-5 text-lg text-neutral-300 leading-relaxed mb-14">
              {guide.intro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-6">The checks</h2>
            <ol className="space-y-6 mb-14">
              {guide.checks.map((c, i) => (
                <li key={c.title} className="p-6 rounded-xl border border-line bg-ink-2">
                  <p className="text-xs font-mono text-accent mb-2">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="text-lg font-semibold mb-4">{c.title}</h3>
                  <p className="flex gap-3 text-neutral-300 leading-relaxed mb-3">
                    <Search className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" aria-label="How to check" />
                    <span>{c.how}</span>
                  </p>
                  <p className="flex gap-3 text-neutral-400 leading-relaxed">
                    <Wrench className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-label="Fix" />
                    <span>{c.fix}</span>
                  </p>
                </li>
              ))}
            </ol>

            {guide.codeSnippet && (
              <pre className="mb-14 p-6 rounded-xl bg-neutral-950 border border-line text-sm text-neutral-300 overflow-x-auto">
                <code>{guide.codeSnippet}</code>
              </pre>
            )}

            <div className="p-6 rounded-xl border border-line bg-ink-2 mb-14">
              <h2 className="text-xl font-bold mb-3">When to get help</h2>
              <p className="text-neutral-300 leading-relaxed">{guide.whenToGetHelp}</p>
            </div>

            <h2 className="text-2xl font-bold mb-6">Questions</h2>
            <dl className="space-y-6 mb-14">
              {guide.faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-semibold mb-2">{q}</dt>
                  <dd className="text-neutral-400 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>

            {related.length > 0 && (
              <ul className="mb-14 space-y-2">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/ai-app-audit/${g.slug}/`} className="inline-flex items-center gap-2 text-accent hover:underline">
                      {g.h1} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <aside className="p-8 rounded-2xl border border-accent/30 bg-accent/5">
              <h2 className="text-2xl font-bold mb-3">Want someone else to run these checks?</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                The {audit.name} covers everything on this page and more, in {audit.durationDays} business days: a written report with
                the file and line for each issue and a prioritized fix plan.
                {audit.price ? ` ${formatUSD(audit.price)} flat.` : ''}
              </p>
              <ul className="space-y-2 mb-6 text-neutral-300">
                {['Read-only access to your repo and a staging copy', 'Fixes you can make yourself, with any developer, or with an AI tool'].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <PrimaryCta href="/ai-app-audit/">See the audit</PrimaryCta>
            </aside>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
