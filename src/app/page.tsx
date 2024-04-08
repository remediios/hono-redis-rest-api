'use client';

import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import HeaderInfo from './components/HeaderInfo';

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      const response = await fetch(
        `https://hono-redis-rest-api.remedios.workers.dev/api/search?q=${input}`
      );
      const data = (await response.json()) as {
        results: string[];
        duration: number;
      };

      setSearchResults(data);
    };
    fetchData();
  }, [input]);

  return (
    <main className="h-screen w-screen grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in slide-in-from-bottom-2.5">
        <HeaderInfo />
        <SearchBar
          input={input}
          setInput={setInput}
          searchResults={searchResults}
        />
      </div>
    </main>
  );
}
