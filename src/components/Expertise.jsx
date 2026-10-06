import { ArrowLink } from './ui/Cta';
import { expertise } from '../data/expertise';

// Expertise as hairline rows: area, what's in it, and where to see it.
export default function Expertise() {
  return (
    <ol className="border-t border-line">
      {expertise.map(({ area, items, proof }, i) => (
        <li key={area} className="grid md:grid-cols-12 gap-x-8 gap-y-4 py-8 border-b border-line">
          <h3 className="md:col-span-4 flex gap-4 text-2xl font-medium tracking-[-0.03em] leading-tight">
            <span className="font-mono text-xs text-faint pt-2">{String(i + 1).padStart(2, '0')}</span>
            {area}
          </h3>
          <ul className="md:col-span-5 space-y-2">
            {items.map((item) => (
              <li key={item} className="text-ink/85 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
          <div className="md:col-span-3 flex flex-col items-start gap-2 text-sm">
            {proof.map(([label, href]) => (
              <ArrowLink key={href + label} href={href}>
                {label}
              </ArrowLink>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
