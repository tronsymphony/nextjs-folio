import Footer from "../../../components/footer";
import HomeFollow from "../../../components/home-follow";
import LocationPageContent from "../../../components/LocationPageContent";
import JsonLd from "../../../components/JsonLd";
import { ORG_ID, graph, url } from "../../../lib/schema";

export default function PortlandSEO() {
  const jsonLd = graph({
    '@type': 'Service',
    name: 'NetSuite integration and custom front-end engineering in Portland',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: 'Portland', containedInPlace: { '@type': 'State', name: 'OR' } },
    url: url('/about/portland/'),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeFollow />
      <LocationPageContent 
        city="Portland"
        region="The Pacific Northwest"
        introText="Thrive on innovation and creative local support with a digital presence that reflects Portland's unique culture."
        specificContext="Portland's market rewards authenticity and technical precision. I build high-performance websites that help local businesses and tech startups in PDX scale while maintaining their creative identity."
      />
      <Footer />
    </>
  );
}

export const metadata = {
  alternates: {
    canonical: "/about/portland/",
  },
  title: "NetSuite Integration & Front-End Engineering in Portland",
  description:
    "Scale your Portland-based business with expert technical strategy, custom web applications, and AI-driven SEO. Hand-crafted solutions for the Pacific Northwest's thriving tech scene.",
  keywords:
    "Portland web development, SEO services Portland, PDX tech strategy, custom software Portland, local SEO PDX",
};
