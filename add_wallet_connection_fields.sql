-- Add wallet connection fields to profiles table
-- Run this in Supabase SQL Editor

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS connected_wallet_type text CHECK (connected_wallet_type IN ('solana', 'ethereum', 'bitcoin')),
ADD COLUMN IF NOT EXISTS connected_wallet_address text;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_connected_wallet_type ON profiles(connected_wallet_type);
CREATE INDEX IF NOT EXISTS idx_profiles_connected_wallet_address ON profiles(connected_wallet_address);

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND column_name IN ('connected_wallet_type', 'connected_wallet_address');
