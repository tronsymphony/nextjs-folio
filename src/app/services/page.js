import Footer from '../../components/footer';
import HomeFollow from '../../components/home-follow';
import Services from '../../components/services';

export const metadata = {
  title: 'Capabilities: NetSuite, Front-End & Web Engineering',
  description:
    'Oracle NetSuite integrations and portals, product development, SEO, Shopify and WordPress, ADA and WCAG accessibility, maps and data products, offline-capable apps, and custom React, Next.js and Angular applications.',
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  return (
    <>
      <HomeFollow />
      <Services />
      <Footer />
    </>
  );
}
