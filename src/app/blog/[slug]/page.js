import { posts } from '../../../data/posts';
import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import { Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import { ORG_ID, PERSON_ID, breadcrumbNode, graph, url } from '../../../lib/schema';

export function generateStaticParams() {
    return posts.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.description,
        alternates: { canonical: `/blog/${post.slug}/` },
        robots: { index: false, follow: true },
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
        },
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <JsonLd
                data={graph(
                    {
                        '@type': 'BlogPosting',
                        headline: post.title,
                        description: post.description,
                        url: url(`/blog/${post.slug}/`),
                        image: url(`/blog/${post.slug}/opengraph-image`),
                        datePublished: post.date,
                        author: { '@id': PERSON_ID },
                        publisher: { '@id': ORG_ID },
                    },
                    breadcrumbNode([['Home', '/'], ['Blog', '/blog/'], [post.title, `/blog/${post.slug}/`]])
                )}
            />
            <HomeFollow />
            <article className="pt-32 pb-20 bg-canvas min-h-screen text-ink/80">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto">
                        {/* Back to Blog */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-muted hover:text-ink mb-12 transition-colors uppercase text-xs font-bold tracking-widest"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        {/* Header */}
                        <header className="mb-12">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest rounded-full">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-2 text-muted text-sm">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-ink mb-8 tracking-tighter leading-[1.1]">
                                {post.title}
                            </h1>

                            <div className="flex items-center justify-between border-y border-line py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent" />
                                    <div>
                                        <div className="text-ink font-bold text-sm">Nitya Hoyos</div>
                                        <div className="text-muted text-xs text-uppercase tracking-wider">Strategic Partner</div>
                                    </div>
                                </div>
                                <button className="text-muted hover:text-ink transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </header>

                        {/* Featured Image Placeholder */}
                        <div className="aspect-[21/9] bg-canvas-2 rounded-2xl mb-12 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/10" />
                        </div>

                        {/* Content */}
                        <div
                            className="prose prose-lg max-w-none 
              prose-headings:text-ink prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:leading-relaxed prose-p:mb-6 prose-p:text-muted
              prose-strong:text-ink"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Footer / CTA */}
                        {post.cta === 'appAudit' ? (
                            <footer className="mt-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/20 border border-line text-center">
                                <h3 className="text-2xl sm:text-3xl font-bold text-ink mb-4">Built your app with AI?</h3>
                                <p className="text-muted mb-8 max-w-xl mx-auto">
                                    Check logins, permissions, exposed keys and payments before launch. Start with the free checklist, or have it reviewed.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/ai-app-audit/ai-built-app-launch-checklist/"
                                        className="inline-flex justify-center px-8 py-4 bg-ink !text-canvas font-bold text-lg hover:bg-accent transition-colors"
                                    >
                                        Read the launch checklist
                                    </Link>
                                    <Link
                                        href="/ai-app-audit/"
                                        className="inline-flex justify-center px-8 py-4 border border-line text-ink font-bold text-lg hover:bg-ink/5 transition-colors"
                                    >
                                        See the app audit
                                    </Link>
                                </div>
                            </footer>
                        ) : (
                            <footer className="mt-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/20 border border-line text-center">
                                <h3 className="text-2xl sm:text-3xl font-bold text-ink mb-4">Running on NetSuite?</h3>
                                <p className="text-muted mb-8 max-w-xl mx-auto">
                                    A fixed-price integration audit shows where your ERP, storefront, and portals are leaking data, and exactly what to fix first.
                                </p>
                                <Link
                                    href="/netsuite-audit/"
                                    className="inline-flex px-8 py-4 bg-ink !text-canvas font-bold text-lg hover:bg-accent transition-colors"
                                >
                                    See the NetSuite audit
                                </Link>
                            </footer>
                        )}
                    </div>
                </div>
            </article>
            <Footer />
        </>
    );
}
