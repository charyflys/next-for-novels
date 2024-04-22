
import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from './env-values'
const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default supabase