import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import HomeFollow from '../../../components/home-follow';
import { LAB_HEROES } from './heroes';

export const metadata = {
  title: 'Lab: homepage heroes',
  robots: { index: false, follow: false },
};

// Index of the homepage hero designs.
export default function LabHomeIndex() {
  return (
    <>
      <HomeFollow />
      <main className="mx-auto max-w-[1440px] px-4 sm:px-8 pt-36 pb-24">
        <h1 className="text-5xl font-medium tracking-[-0.045em]">Homepage heroes</h1>
        <ul className="mt-12 border-t border-line">
          {LAB_HEROES.map(({ id, name, note }, i) => (
            <li key={id}>
              <Link href={`/lab/home/${id}/`} className="group grid grid-cols-[3rem_1fr_auto] md:grid-cols-12 gap-4 items-baseline py-6 border-b border-line">
                <span className="font-mono text-xs text-faint">0{i + 1}</span>
                <span className="md:col-span-4 text-2xl font-medium tracking-[-0.03em] group-hover:text-accent transition-colors">{name}</span>
                <span className="hidden md:block md:col-span-6 text-muted">{note}</span>
                <ArrowUpRight className="row-start-1 col-start-3 md:col-start-12 justify-self-end w-5 h-5 text-faint group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
