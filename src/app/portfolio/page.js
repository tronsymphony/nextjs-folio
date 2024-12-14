import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import Portfolio from "../../components/portfolio";

export default function Home() {
  return (
    <>
      <HomeFollow />
      <Portfolio />
      <Footer />
    </>
  );
}

export const metadata = {
  metadataBase: new URL("https://casa-dev.com"),
  alternates: {
    canonical: "/portfolio",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: "Portfolio | Full-Stack Developer | WordPress, Laravel, ReactJS, PHP, NodeJS, Shopify | Santa Monica & Los Angeles",
  description:
    "Explore the portfolio of Nitya Hoyos, a Los Angeles-based Full-Stack Developer. Skilled in WordPress, Laravel, ReactJS, NodeJS, and Shopify, I craft bespoke digital solutions to help businesses grow. Discover top-tier projects and innovative web solutions designed for success.",
};
