import Footer from '../../components/footer';
import HomeFollow from '../../components/home-follow';
import { WorkGrid } from '../../components/section/FeaturedProjects';
import { Accent } from '../../components/ui/Cta';
import { PageHero, WRAP } from '../../components/ui/Page';
import { publishedCaseStudies } from '../../data/caseStudies';

export const metadata = {
  title: 'Work: NetSuite, ERP & Front-End Case Studies',
  description:
    'Case studies from Nitya Hoyos: a NetSuite-connected digital showroom for Total Warehouse, data platforms, and headless commerce builds.',
  alternates: { canonical: '/work/' },
};

export default function WorkPage() {
  const projects = publishedCaseStudies();
  return (
    <>
      <HomeFollow />
      <div className="bg-ink">
        <PageHero
          back={['/', 'Home']}
          eyebrow={`${projects.length} case studies`}
          title={<>Selected work, <Accent>start to finish.</Accent></>}
          lede="NetSuite-connected showrooms, public data platforms, and headless storefronts. Each case study covers the problem, the approach, and what was built."
        />
        <section className={`${WRAP} pb-28 md:pb-40`}>
          <div className="border-t border-line pt-14">
            <WorkGrid projects={projects} />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
