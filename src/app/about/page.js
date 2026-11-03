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
  alternates: {
    canonical: "/about/",
  },
  title: "About Nitya Hoyos: NetSuite & Front-End Engineer",
  description:
    "Nitya Hoyos is a Los Angeles-based software engineer with 15 years of experience: Oracle NetSuite integrations and portals, product development, maps and data products, Shopify, WordPress, accessibility, and front ends in Next.js, React, and Angular.",
};