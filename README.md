# High Performance REST API

## Project Overview

This project is a boilerplate codebase for building a high-performance, globally distributed REST API using Cloudflare Workers, HonoJS, Redis, and NextJS. This project includes a speed search feature for country names, rate limiting, and caching mechanisms.

![Screenshot 2024-04-10 at 22 45 53](https://github.com/remediios/hono-redis-rest-api/assets/60504347/7a6177ae-1df1-444a-b526-9879f78af0e4)

### [LIVE DEMO](https://hono-redis-rest-api.vercel.app/)

## Technologies Used

1. **Cloudflare Workers** - Serverless Edge: Employed for its exceptional speed, low overhead, and global distribution.
2. **HonoJS** - Web Framework: Used for its lightweight and efficient design, perfect for serverless environments.
3. **Redis** - In-Memory Data Store: Serves as the primary data storage for fast and efficient data retrieval.
4. **NextJS** - Frontend Framework: Utilised for building the frontend application.

## Prerequisites

Before getting started with the project, ensure you have the following tools installed or ready:

- **Postman**: Used for making API requests and testing the functionality of the endpoints.
- **Upstash Redis**: Serveless Cloud Redis database for this application.
- **Vercel**: Used for deploying the NextJS frontend application.
- **Cloudflare Workers**: Used for deploying the HonoJS REST API and managing the domain.

## Features

The project boasts the following features:

- **Speed Search**: Efficiently search for country names using Redis zstack data structure.
- **Rate Limiting**: Implement a 20s rate limiting mechanism to avoid server overloading.
- **Caching**: Utilise caching to improve performance and reduce server load.

## Installation

To get started with the project, follow the instructions below:

1. Clone the repository: `https://github.com/remediios/hono-redis-rest-api.git`
2. Navigate to the project directory: `cd hono-redis-rest-api`
3. Install the dependencies: `pnpm install`
4. Set up your Upstash Redis database and Cloudflare Workers KV namespace.

5. Create a `.env` file with the following credentials:

```env
# .env Example

# UPSTASH REDIS CREDENTIALS
UPSTASH_REDIS_REST_TOKEN="..."
UPSTASH_REDIS_REST_URL="..."
```

6. Create a `wrangler.toml` file with the following credentials:

```env
# wrangler.toml Example

#Your project name for Cloudflare
name = "hono-redis-rest-api"
#Your project date
compatibility_date = "2024-04-02" 

# UPSTASH REDIS CREDENTIALS
[vars]
UPSTASH_REDIS_REST_TOKEN = "..."
UPSTASH_REDIS_REST_URL = "..."
```
The `wrangler.toml` configuration file is used to customize the development and deployment setup for a Cloudflare Worker.

7. Run the application with `pnpm run dev`

After completing these steps, you should be able to run this project locally or adapt it to production (Cloudflare and Vercel). If you encounter any issues or have any questions, please don't hesitate to reach out.

## Usage

After running the application, you can access it at `http://localhost:3000`. Both client and API are accessible within the same PORT. This is achieved by using NextJS API mechanism where the HonoJS API is implemented.

## Contributing

Contributions to the project are more than welcome. Please submit a pull request with a detailed description of your changes.

## License

Fastify-Prisma-Rest-API is open-source software licensed under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please reach out to `miguelremediioss@gmail.com`.
