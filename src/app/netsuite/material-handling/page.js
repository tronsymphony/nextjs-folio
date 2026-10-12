import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import IndustrialLogisticsService from '../../../components/IndustrialLogisticsService';

export const metadata = {
  title: 'NetSuite for Material Handling, Logistics & Industrial Distribution',
  description:
    'Custom web platforms, NetSuite ERP integrations, equipment rental engines, and CoStar lead automation systems built for material handling, warehousing, and industrial logistics leaders.',
  keywords: [
    'Material Handling web development',
    'NetSuite ERP portal developer',
    'CoStar lead automation',
    'Forklift equipment rental portal',
    'Industrial B2B ecommerce',
    'Warehouse logistics software integration',
    'Custom RFQ quote builder',
  ],
  alternates: {
    canonical: '/netsuite/material-handling/',
  },
  openGraph: {
    title: 'NetSuite Portals & Integrations for Material Handling & Logistics',
    description:
      'Turn commercial real estate expansion signals into high-ticket equipment deals. Custom NetSuite integrations and B2B portals for industrial leaders.',
    url: '/netsuite/material-handling/',
    siteName: 'Casa Dev',
    type: 'website',
  },
};

export default function IndustrialLogisticsPage() {
  return (
    <>
      <HomeFollow />
      <IndustrialLogisticsService />
      <Footer />
    </>
  );
}
