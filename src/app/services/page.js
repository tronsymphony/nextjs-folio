import Footer from '../../components/footer';
import HomeFollow from '../../components/home-follow';
import Services from '../../components/services';

export const metadata = {
  title: 'Capabilities: NetSuite, App Audits, SEO & Web Engineering',
  description:
    'Oracle NetSuite integrations and portals, audits for apps built with AI, technical SEO, offline-first field apps, WordPress, analytics and lead tracking, accessibility, maps and data products, and custom React, Next.js and Angular applications.',
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
