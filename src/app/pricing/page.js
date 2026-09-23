import Footer from '../../components/footer';
import HomeFollow from '../../components/home-follow';
import Pricing from '../../components/pricing';

export const metadata = {
  title: 'Pricing: Audit, Implementation, Retainer',
  description:
    'How NetSuite integration engagements work: a fixed-price integration audit, fixed-scope implementation projects, and monthly retainers for ongoing ERP and front-end work.',
  alternates: { canonical: '/pricing/' },
};

export default function PricingPage() {
  return (
    <>
      <HomeFollow />
      <Pricing />
      <Footer />
    </>
  );
}
