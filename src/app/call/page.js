import Link from 'next/link';
import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import BookCall from '../../components/BookCall';
import ContactForm from '../../components/ContactForm';
import { Eyebrow } from '../../components/ui/Cta';
import { CAL_LINK, PERSON } from '../../lib/site';

export const metadata = {
  title: 'Book a NetSuite Fit Call',
  description:
    'A free 20-minute call to find out whether your NetSuite integration, customer portal, or ERP-connected storefront is a fit. No pitch deck, just your systems and the problem.',
  alternates: { canonical: '/call/' },
};

const agenda = [
  ['Who this is for', 'Teams running Oracle NetSuite who need it connected to a storefront, customer portal, 3PL, or internal tool, or who have an integration that keeps breaking.'],
  ["What we'll cover", 'Which systems are involved, where data stops flowing, and what a good outcome looks like in 90 days.'],
  ["What you'll leave with", "A straight answer on whether I'm the right fit, and if not, who or what is."],
];

export default function CallPage() {
  return (
    <>
      <HomeFollow />
      <div className="bg-[#0a0a0a] text-white min-h-screen">
        <section className="pt-36 pb-12 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            <Eyebrow>20 minutes · Free · Video call</Eyebrow>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-6 mb-6">Book a NetSuite fit call.</h1>
            <p className="text-lg text-neutral-400 max-w-2xl">
              You&rsquo;ll talk to me directly, {PERSON.name}, not a sales rep. {PERSON.yearsExperience} years of
              engineering, focused on connecting Oracle NetSuite to the front ends customers and staff actually use.
            </p>
            <dl className="grid md:grid-cols-3 gap-6 mt-12">
              {agenda.map(([title, body]) => (
                <div key={title} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40">
                  <dt className="font-semibold text-white mb-2">{title}</dt>
                  <dd className="text-sm text-neutral-400 leading-relaxed">{body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="pb-24 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            {CAL_LINK ? (
              <>
                <div className="rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950">
                  <BookCall calLink={CAL_LINK} />
                </div>
                <p className="mt-4 text-sm text-neutral-500">
                  Calendar not loading?{' '}
                  <a href={`https://cal.com/${CAL_LINK}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    Open the booking page directly
                  </a>
                  .
                </p>
              </>
            ) : (
              <>
                <p className="text-neutral-400 mb-6">
                  Tell me a little about your setup and I&rsquo;ll reply within one business day with times that work.
                </p>
                <ContactForm source="contact" />
              </>
            )}
            <p className="mt-8 text-sm text-neutral-500">
              Already know you want a written assessment?{' '}
              <Link href="/netsuite-audit/" className="text-blue-400 underline">
                See the NetSuite Integration Audit
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
