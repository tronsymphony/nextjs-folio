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
    title: "Nitya Hoyos Software Engineer | WordPress, Laravel, ReactJS, PhP, JS, Shopify | Santa Monica, Los Angeles",
    description: "Nitya Hoyos is an experienced Full-Stack Developer from Los Angeles, specializing in WordPress, Laravel, ReactJS, NodeJS, and Shopify. I focus on creating custom digital solutions to help grow your business. Looking to boost your online presence? Get in touch for personalized development services.",
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
  title: "Nitya Hoyos Software Engineer | WordPress, Laravel, ReactJS, PhP, JS, Shopify | Santa Monica, Los Angeles",
  description: "Nitya Hoyos is an experienced Full-Stack Developer from Los Angeles, specializing in WordPress, Laravel, ReactJS, NodeJS, and Shopify. I focus on creating custom digital solutions to help grow your business. Looking to boost your online presence? Get in touch for personalized development services.",
};