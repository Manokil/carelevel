-- Fix transactions status constraint to allow 'success'
-- Run this in Supabase SQL Editor

-- Step 1: Drop the existing constraint first (so we can update invalid data)
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS transactions_status_check;

-- Step 2: Update all existing rows with invalid status values to valid ones
-- First, handle NULL values
UPDATE transactions 
SET status = 'pending'
WHERE status IS NULL;

-- Then update 'completed' to 'success'
UPDATE transactions 
SET status = 'success'
WHERE status = 'completed';

-- Finally, update any other invalid values to 'pending'
UPDATE transactions 
SET status = 'pending'
WHERE status NOT IN ('pending', 'success', 'failed');

-- Step 3: Add the new constraint that allows 'success', 'pending', and 'failed'
ALTER TABLE transactions 
  ADD CONSTRAINT transactions_status_check 
  CHECK (status IN ('pending', 'success', 'failed'));

-- Verify the constraint is working
-- This should return the constraint definition
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conname = 'transactions_status_check';

-- Verify all rows have valid status values
SELECT status, COUNT(*) as count
FROM transactions
GROUP BY status;

