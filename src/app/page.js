import HomeFollow from "../components/home-follow";
import HomeMain from "../components/home-main";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <HomeFollow></HomeFollow>
      <HomeMain></HomeMain>
      <Footer></Footer>
    </>
  );
}

// The OG image comes from src/app/opengraph-image.jsx.
export const metadata = {
  title: {
    absolute: "Casa Dev: NetSuite Integrations, AI App Audits & Technical SEO",
  },
  description:
    "NetSuite integrations, security audits for apps built with AI tools, and technical SEO, from a senior engineer with 15 years of experience. Each starts with a fixed-price audit.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Systems that agree, apps that hold up, sites that get found",
    description:
      "NetSuite integrations, AI-built app audits and technical SEO from one senior engineer. Each starts with a fixed-price audit.",
    url: "/",
    type: "website",
  },
};
