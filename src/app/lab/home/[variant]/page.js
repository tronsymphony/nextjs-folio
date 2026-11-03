import { notFound } from 'next/navigation';
import HomeFollow from '../../../../components/home-follow';
import HomeMain from '../../../../components/home-main';
import Footer from '../../../../components/footer';
import LabSwitcher from '../LabSwitcher';
import { LAB_HEROES } from '../heroes';

// Design test pages: the homepage with each hero design. Not linked, not in
// the sitemap, and kept out of search results.
export function generateStaticParams() {
  return LAB_HEROES.map(({ id }) => ({ variant: id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { variant } = await params;
  const hero = LAB_HEROES.find((h) => h.id === variant);
  return { title: `Lab: ${hero?.name ?? 'hero'}`, robots: { index: false, follow: false } };
}

export default async function LabHome({ params }) {
  const { variant } = await params;
  if (!LAB_HEROES.some((h) => h.id === variant)) notFound();
  return (
    <>
      <HomeFollow />
      <HomeMain hero={variant} />
      <Footer />
      <LabSwitcher current={variant} />
    </>
  );
}
