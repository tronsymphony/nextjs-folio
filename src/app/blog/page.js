import Link from 'next/link';
import { posts } from '../../data/posts';
import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

export const metadata = {
    title: "Blog | Casa Dev - AI & Web Development Insights",
    description: "Stay ahead of the curve with our latest insights on AI for business, high-performance web development, and digital strategy.",
};

export default function BlogIndex() {
    return (
        <>
            <HomeFollow />
            <main className="pt-32 pb-20 bg-[#050505] min-h-screen">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto mb-16">
                        <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tighter">
                            INSIGHTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">&</span> STRATEGY.
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed">
                            In-depth articles on how AI and modern web technology can drive
                            <span className="text-white"> measurable growth</span> for your business.
                        </p>
                    </div>

                    <div className="grid gap-12 max-w-5xl mx-auto">
                        {posts.map((post) => (
                            <article
                                key={post.slug}
                                className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300"
                            >
                                <div className="grid md:grid-cols-2 gap-8 items-center p-8">
                                    <div className="relative aspect-[16/9] md:aspect-square overflow-hidden rounded-xl bg-neutral-900">
                                        {/* Placeholder for images - ideally use the actually generated images */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Tag className="w-12 h-12 text-white/10" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-4 mb-4">
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

                                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                            <Link href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h2>

                                        <p className="text-gray-400 mb-8 line-clamp-2">
                                            {post.description}
                                        </p>

                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-white font-bold group/link"
                                        >
                                            Read Article
                                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
