import Footer from "../../../components/footer";
import HomeFollow from "../../../components/home-follow";
import LocationPageContent from "../../../components/LocationPageContent";

export default function IrvineSEO() {
  return (
    <>
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
