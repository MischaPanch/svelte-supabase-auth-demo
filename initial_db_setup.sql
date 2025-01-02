-- The default postgres user in supabase is not a superuser, so prisma commands
-- like db push or migrate will fail. 
-- If you want to manage your database with prisma, 
-- you need to make the postgres user a superuser by running the following command 
-- (for example, in the supabase dashboard SQL editor):
alter role postgres superuser