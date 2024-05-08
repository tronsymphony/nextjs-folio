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

export const metadata = {
  metadataBase: new URL('https://wordpresspro.biz'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Nitya Hoyos | Full-Stack Developer | WordPress, Laravel, ReactJS, PhP, JS, Shopify | Santa Monica, Los Angeles",
    description: "Discover premium web development services with Nitya Hoyos, a seasoned Full-Stack Developer based in Los Angeles. Skilled in WordPress, Laravel, ReactJS, NodeJS, and Shopify, I specialize in crafting bespoke digital solutions that drive business growth. Ready to elevate your online presence? Connect now for top-tier development projects tailored just for you.",
    url: 'https://wordpresspro.biz',
    siteName: 'Nitya Hoyos',
    images: [
      {
        url: 'https://nextjs.org/images/og.jpg', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  title: "Nitya Hoyos | Full-Stack Developer | WordPress, Laravel, ReactJS, PhP, JS, Shopify | Santa Monica, Los Angeles",
  description: "Discover premium web development services with Nitya Hoyos, a seasoned Full-Stack Developer based in Los Angeles. Skilled in WordPress, Laravel, ReactJS, NodeJS, and Shopify, I specialize in crafting bespoke digital solutions that drive business growth. Ready to elevate your online presence? Connect now for top-tier development projects tailored just for you.",
};