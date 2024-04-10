import { Redis } from '@upstash/redis/cloudflare';
import { Context, Env, Hono } from 'hono';
import { env } from 'hono/adapter';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors';
import { Ratelimit } from '@upstash/ratelimit';
import { BlankInput } from 'hono/types';

declare module 'hono' {
  interface ContextVariableMap {
    rateLimit: Ratelimit;
    redisClient: Redis;
  }
}

export const runtime = 'edge';

const app = new Hono().basePath('/api');
const cache = new Map();

app.use('/*', cors());

type EnvConfig = {
  UPSTASH_REDIS_REST_TOKEN: string;
  UPSTASH_REDIS_REST_URL: string;
};

class RedisRateLimiter {
  static instance: Ratelimit;
  static redisClient: Redis;

  static getInstance(c: Context<Env, '/api/search', BlankInput>) {
    if (!this.instance) {
      const { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } =
        env<EnvConfig>(c);

      this.redisClient = new Redis({
        token: UPSTASH_REDIS_REST_TOKEN,
        url: UPSTASH_REDIS_REST_URL,
      });

      const rateLimit = new Ratelimit({
        redis: this.redisClient,
        limiter: Ratelimit.slidingWindow(20, '20 s'),
        ephemeralCache: cache,
      });

      this.instance = rateLimit;
      return { rateLimit, redisClient: this.redisClient };
    } else {
      return { rateLimit: this.instance, redisClient: this.redisClient };
    }
  }
}

app.use(async (c, next) => {
  const { rateLimit, redisClient } = RedisRateLimiter.getInstance(c);
  c.set('rateLimit', rateLimit);
  c.set('redisClient', redisClient);
  await next();
});

app.get('/search', async (c) => {
  const rateLimit = c.get('rateLimit');
  const redisClient = c.get('redisClient');
  const ip = c.req.raw.headers.get('CF-Connecting-IP');

  const { success } = await rateLimit.limit(ip ?? 'anonymous');

  if (success) {
    try {
      const start = performance.now();

      // ----------------------------------------------------------------

      const query = c.req.query('q')?.toUpperCase();

      if (!query) {
        return c.json({ message: 'Invalid search query' }, { status: 400 });
      }

      const response = [];
      const rank = await redisClient.zrank('terms', query);

      if (rank !== null && rank !== undefined) {
        const temp = await redisClient.zrange<string[]>(
          'terms',
          rank,
          rank + 100
        ); //search for the next 100 entries as maximum

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
  } else {
    return c.json(
      { results: [], message: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
});

export const GET = handle(app);
export default app as never;
