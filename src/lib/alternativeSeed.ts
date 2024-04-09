import { Redis } from '@upstash/redis';
import countries from 'world-countries';

const redis = new Redis({
  url: 'https://mighty-puma-49140.upstash.io',
  token:
    'Ab_0ASQgOGRiNGUxYzYtZDVkMy00MWUxLWJkZWYtMzNkMTVlMTA5YzA3NjQ4NGNjYzY3YzFhNGZmM2IxNjAzYzg1YmU1ZjdhZGE=',
});

const countriesFormatted = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latLang: country.latlng,
  region: country.region,
  subRegion: country.subregion,
}));

countriesFormatted.forEach((country) => {
  const countryTerm = country.label.toUpperCase();
  const terms: { score: 0; member: string }[] = [];

  for (let i = 0; i < countryTerm.length; i++) {
    terms.push({ score: 0, member: countryTerm.substring(0, i) });
  }
  terms.push({ score: 0, member: countryTerm + '*' });

  const populateDb = async () => {
    // @ts-expect-error
    await redis.zadd('countryTerms', ...terms);
  };
  populateDb();
});

export const useCountries = () => {
  const getAllCountries = () => countriesFormatted;

  const getCountryByValue = (countryValue: string) => {
    return countriesFormatted.find(
      (countryFind) => countryFind.value === countryValue
    );
  };
  return { getAllCountries, getCountryByValue };
};
