import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import Portfolio from "../../components/portfolio"
export default function Home() {
 
  return (  
      <>
        <HomeFollow></HomeFollow>
        <Portfolio></Portfolio>
        <Footer></Footer>
      </>
  );
}

export const metadata = {
  metadataBase: new URL('http://casa-dev.com'),
  alternates: {
    canonical: '/portfolio',
    languages: {
      'en-US': '/en-US',
    },
  },
  title: "Portfolio | Full-Stack Developer | WordPress, Laravel, ReactJS, PhP, JS, Shopify | Santa Monica, Los Angeles",
  description: "Discover premium web development services with Nitya Hoyos, a seasoned Full-Stack Developer based in Los Angeles. Skilled in WordPress, Laravel, ReactJS, NodeJS, and Shopify, I specialize in crafting bespoke digital solutions that drive business growth. Ready to elevate your online presence? Connect now for top-tier development projects tailored just for you.",
};