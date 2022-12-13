import { createClient } from '@supabase/supabase-js'
import checkEnv from '../utils/getEnv'

const SUPABASE_URL = checkEnv(process.env.SUPABASE_URL)
const SUPABASE_KEY = checkEnv(process.env.SUPABASE_KEY)

// create supabase client
export const supabaseClient =
  global.supabase || createClient(SUPABASE_URL, SUPABASE_KEY)

if (process.env.NODE_ENV !== 'production') {
  global.supabase = supabaseClient
}
