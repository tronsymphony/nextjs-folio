// About Page
import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import About from "../../components/about";

export default function Home() {
  return (
    <>
      <HomeFollow />
      <About />
      <Footer />
    </>
  );
}

export const metadata = {
  metadataBase: new URL("https://casa-dev.com"),
  alternates: {
    canonical: "/about",
    languages: {
      "en-US": "/en-US",
    },
  },
  // 📢 UPDATED TITLE: Focus on Strategic Role and Expertise
  title: "About Nitya Hoyos | Full-Stack Digital Partner (Dev, Design, Marketing) | 10+ YOE",
  
  // 📢 UPDATED DESCRIPTION: Emphasizes the all-in-one strategic value and risk mitigation.
  description:
    "Meet your strategic digital partner. With 10+ years of holistic expertise in development, design, and marketing, I offer experienced companies an all-in-one solution. I build scalable, custom platforms that minimize vendor fragmentation, eliminate technical debt, and maximize long-term ROI.",
};