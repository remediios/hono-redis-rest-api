import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from '@/components/ui/command';

interface ISearchBar {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  searchResults:
    | {
        results: string[];
        duration: number;
      }
    | undefined;
}

const SearchBar = ({ input, setInput, searchResults }: ISearchBar) => {
  return (
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
  );
};

export default SearchBar;
