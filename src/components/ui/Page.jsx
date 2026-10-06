import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Plus } from 'lucide-react';

// Shared layout pieces for inner pages, in the same editorial style as the
// homepage: wide wrapper, mono labels, hairlines, lists instead of boxes.

export const WRAP = 'mx-auto max-w-[1440px] px-4 sm:px-8';

// "2026-10-05" → "October 5, 2026", fixed to UTC so the build machine's zone can't shift the day.
export const formatDay = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });

const LABEL = 'font-mono text-[11px] uppercase tracking-[0.18em]';

/**
 * Page opening: back link, eyebrow, oversized title, lede and an optional
 * row of facts under a hairline.
 * `size="md"` suits long sentence titles such as guide headlines.
 * @param {{ back?: [string, string], eyebrow?: import('react').ReactNode, title: import('react').ReactNode, lede?: import('react').ReactNode, facts?: [string, import('react').ReactNode][], size?: 'lg' | 'md', children?: import('react').ReactNode }} props
 */
export function PageHero({ back, eyebrow, title, lede, facts, size = 'lg', children }) {
  const titleSize =
    size === 'md'
      ? 'max-w-[24ch] text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.045em]'
      : 'max-w-[18ch] text-[clamp(2.75rem,6.6vw,6.5rem)] leading-[0.94] tracking-[-0.05em]';
  return (
    <header className={`${WRAP} pt-36 md:pt-44 pb-16 md:pb-24`}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12 md:mb-20 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
        {back ? (
          <Link href={back[0]} className={`group inline-flex items-center gap-2 ${LABEL} text-muted hover:text-ink transition-colors`}>
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> {back[1]}
          </Link>
        ) : (
          <span />
        )}
        {eyebrow && (
          <span className={`inline-flex items-center gap-2.5 ${LABEL} text-muted`}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
      </div>
      <h1 className={`${titleSize} font-medium opacity-0 animate-[fadeInUp_1s_ease-out_0.1s_forwards]`}>
        {title}
      </h1>
      {(lede || children) && (
        <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-10 opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
          {lede && <p className="lg:col-span-7 text-xl md:text-2xl text-muted leading-[1.4] tracking-[-0.01em]">{lede}</p>}
          {children && <div className="lg:col-span-4 lg:col-start-9 flex flex-wrap items-start gap-3">{children}</div>}
        </div>
      )}
      {facts?.length > 0 && (
        <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-line opacity-0 animate-[fadeInUp_1s_ease-out_0.45s_forwards]">
          {facts.map(([label, value]) => (
            <div key={label} className="pt-5 pr-6 pb-2">
              <dt className={`${LABEL} text-faint mb-2`}>{label}</dt>
              <dd className="text-[15px] text-ink leading-snug">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}

/**
 * A section with its label in a narrow left column and content on the right.
 * @param {{ label: string, index?: string, title?: import('react').ReactNode, id?: string, children?: import('react').ReactNode, wide?: boolean }} props
 */
export function Block({ label, index, title, id, children, wide = false }) {
  return (
    <section id={id} className={`${WRAP} scroll-mt-28`}>
      <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 border-t border-line pt-8 pb-20 md:pb-28">
        <div className="lg:col-span-3" data-reveal>
          <p className={`${LABEL} text-muted lg:sticky lg:top-28`}>
            {index && <span className="text-faint mr-3">({index})</span>}
            {label}
          </p>
        </div>
        <div className={wide ? 'lg:col-span-9' : 'lg:col-span-8'} data-reveal>
          {title && <h2 className="mb-10 text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.02] tracking-[-0.035em] max-w-3xl">{title}</h2>}
          {children}
        </div>
      </div>
    </section>
  );
}

// Body copy for long paragraphs inside a Block.
export function Prose({ paragraphs }) {
  return (
    <div className="space-y-6 text-lg md:text-xl text-ink/85 leading-[1.6] tracking-[-0.005em] max-w-3xl">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 48)}>{p}</p>
      ))}
    </div>
  );
}

/**
 * Hairline table. `columns` are header labels; `rows` are arrays of cells.
 * The first cell of each row is emphasised.
 * @param {{ columns: string[], rows: import('react').ReactNode[][], mono?: number[] }} props
 */
export function DataTable({ columns, rows, mono = [] }) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[560px] text-left">
        <thead>
          <tr className="border-b border-line">
            {columns.map((c) => (
              <th key={c} className={`${LABEL} font-normal text-faint py-4 pr-6`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-line align-top">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`py-5 pr-6 leading-relaxed ${
                    mono.includes(c) ? 'font-mono text-[13px]' : 'text-[15px]'
                  } ${c === 0 ? 'text-ink font-medium' : 'text-muted'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Numbered rows of short statements (gotchas, symptoms, deliverables).
export function NumberedList({ items, tone = 'paper' }) {
  return (
    <ol className="border-t border-line">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 py-6 border-b border-line">
          <span className={`font-mono text-xs pt-1.5 ${tone === 'accent' ? 'text-accent' : 'text-faint'}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="text-lg leading-relaxed text-ink/85">{item}</div>
        </li>
      ))}
    </ol>
  );
}

// Questions as an accordion. Answers stay in the HTML (inside <details>), so
// search engines and the FAQ structured data see the same text.
export function FaqList({ faqs }) {
  return (
    <div className="border-t border-line">
      {faqs.map(({ q, a }) => (
        <details key={q} className="group border-b border-line">
          <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="text-lg md:text-xl font-medium tracking-[-0.02em]">{q}</span>
            <Plus className="w-5 h-5 shrink-0 mt-1 text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-accent" />
          </summary>
          <p className="pb-7 pr-10 text-muted leading-relaxed max-w-3xl">{a}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * Rows of links with a tag and an arrow.
 * @param {{ items: { href: string, title: import('react').ReactNode, tag?: string, body?: string }[] }} props
 */
export function LinkRows({ items }) {
  return (
    <ul className="border-t border-line">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="group grid grid-cols-[1fr_auto] gap-6 py-6 border-b border-line">
            <span>
              {item.tag && <span className={`block ${LABEL} text-faint mb-2`}>{item.tag}</span>}
              <span className="block text-xl md:text-2xl font-medium tracking-[-0.025em] leading-tight transition-colors group-hover:text-ink text-ink/90">
                {item.title}
              </span>
              {item.body && <span className="block mt-2 text-muted leading-relaxed max-w-2xl">{item.body}</span>}
            </span>
            <ArrowUpRight className="w-5 h-5 mt-1 text-faint transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

// A large closing statement in a soft panel (e.g. "When not to do this").
export function Callout({ label, children }) {
  return (
    <div className="rounded-3xl bg-canvas-2 border border-line p-8 md:p-12">
      <p className={`${LABEL} text-accent mb-6`}>{label}</p>
      <p className="text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-[1.25] tracking-[-0.025em] text-ink/90">{children}</p>
    </div>
  );
}

/**
 * Closing call to action for pages that hide the footer's CTA band.
 * @param {{ title: import('react').ReactNode, body?: string, href: string, cta: string, secondary?: [string, string] }} props
 */
export function ClosingCta({ title, body, href, cta, secondary }) {
  return (
    <section className={`${WRAP} pb-28 md:pb-36`}>
      <div className="border-t border-line pt-16 md:pt-24" data-reveal>
        <h2 className="max-w-5xl text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[0.94] tracking-[-0.045em]">{title}</h2>
        <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {body && <p className="max-w-md text-lg text-muted leading-relaxed">{body}</p>}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={href}
              className="group inline-flex items-center justify-center gap-2 pl-7 pr-6 py-4 rounded-full bg-ink !text-canvas font-medium hover:bg-accent transition-colors duration-300"
            >
              {cta}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            {secondary && (
              <Link
                href={secondary[0]}
                className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-line font-medium hover:border-ink transition-colors duration-300"
              >
                {secondary[1]}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
