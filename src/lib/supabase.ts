import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string;
  full_name: string;
  mail_address?: string;
  avatar_url?: string;
  bio?: string;
  category?: string;
  website?: string;
  x_url?: string;
  connected_wallet_type?: 'solana' | 'ethereum' | 'bitcoin';
  connected_wallet_address?: string;
  created_at: string;
  updated_at: string;
  total_donated: number;
  total_purchased: number;
  carelevel_score: number;
};

export type Transaction = {
  id: string;
  user_id: string;
  type: 'donation' | 'purchase';
  amount: number;
  token_type: string;
  recipient?: string;
  status: 'pending' | 'success' | 'failed';
  created_at: string;
};



export type Business = {
  id: string;
  name: string;
  author: string;
  verified: boolean;
  description: string;
  image_url: string;
  created_at: string;
};







