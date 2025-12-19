import { posts } from '../../../data/posts';
import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import { Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);
    if (!post) return {};

    return {
        title: `${post.title} | Casa Dev`,
        description: post.description,
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "description": post.description,
                        "image": `https://casa-dev.com${post.image}`,
                        "datePublished": post.date,
                        "author": {
                            "@type": "Organization",
                            "name": "Casa Dev"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Casa Dev",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://casa-dev.com/images/logo2.webp"
                            }
                        }
                    })
                }}
            />
            <HomeFollow />
            <article className="pt-32 pb-20 bg-[#050505] min-h-screen text-gray-300">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto">
                        {/* Back to Blog */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors uppercase text-xs font-bold tracking-widest"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        {/* Header */}
                        <header className="mb-12">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-full">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
                                {post.title}
                            </h1>

                            <div className="flex items-center justify-between border-y border-white/5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                                    <div>
                                        <div className="text-white font-bold text-sm">Case Dev Editorial</div>
                                        <div className="text-gray-500 text-xs text-uppercase tracking-wider">Strategic Partner</div>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </header>

                        {/* Featured Image Placeholder */}
                        <div className="aspect-[21/9] bg-neutral-900 rounded-2xl mb-12 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
                        </div>

                        {/* Content */}
                        <div
                            className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:leading-relaxed prose-p:mb-6 prose-p:text-gray-400
              prose-strong:text-white"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Footer / CTA */}
                        <footer className="mt-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 text-center">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to integrate AI into your business?</h3>
                            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                                Let&apos;s discuss how we can build a strategic, AI-powered solution for your unique business needs.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex px-8 py-4 bg-white !text-black font-bold text-lg hover:bg-gray-200 transition-colors"
                            >
                                Work with Casa Dev
                            </Link>
                        </footer>
                    </div>
                </div>
            </article>
            <Footer />
        </>
    );
}
