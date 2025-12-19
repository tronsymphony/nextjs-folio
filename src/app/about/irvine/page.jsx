import Footer from "../../../components/footer";
import HomeFollow from "../../../components/home-follow";
import LocationPageContent from "../../../components/LocationPageContent";

export default function IrvineSEO() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Casa Dev - Irvine",
    "image": "https://casa-dev.com/images/logo2.webp",
    "@id": "https://casa-dev.com/about/irvine",
    "url": "https://casa-dev.com/about/irvine",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Irvine",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.6846,
      "longitude": -117.8265
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://github.com/tronsymphony"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
  metadataBase: new URL("https://casa-dev.com"),
  alternates: {
    canonical: "/about/irvine",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: "Strategic Web Development & SEO Irvine | Casa Dev",
  description:
    "Expert technical solutions for Irvine's enterprise and innovation sectors. Custom web development, AI integration, and results-driven SEO for Orange County leaders.",
  keywords:
    "Irvine web development, SEO services Irvine, Orange County digital strategy, tech partner Irvine, OC custom software",
};
