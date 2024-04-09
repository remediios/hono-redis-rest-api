import { useCountries } from '@/utils/getCountries';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface IResult {
  selectedResult: string;
}

const Result = ({ selectedResult }: IResult) => {
  const { getCountryByValue } = useCountries();
  const [countryData, setCountryData] = useState<{
    value: string;
    label: string;
    flag: string;
    latLang: [number, number];
    region: string;
    subRegion: string;
  }>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedResult) return;
    setIsLoading(true);

    const data = getCountryByValue(selectedResult.toUpperCase());
    setCountryData(data);
    setIsLoading(false);
  }, [selectedResult]);

  return (
    <div className="flex flex-col items-center mt-4">
      {!isLoading ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <h4>You have selected </h4>
            <span className="text-8xl">{countryData?.flag}</span>
            <h1 className="text-xl font-bold">{countryData?.label}</h1>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-[60px] w-[100px]" />
          <Skeleton className="h-5 w-[150px]" />
        </div>
      )}
    </div>
  );
};

export default Result;
