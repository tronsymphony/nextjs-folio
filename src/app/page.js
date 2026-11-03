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
    absolute: "Casa Dev: AI Integrations, Data Products & Systems Integration",
  },
  description:
    "AI assistants connected to your business tools, data turned into maps and pages people search for, and integrations that keep your systems in sync. From a Los Angeles engineer with 15 years of experience; it starts with a free call.",
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
    title: "Your tools, your data, and AI that works with both",
    description:
      "AI connected to your business tools, data products and maps, and systems integration from one senior engineer. It starts with a free call.",
    url: "/",
    type: "website",
  },
};
