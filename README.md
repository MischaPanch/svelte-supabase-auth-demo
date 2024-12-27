svelte-supabase-auth-demo
=========================

A small SvelteKit project demonstrating how to use...

* :zap: [Supabase](https://supabase.com/) as serverless backend
* :zap: [Zod](https://github.com/colinhacks/zod) for schema validation
* :zap: [Prisma](https://www.prisma.io/) as ORM
* :zap: [Passwordless email logins](https://supabase.com/docs/guides/auth/auth-email-passwordless)
* :zap: [Anonymous sign ins](https://supabase.com/docs/guides/auth/auth-anonymous)


Prererquisites
--------------

1. Install bun, e.g. with `curl -sS https://webinstall.dev/bun | bash`
1. Docker and docker-compose need to be installed for the Supabase instance



Usage
-----

1. Make env files with `cp .env.example .env` and `cp supabase/docker/.env.example supabase/docker/.env`
   The default values will work, but for production you should change the values. Note that the values in `.env` need
   to be consistent with the values in `supabase/docker/.env` (derived from the latter).
1. Start the Supabase instance with `cd supabase/docker && docker compose up -d`
   In the default configuration, it will spin up a postgres database as part of the docker-compose setup.
   However, we can also **use an existing database** by adjusting the docker-compose file in the highlighted section.
   In the default setting, an inbucket instance will be started as well, which can be accessed under [http://localhost:9000/](http://localhost:9000/). It is a mock email server that will intercept all emails sent by the application.
1. Install dependencies:
   
   ```
   bun install
   ```
1. DB model code is generated with Prisma. Run the following command to generate/update the code:
   
   ```
   bun run prisma-generate
   ```
1. Run the `init-db` command to initialize the database. The schema can be found in `prisma/schema.prisma` and the database seed query in `seed.sql`.
   
   ```
   bun run init-db
   ```
1. Start a dev server with
   
   ```
   bun run dev
   ```
1. Navigate to [http://localhost:5731](http://localhost:5173)