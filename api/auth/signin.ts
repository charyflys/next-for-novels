import { explainJWT, generateJWT, getBody, getCookie, result, resultNoData, resultToken } from "../../lib/quickapi";
import supabase from "../../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { hostTokenName } from "../../lib/env-values";
import redis from "../../lib/redis";
import md5 from 'md5'
import Refresh from "../../lib/supabase/refreshtoken";
import { getProfile } from "../../lib/supabase/profile";

export async function POST(req: Request) {

    const { email, password } = await getBody<{ email: string, password: string }>(req)
    const { error, data } = await supabase.auth.signInWithPassword({
        email, password
    })
    if (error||(!data.user)) {
        return resultNoData(error?error.message:'no user', '500')
    }
    const profile = await getProfile(data.user.id)
    const { access_token, refresh_token } = data.session
    const session = { access_token, refresh_token, time: Date.now() }
    const user = Object.assign(data.user,{ profile })
    const jwt = await generateJWT(session)
    const md5jwt = md5(jwt)
    const redisresult = await redis.set(md5jwt, user,
        { ex: 3600 }
    )
    return resultToken(result(profile), jwt)
}

export async function GET(req: Request) {
    const token = getCookie(req).get(hostTokenName)
    if (token) {
        const Session = (await explainJWT<Session>(token))
        const { data } = await supabase.auth.setSession(Session)
        if (!data.user) return resultNoData('登陆失效', '403')
        const profile = await getProfile(data.user.id)
        const User = Object.assign(data.user,{profile})
        const res = result(profile)
        return Refresh(res, data.session, Session, User)
    }
    return resultNoData('您未登录，请先登录', '403')
}