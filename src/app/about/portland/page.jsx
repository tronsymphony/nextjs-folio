import Footer from "../../../components/footer";
import HomeFollow from "../../../components/home-follow";
import LocationPageContent from "../../../components/LocationPageContent";

export default function PortlandSEO() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Casa Dev - Portland",
    "image": "https://casa-dev.com/images/logo2.webp",
    "@id": "https://casa-dev.com/about/portland",
    "url": "https://casa-dev.com/about/portland",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Portland",
      "addressRegion": "OR",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.5152,
      "longitude": -122.6784
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
  metadataBase: new URL("https://casa-dev.com"),
  alternates: {
    canonical: "/about/portland",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: "Strategic Web Development & SEO Portland | Casa Dev",
  description:
    "Scale your Portland-based business with expert technical strategy, custom web applications, and AI-driven SEO. Hand-crafted solutions for the Pacific Northwest's thriving tech scene.",
  keywords:
    "Portland web development, SEO services Portland, PDX tech strategy, custom software Portland, local SEO PDX",
};
