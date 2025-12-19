import Footer from "../../../components/footer";
import HomeFollow from "../../../components/home-follow";
import LocationPageContent from "../../../components/LocationPageContent";

export default function LosAngelesSEO() {
  return (
    <>
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
  metadataBase: new URL("https://casa-dev.com"),
  alternates: {
    canonical: "/about/los-angeles",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: "Strategic Web Development & SEO Los Angeles | Casa Dev",
  description:
    "Partner with a senior Full-Stack expert in Los Angeles for strategic web development, custom AI integration, and technical SEO that delivers high-intent leads and measurable growth.",
  keywords:
    "Los Angeles web development, SEO services Los Angeles, custom software LA, digital strategy Los Angeles, AI integration Los Angeles",
};
