import HomeFollow from '../../../components/home-follow';
import HomeMain from '../../../components/home-main';
import Footer from '../../../components/footer';

// Design test page: the homepage with the order-sync hero. Not linked, not in
// the sitemap, and kept out of search results.
export const metadata = {
  title: 'Lab: sync hero',
  robots: { index: false, follow: false },
};

export default function LabHeroSync() {
  return (
    <>
      <HomeFollow />
      <HomeMain hero="sync" />

      <Footer />
    </>
  );
}
