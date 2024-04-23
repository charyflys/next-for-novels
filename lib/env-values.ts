export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
// export const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const jwtSecret = process.env.JWT_SECRET as string

export const redisUrl = process.env.REDIS_URL as string
export const redisToken = process.env.REDIS_TOKEN as string
console.log(
    supabaseUrl,
    supabaseAnonKey,
    jwtSecret,
)
