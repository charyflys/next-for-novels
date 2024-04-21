
import { createClient } from '@supabase/supabase-js'
import { describe, test } from 'node:test'
import { supabaseAnonKey as supabaseKey, supabaseUrl } from '../lib/env-values'

describe(
    'sql connect success',
    () =>  {
        it('env get',() => {
            console.log(supabaseKey,supabaseUrl)
            expect(supabaseKey&&supabaseUrl).not.toBeNull()
        })
        it('connect test',() => {
            const supabase = createClient(supabaseUrl, supabaseKey)
            console.log(supabase)
            expect(supabase).not.toBeNull()
        })
    }
)
