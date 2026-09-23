import HomeFollow from '../../../components/home-follow';
import Footer from '../../../components/footer';
import IndustrialLogisticsService from '../../../components/IndustrialLogisticsService';

export const metadata = {
  metadataBase: new URL('https://casa-dev.com'),
  title: 'Logistics, Material Handling & ERP Systems | Casa Dev',
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
    canonical: '/services/industrial-logistics',
  },
  openGraph: {
    title: 'Enterprise Web & ERP Platforms for Material Handling & Logistics | Casa Dev',
    description:
      'Turn commercial real estate expansion signals into high-ticket equipment deals. Custom NetSuite integrations and B2B portals for industrial leaders.',
    url: 'https://casa-dev.com/services/industrial-logistics',
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
