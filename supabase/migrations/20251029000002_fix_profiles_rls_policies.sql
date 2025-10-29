-- Fix Row Level Security policies for profiles table
-- This migration creates proper RLS policies to allow users to manage their own profiles

-- Drop existing policies if they exist (to start fresh)
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON profiles;

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
