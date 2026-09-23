import Footer from "../../../components/footer";
import HomeFollow from "../../../components/home-follow";
import LocationPageContent from "../../../components/LocationPageContent";
import JsonLd from "../../../components/JsonLd";
import { ORG_ID, graph, url } from "../../../lib/schema";

export default function LosAngelesSEO() {
  const jsonLd = graph({
    '@type': 'Service',
    name: 'NetSuite integration and custom front-end engineering in Los Angeles',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'CA' } },
    url: url('/about/los-angeles/'),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeFollow />
      <LocationPageContent 
        city="Los Angeles"
        region="Southern California"
        introText="Drive traffic, boost visibility, and maximize your online success in the world's most creative competitive hub."
        specificContext="At Casa Dev, I specialize in delivering tailored digital solutions for businesses across Los Angeles. From beach-side startups in Santa Monica to enterprise firms in Downtown, I ensure your platform stands out."
      />
      <Footer />
    </>
  );
}

export const metadata = {
  alternates: {
    canonical: "/about/los-angeles/",
  },
  title: "NetSuite Integration & Front-End Engineering in Los Angeles",
  description:
    "Partner with a senior Full-Stack expert in Los Angeles for strategic web development, custom AI integration, and technical SEO that delivers high-intent leads and measurable growth.",
  keywords:
    "Los Angeles web development, SEO services Los Angeles, custom software LA, digital strategy Los Angeles, AI integration Los Angeles",
};
