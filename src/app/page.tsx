'use client';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from '@/components/ui/command';
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
        <div className="flex flex-col items-center gap-y-3">
          <h1 className="text-5xl tracking-tight font-bold">Hono ⚡️ Redis</h1>
          <h4 className="text-2xl tracking-tight font-bold bg-gradient-to-r from-yellow-400 via-yellow-400  to-orange-300 text-transparent bg-clip-text ">
            REST API
          </h4>
        </div>

        <p className="text-zinc-600 text-md max-w-prose text-center">
          Globally distributed high-performance REST API for speed search
          <br /> Type a query below and get your results in miliseconds.
        </p>
        <div className="max-w-md w-full ">
          <Command className="rounded-xl border shadow-md">
            <CommandInput
              value={input}
              onValueChange={(e) => setInput(e)}
              placeholder="Search countries..."
              className="placeholder:text-zinc-500"
            />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : null}
              {searchResults?.results ? (
                <CommandGroup heading="Results">
                  {searchResults.results.map((result, index) => (
                    <CommandItem
                      key={index}
                      value={result}
                      onSelect={(e) => setInput(e)}
                    >
                      <p>{result}</p>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {searchResults?.results ? (
                <>
                  <div className="h-px w-full bg-zinc-200" />
                  <p className="p-2 text-xs text-zinc-500">
                    Found {searchResults.results.length} results in{' '}
                    {searchResults.duration.toFixed(0)}ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
    </main>
  );
}
