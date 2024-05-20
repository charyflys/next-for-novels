import supabase from "../supabaseClient";

const table_name = 'profiles'

export async function getProfile(id: string) {
    const { error, data } = await supabase
        .from(table_name)
        .select('role, nickname,status,muted,avatar')
        .eq('id', id)
    if (error || (!data)) return null
    return data.length ? data[0] as User_Profile : null 
}

export async function getAllCol() {
    const { data, error } = await supabase.from(table_name).select()
    return error ? [] : data
}

export async function updateProfile(profile: any, config: { cover?: boolean }) {
    let PROFILE: User_Profile
    if (config.cover) {
        const obj = {} as any
        PROFILE_NAMES.forEach(v => {
            obj[v] = profile[v]
        })
        PROFILE = obj
    } else {
        const obj = {} as any
        PROFILE_NAMES.forEach(v => {
            if (v in profile) obj[v] = profile[v]
        })
        PROFILE = obj
    }
    const { error, data } = await supabase
        .from(table_name)
        .update(PROFILE)
        .eq('id', profile.id)
    if (error) return { msg: error.message, err: true }
    return { msg: 'ok' }
}

export async function addProfile(profile: User_Profile & { id: string }) {
    const { error, data } = await supabase
        .from(table_name)
        .insert(profile)
    if (error) return { msg: error.message, err: true }
    return { msg: 'ok' }
}

const PROFILE_NAMES = [
    'role',
    'nickname',
    'status',
    'muted',
    'avatar',
]

export type User_Profile = {
    role: 'super' | 'admin' | null,
    nickname: string | undefined,
    status: boolean,
    muted: number | null,
    avatar: string | null,
}