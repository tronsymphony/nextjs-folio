import Footer from '../../components/footer';
import HomeFollow from '../../components/home-follow';
import Pricing from '../../components/pricing';
import { OFFERS, formatUSD } from '../../lib/site';

const { audit, appAudit, seoAudit } = OFFERS;

export const metadata = {
  title: `Pricing: Free Review, Audits From ${formatUSD(Math.min(audit.price, appAudit.price, seoAudit.price))}, Projects, Retainers`,
  description: `Start with a free 30-minute review. Fixed-price audits: NetSuite integrations ${formatUSD(audit.price)}, apps built with AI ${formatUSD(appAudit.price)}, technical SEO ${formatUSD(seoAudit.price)}. Then fixed-scope projects and monthly retainers.`,
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
