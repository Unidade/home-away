import { createClient, SupabaseClient } from '@supabase/supabase-js'
import getEnv from '../utils/getEnv'

const SUPABASE_URL = getEnv(process.env.SUPABASE_URL)
const SUPABASE_KEY = getEnv(process.env.SUPABASE_KEY)

const globalForSupabase = global as unknown as {
  supabase: SupabaseClient<any, 'public', any>
}
export const supabase =
  globalForSupabase.supabase || createClient(SUPABASE_URL, SUPABASE_KEY)

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = supabase
