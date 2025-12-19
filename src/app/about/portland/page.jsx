import Footer from "../../../components/footer";
import HomeFollow from "../../../components/home-follow";
import LocationPageContent from "../../../components/LocationPageContent";

export default function PortlandSEO() {
  return (
    <>
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
