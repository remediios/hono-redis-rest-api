import { Redis } from '@upstash/redis/cloudflare';
import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors';

export const runtime = 'edge';

const app = new Hono().basePath('/api');
app.use('/*', cors());

type EnvConfig = {
  UPSTASH_REDIS_REST_TOKEN: string;
  UPSTASH_REDIS_REST_URL: string;
};

app.get('/search', async (c) => {
  try {
    const { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } =
      env<EnvConfig>(c);

    const start = performance.now();

    // ----------------------------------------------------------------

    const redis = new Redis({
      token: UPSTASH_REDIS_REST_TOKEN,
      url: UPSTASH_REDIS_REST_URL,
    });

    const query = c.req.query('q')?.toUpperCase();

    if (!query)
      return c.json({ message: 'Invalid search query' }, { status: 400 });

    const response = [];
    const rank = await redis.zrank('terms', query);

    if (rank !== null && rank !== undefined) {
      const temp = await redis.zrange<string[]>('terms', rank, rank + 100); //search for the next 100 entries as maximum

      for (const el of temp) {
        if (!el.startsWith(query)) {
          break;
        }
        if (el.endsWith('*')) {
          response.push(el.substring(0, el.length - 1));
        }
      }
    }

    // ----------------------------------------------------------------

    const end = performance.now();

    return c.json({ results: response, duration: end - start });
  } catch (error) {
    console.error(error);

    return c.json(
      { results: [], message: 'Something went wrong...' },
      { status: 500 }
    );
  }
});

export const GET = handle(app);
export default app as never;
