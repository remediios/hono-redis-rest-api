'use client';

import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import HeaderInfo from './components/HeaderInfo';
import Result from './components/Result';
import ErrorCountdown from './components/ErrorCountdown';

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();
  const [selectedResult, setSelectedResult] = useState<string>('');
  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      try {
        const response = await fetch(
          `https://hono-redis-rest-api.remedios.workers.dev/api/search?q=${input}`
        );
        const data = (await response.json()) as {
          results: string[];
          duration: number;
        };

        setSearchResults(data);

        if (response.status === 429) {
          setCooldown(20);
          // If the rate limit is exceeded, throw an error with the message
          throw new Error('Rate limit exceeded');
        }
      } catch (error) {
        console.error(error);
        setSearchResults(undefined);
      }
    };
    fetchData();
  }, [input]);

  return (
    <main className="h-screen w-screen grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in slide-in-from-bottom-2.5">
        <HeaderInfo />
        <ErrorCountdown cooldown={cooldown} setCooldown={setCooldown} />
        <SearchBar
          input={input}
          setInput={setInput}
          searchResults={searchResults}
          setSelectedResult={setSelectedResult}
          cooldown={cooldown}
        />
        {selectedResult && <Result selectedResult={selectedResult} />}
      </div>
    </main>
  );
}
