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
    absolute: "Casa Dev: Oracle NetSuite Integration & Custom Front-End Engineering",
  },
  description:
    "NetSuite integrations, customer portals, and ERP-connected storefronts, built by a senior engineer with 15 years of experience. Start with a fixed-price NetSuite integration audit.",
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
    title: "NetSuite, connected to the front ends your customers actually use",
    description:
      "Oracle NetSuite integrations, customer portals, and ERP-connected storefronts. 15 years of engineering. Start with a fixed-price integration audit.",
    url: "/",
    type: "website",
  },
};
