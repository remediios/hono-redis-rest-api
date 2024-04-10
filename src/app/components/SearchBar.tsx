'use client';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from '@/components/ui/command';
import { useState } from 'react';

interface ISearchBar {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  searchResults:
    | {
        results: string[];
        duration: number;
      }
    | undefined;
  setSelectedResult: React.Dispatch<React.SetStateAction<string>>;
  cooldown: number;
}

const SearchBar = ({
  input,
  setInput,
  searchResults,
  setSelectedResult,
  cooldown,
}: ISearchBar) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: string) => {
    if (cooldown <= 0) {
      setInput(e);
      setIsOpen(false);
    }
  };

  return (
    <div className="max-w-md w-full ">
      <Command className="rounded-xl border shadow-md">
        <CommandInput
          value={input}
          onValueChange={(e) => handleInputChange(e)}
          placeholder="Search countries..."
          className={`placeholder:text-zinc-500 ${
            cooldown > 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
        <CommandList>
          {searchResults?.results.length === 0 && !isOpen ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : null}
          {searchResults?.results ? (
            <CommandGroup heading="Results">
              {searchResults.results.map((result, index) => (
                <CommandItem
                  key={index}
                  value={result}
                  onSelect={(e) => {
                    setInput(e);
                    setIsOpen(true);
                    setSelectedResult(e);
                  }}
                >
                  <p>{result}</p>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
          {searchResults?.results && !isOpen ? (
            <>
              <div className="h-px w-full bg-zinc-200" />
              <p className="p-2 text-xs text-zinc-500">
                Found {searchResults.results.length} results in{' '}
                {searchResults.duration?.toFixed(0)}ms
              </p>
            </>
          ) : null}
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchBar;
