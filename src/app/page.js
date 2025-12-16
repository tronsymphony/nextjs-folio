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
    index: true,
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
    // 📢 OPEN GRAPH TITLE: Focus on Expertise and Strategy
    title: "Casa Dev: Strategic Digital Partner | 10+ YOE in Dev, Design, & Marketing",
    // 📢 OPEN GRAPH DESCRIPTION: Anti-AI/Strategic Value
    description:
      "Avoid technical debt from AI boilerplate. I am your strategic partner, delivering custom, hand-coded platforms built for long-term ROI and guaranteed scalability. 10+ years of holistic expertise.",
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
  // 📢 MAIN TITLE: High-Value, Specialized Positioning
  title:
    "Casa Dev: Senior Full-Stack Developer | React, Angular, NetSuite & WordPress Expert",
  // 📢 MAIN DESCRIPTION: Specific tech stack + strategic value
  description:
    "Senior developer with 10+ years specializing in React, Angular, NetSuite ERP, and WordPress. I deliver custom high-performance platforms and data-driven UX design backed by advanced analytics (PostHog, Mixpanel, GA4).",
  // 📢 KEYWORDS: Targeted tech stack and roles
  keywords: [
    "NetSuite developer",
    "Angular expert",
    "React developer",
    "WordPress development",
    "PostHog analytics",
    "Mixpanel expert",
    "Google Analytics 4",
    "custom SaaS development",
    "ERP integration",
    "technical strategy"
  ],
};
