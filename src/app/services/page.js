import Footer from '../../components/footer';
import HomeFollow from '../../components/home-follow';
import Services from '../../components/services';

export const metadata = {
  title: 'Capabilities: NetSuite, Front-End & Web Engineering',
  description:
    'Oracle NetSuite integrations, customer portals, and ERP-connected storefronts, plus custom web applications, headless commerce, performance, accessibility, and analytics work.',
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
