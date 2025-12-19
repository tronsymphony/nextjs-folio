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
  metadataBase: new URL("https://casa-dev.com"),
  alternates: {
    canonical: '/services',
    languages: {
      'en-US': '/en-US',
    },
  },
  // 📢 UPDATED TITLE: Focus on Strategic Solutions and Risk Mitigation
  title: "Services | Strategic Web Development & AI Integration | Full-Stack Partner",

  // 📢 UPDATED DESCRIPTION: Emphasizes expertise, holistic skills, and strategic AI integration.
  description: "Explore strategic, hand-crafted digital solutions by a Full-Stack Partner with 10+ years in Dev, Design, and Marketing. I specialize in high-performance web development and strategic AI integration that minimizes technical debt and maximizes ROI. Invest in a foundation built for growth.",

  // You might want to update the openGraph data here as well, mirroring the Title/Description:
  openGraph: {
    title: "Services | Strategic Web Development & AI Integration | Full-Stack Partner",
    description: "Explore strategic, hand-crafted digital solutions by a Full-Stack Partner with 10+ years in Dev, Design, and Marketing. I specialize in high-performance web development and strategic AI integration that minimizes technical debt and maximizes ROI.",
    url: 'https://casa-dev.com/services',
    siteName: 'Casa Dev',
    // ... other openGraph fields
  }
};