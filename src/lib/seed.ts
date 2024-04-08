import { countryList } from '@/utils/countries';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://mighty-puma-49140.upstash.io',
  token:
    'Ab_0ASQgOGRiNGUxYzYtZDVkMy00MWUxLWJkZWYtMzNkMTVlMTA5YzA3NjQ4NGNjYzY3YzFhNGZmM2IxNjAzYzg1YmU1ZjdhZGE=',
});

countryList.forEach((country) => {
  const term = country.toUpperCase();
  const terms: { score: 0; member: string }[] = [];

  for (let i = 0; i < term.length; i++) {
    terms.push({ score: 0, member: term.substring(0, i) });
  }

  terms.push({ score: 0, member: term + '*' });

  const populateDb = async () => {
    // @ts-expect-error
    await redis.zadd('terms', ...terms);
  };

  populateDb();
});
