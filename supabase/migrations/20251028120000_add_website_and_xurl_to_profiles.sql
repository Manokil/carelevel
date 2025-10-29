-- Add website and x_url columns to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS website text,
  ADD COLUMN IF NOT EXISTS x_url text;

-- Optional: backfill defaults (none needed) and ensure updated_at touched via trigger if exists

