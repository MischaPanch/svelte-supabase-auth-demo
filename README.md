svelte-supabase-auth-demo
=========================

A small SvelteKit project demonstrating how to use...

* :zap: [Supabase](https://supabase.com/) as serverless backend
* :zap: [Zod](https://github.com/colinhacks/zod) for schema validation
* :zap: [Prisma](https://www.prisma.io/) as ORM
* :zap: [Passwordless email logins](https://supabase.com/docs/guides/auth/auth-email-passwordless)
* :zap: [Anonymous sign ins](https://supabase.com/docs/guides/auth/auth-anonymous)

Usage
-----

1. Create a hosted Supabase project or [set up a local instance](https://supabase.com/docs/guides/local-development). If you use a hosted instance, keep in mind to [enable anonymous sign ins](https://supabase.com/docs/guides/auth/auth-anonymous#sign-in-anonymously). For the local instance, this is already configured in `supabase/config.toml`.
1. Copy `.env.example` to `.env.local` and provide all config values.
1. Install dependencies:
   
   ```
   bun install
   ```
1. Run the `init-db` command to initialize the database. The schema can be found in `prisma/schema.prisma` and the database seed query in `./seed.sql`.
   
   ```
   bun run init-db
   ```
1. Start a dev server with
   
   ```
   bun run dev
   ```
1. Navigate to [http://localhost:5731](http://localhost:5173)
1. When using a local instance, verification emails will be send to Inbucket, a mock email server which can be accessed under [http://localhost:54324/](http://localhost:54324/).