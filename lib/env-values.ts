export const supabaseUrl = process.env.SUPABASE_URL as string
// export const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string
export const supabaseAnonKey = process.env.SUPABASE_KEY as string

export const jwtSecret = process.env.JWT_SECRET as string

export const redisUrl = process.env.REDIS_URL as string
export const redisToken = process.env.REDIS_TOKEN as string

export const hostTokenName = process.env.HOST_TOKEN_NAME as string

console.log(
    supabaseUrl,
    supabaseAnonKey,
    jwtSecret,
)
