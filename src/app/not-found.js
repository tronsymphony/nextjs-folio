import Link from 'next/link';
import HomeFollow from '../components/home-follow';
import Footer from '../components/footer';

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <HomeFollow />
      <div className="bg-canvas text-ink min-h-[70vh] flex items-center px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl text-center py-36">
          <p className="font-mono text-sm text-accent mb-4">404</p>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-[-0.04em] mb-6">That page doesn&rsquo;t exist.</h1>
          <p className="text-muted mb-10">It may have moved when the site was reorganized. These are good places to start:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              ['/', 'Home'],
              ['/netsuite/', 'NetSuite services'],
              ['/work/', 'Case studies'],
              ['/netsuite-audit/', 'The integration audit'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="px-5 py-2.5 rounded-lg border border-line hover:bg-ink/5 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
