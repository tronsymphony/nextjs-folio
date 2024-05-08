// About
import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import About from "../../components/about"
export default function Home() {
  return (
    <>
      <HomeFollow></HomeFollow>
      <About></About>
      <Footer></Footer>
    </>
  );
}

export const metadata = {
  metadataBase: new URL('https://wordpresspro.biz'),
  alternates: {
    canonical: '/about',
    languages: {
      'en-US': '/en-US',
    },
  },
  title: "About Nitya Hoyos | Experienced Full-Stack Developer | Los Angeles",
  description: "Learn more about Nitya Hoyos, a dedicated full-stack developer based in Los Angeles with over 10 years of experience in building robust web and app solutions. Discover my journey and professional philosophy."
};