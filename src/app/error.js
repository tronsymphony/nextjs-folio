'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-[70vh] flex items-center px-4 sm:px-6">
      <div className="container mx-auto max-w-2xl text-center py-36">
        <h1 className="text-4xl font-extrabold tracking-tight mb-6">Something went wrong.</h1>
        <p className="text-neutral-400 mb-10">The page hit an unexpected error. Trying again usually fixes it.</p>
        <div className="flex justify-center gap-3">
          <button onClick={reset} className="px-5 py-2.5 rounded-lg bg-white text-black font-bold hover:bg-neutral-200 transition-colors">
            Try again
          </button>
          <Link href="/" className="px-5 py-2.5 rounded-lg border border-neutral-800 hover:bg-white/5 transition-colors">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
