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
  title: "About | Full-Stack Developer | WordPress, Laravel, ReactJS, PHP, NodeJS, Shopify | Santa Monica & Los Angeles",
  description:
    "Explore world-class web development and design with Nitya Hoyos, a Los Angeles-based Full-Stack Developer. Specializing in WordPress, Laravel, ReactJS, NodeJS, and Shopify, I craft tailored digital solutions to elevate your business. Let's create something extraordinary—contact me today!",
};
