import Footer from "../../../components/footer";
import HomeFollow from "../../../components/home-follow";
import LocationPageContent from "../../../components/LocationPageContent";
import JsonLd from "../../../components/JsonLd";
import { ORG_ID, graph, url } from "../../../lib/schema";

export default function IrvineSEO() {
  const jsonLd = graph({
    '@type': 'Service',
    name: 'NetSuite integration and custom front-end engineering in Irvine',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: 'Irvine', containedInPlace: { '@type': 'State', name: 'CA' } },
    url: url('/about/irvine/'),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeFollow />
      <LocationPageContent 
        city="Irvine"
        region="Orange County"
        introText="Maximize your online visibility and drive success in Irvine's booming innovation and business-friendly environment."
        specificContext="Irvine is a powerhouse of tech and professional services. I deliver enterprise-grade technology and strategic design to help Orange County companies capture high-value market share."
      />
      <Footer />
    </>
  );
}

export const metadata = {
  alternates: {
    canonical: "/about/irvine/",
  },
  title: "NetSuite Integration & Front-End Engineering in Irvine",
  description:
    "Expert technical solutions for Irvine's enterprise and innovation sectors. Custom web development, AI integration, and results-driven SEO for Orange County leaders.",
  keywords:
    "Irvine web development, SEO services Irvine, Orange County digital strategy, tech partner Irvine, OC custom software",
};
