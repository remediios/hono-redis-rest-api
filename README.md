# High Performance REST API

Globally distributed high-performance REST API using:

Cloudflare Workers
HonoJS
Redis
NextJS

### Write me later

Redis zstack data structure to split each country word into several substring from 0 to i, being i a character and index+1 of a term until the end where a \* is added to the last word.
This is done to match a query substring to the nearest country word/complete term, the one with a \*.

.env and wrangler.toml for Cloudflare Workers

Used Cloudflare workers to deploy the holojs REST API, used Upstash to get a serveless cloud redis database, vercel to deploy the front end, nextjs as the frontend micro framework

https://hono-redis-rest-api.remedios.workers.dev
