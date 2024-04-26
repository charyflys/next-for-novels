import redis from "../../lib/redis";
import { hostTokenName } from "../../lib/env-values";
import { getCookie, result, resultNoData } from "../../lib/quickapi";
import { User } from "@supabase/supabase-js";
import { getProfile, User_Profile } from "../../lib/supabase/profile";
import md5 from "md5";


export async function GET(req: Request) {
    const token = getCookie(req).get(hostTokenName)
    if (!token) return resultNoData('您未登录，请先登录', '401')
    const user = await redis.get<User&{ profile: User_Profile}>(md5(token))
    if (!user) return resultNoData('登陆过期', '401')
    if ('profile' in user&&user.profile) {
        return result(user.profile)
    }
    const profile = await getProfile(user.id)

    const User = Object.assign(user,{profile})
    const md5jwt = md5(token)
    await redis.set(md5jwt, User,
        { ex: 3600 }
    )
    return result(profile,md5jwt+' '+user.id+' ')
}