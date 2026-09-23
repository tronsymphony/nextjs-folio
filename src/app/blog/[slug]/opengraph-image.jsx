import { OG_SIZE, ogCard } from '../../../lib/ogImage';
import { posts } from '../../../data/posts';

export const alt = 'Blog post';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return ogCard({ eyebrow: `Blog · ${post?.category ?? 'Casa Dev'}`, title: post?.title ?? 'Casa Dev' });
}
