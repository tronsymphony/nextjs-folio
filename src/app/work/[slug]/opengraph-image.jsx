import { OG_SIZE, ogCard } from '../../../lib/ogImage';
import { getCaseStudy, publishedCaseStudies } from '../../../data/caseStudies';

export const alt = 'Case study';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return publishedCaseStudies().map(({ slug }) => ({ slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return ogCard({ eyebrow: `Case study · ${cs?.client ?? 'Casa Dev'}`, title: cs?.title ?? 'Case study' });
}
