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
  metadataBase: new URL('http://casa-dev.com'),
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
    title: "Casa Dev {Web Design & Marketing} | Santa Monica, Los Angeles",
    description: "Casa Dev is a Los Angeles based Website Developer and Designer specializing in producing hand coded websites . I focus on delivering ROI-driven solutions that efficiently and effectively grow your business.",
    url: 'http://casa-dev.com',
    siteName: 'Casa Dev',
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
  title: "Casa Dev {Web Design & Marketing} | Santa Monica, Los Angeles",
};