import Footer from '../../components/footer';
import HomeFollow from '../../components/home-follow';
import Portfolio from '../../components/portfolio';
import { publishedCaseStudies } from '../../data/caseStudies';

export const metadata = {
  title: 'Work: NetSuite, ERP & Front-End Case Studies',
  description:
    'Case studies from Nitya Hoyos: a NetSuite-connected digital showroom for Total Warehouse, data platforms, and headless commerce builds.',
  alternates: { canonical: '/work/' },
};

export default function WorkPage() {
  return (
    <>
      <HomeFollow />
      <Portfolio projects={publishedCaseStudies()} />
      <Footer />
    </>
  );
}
