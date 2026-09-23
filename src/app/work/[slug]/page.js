import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import JsonLd from '../../../components/JsonLd';
import { Eyebrow } from '../../../components/ui/Cta';
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

  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          caseStudyNode(cs),
          breadcrumbNode([['Home', '/'], ['Work', '/work/'], [cs.client, `/work/${cs.slug}/`]])
        )}
      />
      <article className="bg-[#0a0a0a] text-white">
        <header className="pt-36 pb-12 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl">
            <Link href="/work/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white mb-8">
              <ArrowLeft className="w-4 h-4" /> All work
            </Link>
            <div>
              <Eyebrow>{cs.client} · {cs.industry}</Eyebrow>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-6 mb-6 leading-tight">{cs.title}</h1>
            <p className="text-xl text-neutral-300 leading-relaxed">{cs.summary}</p>

            <dl className="mt-10 grid sm:grid-cols-3 gap-6 text-sm border-t border-neutral-800 pt-6">
              {cs.role && (
                <div>
                  <dt className="text-neutral-500 mb-1">Role</dt>
                  <dd>{cs.role}</dd>
                </div>
              )}
              <div>
                <dt className="text-neutral-500 mb-1">Built with</dt>
                <dd>{cs.stack.join(', ')}</dd>
              </div>
              {cs.integrations.length > 0 && (
                <div>
                  <dt className="text-neutral-500 mb-1">Integrations</dt>
                  <dd>{cs.integrations.join(', ')}</dd>
                </div>
              )}
            </dl>
          </div>
        </header>

        <div className="px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl relative aspect-[16/9] rounded-xl overflow-hidden border border-neutral-800">
            <Image src={cs.heroImage} alt={`${cs.client} screenshot`} fill priority className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 1024px" />
          </div>
        </div>

        {cs.metrics.length > 0 && (
          <section className="px-4 sm:px-6 pt-16">
            <div className="container mx-auto max-w-4xl grid sm:grid-cols-3 gap-6">
              {cs.metrics.map((m) => (
                <div key={m.label} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40">
                  <p className="text-3xl font-extrabold text-white">{m.value}</p>
                  <p className="text-sm text-neutral-300 mt-1">{m.label}</p>
                  {m.note && <p className="text-xs text-neutral-500 mt-2">{m.note}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="px-4 sm:px-6 py-16">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">The problem</h2>
            <p className="text-lg text-neutral-300 leading-relaxed mb-12">{cs.problem}</p>

            <h2 className="text-2xl font-bold mb-6">The approach</h2>
            <ol className="space-y-8 mb-12">
              {cs.approach.map((step, i) => (
                <li key={step.heading} className="grid grid-cols-[2.5rem_1fr]">
                  <span className="font-mono text-sm text-blue-400 pt-1">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.heading}</h3>
                    <p className="text-neutral-400 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {cs.quote && (
              <figure className="border-l-2 border-blue-500 pl-6 my-12">
                <blockquote className="text-xl text-white leading-relaxed">&ldquo;{cs.quote.text}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm text-neutral-400">
                  {cs.quote.author}, {cs.quote.title}
                </figcaption>
              </figure>
            )}

            {cs.liveUrl && (
              <a
                href={cs.liveUrl}
                {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                className="inline-flex items-center gap-2 font-bold text-white hover:text-blue-400 transition-colors"
              >
                See it live <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
