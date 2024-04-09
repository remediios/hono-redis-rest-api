import { countriesFormatted } from '@/utils/getCountries';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://mighty-puma-49140.upstash.io',
  token:
    'Ab_0ASQgOGRiNGUxYzYtZDVkMy00MWUxLWJkZWYtMzNkMTVlMTA5YzA3NjQ4NGNjYzY3YzFhNGZmM2IxNjAzYzg1YmU1ZjdhZGE=',
});

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
