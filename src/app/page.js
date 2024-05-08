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
    title: "Nitya Hoyos | Full-Stack Developer | WordPress, Laravel, ReactJS, NodeJS, Shopify | 10+ Years Experience",
    description: "Experienced Full-Stack Freelance Developer proficient in WordPress, Laravel, ReactJS, NodeJS, and Shopify. Offering top-notch solutions tailored to your business needs. Available for hire or contract work. Let's bring your ideas to life and create exceptional web experiences together.",
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
  title: "Nitya Hoyos | Full-Stack Developer | WordPress, Laravel, ReactJS, NodeJS, Shopify | 10+ Years Experience",
  description: "Experienced Full-Stack Freelance Developer proficient in WordPress, Laravel, ReactJS, NodeJS, and Shopify. Offering top-notch solutions tailored to your business needs. Available for hire or contract work. Let's bring your ideas to life and create exceptional web experiences together.",
};