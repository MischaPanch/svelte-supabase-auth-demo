begin;

-- Function to insert a row into public.Accounts
create or replace function public.create_account_trigger()
returns trigger as $$
begin
  insert into public.authors (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Function to delete a row from public.profiles
create or replace function public.delete_account_by_email ()
returns trigger as $$
begin
    delete from public.authors where userId = old.id;
    return old;
end;
$$ language plpgsql security definer;

-- Trigger to execute the function after a new user is created
create or replace trigger after_user_insert
  after insert on auth.users
  for each row execute procedure public.create_account_trigger();

-- Trigger to execute the function after a new user is created
create or replace trigger after_user_delete
  after delete on auth.users
  for each row execute procedure public.delete_account_by_email();

commit;
