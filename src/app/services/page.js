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
  title: "Services | Strategic Web Development & Risk Mitigation | Full-Stack Partner",
  
  // 📢 UPDATED DESCRIPTION: Emphasizes expertise, holistic skills, and the anti-AI stance.
  description: "Explore strategic, hand-crafted digital solutions by a Full-Stack Partner with 10+ years in Dev, Design, and Marketing. I build clean, scalable platforms (React, Laravel, WordPress) that minimize technical debt and maximize long-term ROI. Stop relying on AI boilerplate—invest in a strategic foundation.",
  
  // You might want to update the openGraph data here as well, mirroring the Title/Description:
  openGraph: {
      title: "Services | Strategic Web Development & Risk Mitigation | Full-Stack Partner",
      description: "Explore strategic, hand-crafted digital solutions by a Full-Stack Partner with 10+ years in Dev, Design, and Marketing. I build clean, scalable platforms (React, Laravel, WordPress) that minimize technical debt and maximize long-term ROI. Stop relying on AI boilerplate—invest in a strategic foundation.",
      url: 'https://casa-dev.com/services',
      siteName: 'Casa Dev',
      // ... other openGraph fields
  }
};