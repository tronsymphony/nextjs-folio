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
  metadataBase: new URL("https://casa-dev.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  robots: {
    index: true, // Allow indexing
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Casa Dev Web Design & Marketing | Santa Monica, Los Angeles",
    description:
      "Casa Dev is a Los Angeles-based Website Developer and Designer specializing in producing hand-coded websites. I focus on delivering ROI-driven solutions that efficiently and effectively grow your business.",
    url: "https://casa-dev.com",
    siteName: "Casa Dev",
    images: [
      {
        url: "https://casa-dev.com/images/og-image.jpg", // Update to your real OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  title:
    "Casa Dev: Custom Web Design & Digital Marketing | Marina Del Rey, Los Angeles",
  description:
    "Casa Dev is a Los Angeles-based web development and design agency specializing in custom, hand-coded websites. We craft visually stunning, high-performing websites that help businesses thrive online. Let us transform your digital presence today.",
  other: {
    keywords:
      "web design, digital marketing, Los Angeles web developer, custom websites, hand-coded websites, ROI-driven solutions, Casa Dev, Marina Del Rey",
  },
};
