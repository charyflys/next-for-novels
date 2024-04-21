
import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from './env-values'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)