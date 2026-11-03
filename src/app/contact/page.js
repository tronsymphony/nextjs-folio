import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import Contact from "../../components/contact";

export default function Home() {
  return (
      <>
        <HomeFollow></HomeFollow>
        <Contact></Contact>
        <Footer></Footer>
      </>
  );
}

export const metadata = {
  alternates: {
    canonical: '/contact/',
  },
  title: "Contact",
  description: "Get in touch about a NetSuite integration, customer portal, or ERP-connected storefront. I reply personally within one business day.",
};