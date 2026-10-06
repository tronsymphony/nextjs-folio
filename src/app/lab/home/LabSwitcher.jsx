import Link from 'next/link';
import { LAB_HEROES } from './heroes';

// Fixed pill at the bottom of each lab page for flipping between hero designs.
export default function LabSwitcher({ current }) {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] max-w-[calc(100vw-2rem)] overflow-x-auto rounded-full bg-ink/90 backdrop-blur p-1 flex gap-1 shadow-lg">
      {LAB_HEROES.map(({ id, name }) => (
        <Link
          key={id}
          href={`/lab/home/${id}/`}
          className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors ${
            id === current ? 'bg-canvas text-ink' : '!text-canvas/70 hover:!text-canvas'
          }`}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
