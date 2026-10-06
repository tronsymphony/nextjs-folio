import Link from 'next/link';
import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import BookCall from '../../components/BookCall';
import ContactForm from '../../components/ContactForm';
import { Eyebrow } from '../../components/ui/Cta';
import { CAL_LINK, PERSON } from '../../lib/site';

export const metadata = {
  title: 'Free 30-Minute Review: NetSuite, AI-Built Apps, SEO',
  description:
    'A free 30-minute review of your NetSuite setup, your app built with AI tools, or your site’s search. Share a link, we go through it together, and you leave knowing what to fix first.',
  alternates: { canonical: '/call/' },
};

const agenda = [
  ['Pick one', 'Your NetSuite integrations, an app built with Lovable, Bolt, Cursor or Claude Code, or your site and its search results.'],
  ['Before the call', 'Send a link or a short description. I look at it beforehand, so the 30 minutes go on your problem, not on introductions.'],
  ["What you'll leave with", "What I'd fix first and why, whether or not you hire me. If I'm not the right fit, I'll say who or what is."],
];

export default function CallPage() {
  return (
    <>
      <HomeFollow />
      <div className="bg-canvas text-ink min-h-screen">
        <section className="pt-36 pb-12 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            <Eyebrow>30 minutes · Free · Video call</Eyebrow>
            <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.04em] mt-6 mb-6">Book a free 30-minute review.</h1>
            <p className="text-lg text-muted max-w-2xl">
              You&rsquo;ll talk to me directly, {PERSON.name}, not a sales rep. {PERSON.yearsExperience} years of
              engineering across NetSuite integrations, app security and technical SEO.
            </p>
            <dl className="grid md:grid-cols-3 gap-6 mt-12">
              {agenda.map(([title, body]) => (
                <div key={title} className="p-6 rounded-xl border border-line bg-canvas-2">
                  <dt className="font-semibold text-ink mb-2">{title}</dt>
                  <dd className="text-sm text-muted leading-relaxed">{body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="pb-24 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            {CAL_LINK ? (
              <>
                <div className="rounded-xl border border-line overflow-hidden bg-canvas-2">
                  <BookCall calLink={CAL_LINK} />
                </div>
                <p className="mt-4 text-sm text-muted">
                  Calendar not loading?{' '}
                  <a href={`https://cal.com/${CAL_LINK}`} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                    Open the booking page directly
                  </a>
                  .
                </p>
              </>
            ) : (
              <>
                <p className="text-muted mb-6">
                  Tell me what you&rsquo;d like reviewed (a link helps) and I&rsquo;ll reply within one business day with times that work.
                </p>
                <ContactForm source="contact" />
              </>
            )}
            <p className="mt-8 text-sm text-muted">
              Already know you want a written assessment? See the fixed-price{' '}
              <Link href="/netsuite-audit/" className="text-accent underline">NetSuite audit</Link>,{' '}
              <Link href="/ai-app-audit/" className="text-accent underline">app audit</Link> or{' '}
              <Link href="/seo/technical-seo-audit/" className="text-accent underline">SEO audit</Link>.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
