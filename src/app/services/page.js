import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import Services from "../../components/services"
export default function Home() {
  return (
    <>
      <HomeFollow></HomeFollow>
      <Services></Services>
      <Footer></Footer>
    </>
  );
}

export const metadata = {
  metadataBase: new URL('http://casa-dev.com'),
  alternates: {
    canonical: '/services',
    languages: {
      'en-US': '/en-US',
    },
  },
  title: "Services | Full-Stack Developer | WordPress, Laravel, ReactJS, PhP, JS, Shopify | Santa Monica, Los Angeles",
  description: "Discover premium web development services with Nitya Hoyos, a seasoned Full-Stack Developer based in Los Angeles. Skilled in WordPress, Laravel, ReactJS, NodeJS, and Shopify, I specialize in crafting bespoke digital solutions that drive business growth. Ready to elevate your online presence? Connect now for top-tier development projects tailored just for you.",
};