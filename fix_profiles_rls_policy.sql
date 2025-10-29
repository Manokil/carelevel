-- Fix Row Level Security policy for profiles table
-- Run this in Supabase SQL Editor

-- First, let's check the current RLS status and policies
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles';

-- Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- Drop existing policies if they exist (to start fresh)
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create comprehensive RLS policies for profiles table

-- 1. Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- 2. Allow users to view their own profile
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT 
    USING (auth.uid() = id);

-- 3. Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE 
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 4. Allow users to delete their own profile (optional)
CREATE POLICY "Users can delete their own profile" ON profiles
    FOR DELETE 
    USING (auth.uid() = id);

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- Test the policies (this should return the policies we just created)
SELECT 
    policyname,
    cmd,
    CASE 
        WHEN qual IS NOT NULL THEN 'Has USING clause'
        ELSE 'No USING clause'
    END as has_using,
    CASE 
        WHEN with_check IS NOT NULL THEN 'Has WITH CHECK clause'
        ELSE 'No WITH CHECK clause'
    END as has_with_check
FROM pg_policies 
WHERE tablename = 'profiles';
