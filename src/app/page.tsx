'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      const response = await fetch(`/api/search?q=${input}`);
    };
    fetchData();
  }, [input]);

  return (
    <main className="h-screen w-screen grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in slide-in-from-bottom-2.5">
        <h1 className="text-5xl tracking-tight font-bold">Hono Redis API</h1>
        <p className="text-zinc-600 text-md max-w-prose text-center">
          Globally distributed high-performance REST API for speed search
          <br /> Type a query below and get your results in miliseconds.
        </p>

        <div className="max-w-md w-full"></div>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="text-zinc-900"
        />
      </div>
    </main>
  );
}
