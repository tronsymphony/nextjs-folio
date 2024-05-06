import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import Pricing from "../../components/pricing"
export default function Home() {
 
  return (  
      <>
        <HomeFollow></HomeFollow>
        <Pricing></Pricing>
        <Footer></Footer>
      </>
  );
}

export const metadata = {
  title: "Pricing Plans | Nitya Hoyos Full-Stack Development Services",
  description: "Affordable pricing plans for top-tier web and app development services. Get cost-effective solutions without compromising on quality. Explore packages suited for various budgets and projects."
};