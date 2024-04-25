import { NextRequest } from "next/server";
import { explainJWT, generateJWT, getBody, result, resultNoData } from "../../lib/quickapi";
import supabase from "../../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { hostTokenName } from "../../lib/env-values";
import redis from "../../lib/redis";
import md5 from 'md5'
import Refresh from "../../lib/supabase/refreshtoken";

export async function POST(req:Request) {
    
    const { email, password } = await getBody<{ email: string, password: string }>(req)
    const { error, data } = await supabase.auth.signInWithPassword({
        email,password
    })
    if (error) {
        return resultNoData(error.message, '500')
    }
    const { access_token,refresh_token } = data.session
    const session = { access_token,refresh_token,time: Date.now() } 
    const jwt = await generateJWT(session)
    const redisresult= await redis.set(md5(jwt),data.user,
        // {px: 60}
    )
    const res = result({user:data.user,redisresult,md5:md5(jwt)})
    res.headers.set('Set-Cookie',`${hostTokenName}=${jwt} ; Path= /; Max-Age=2592000; Secure `)
    
    return res
}

export async function GET(req:Request) {
    const nextreq = new NextRequest(req)
    const token = nextreq.cookies.get(hostTokenName)
    if (token){
        const Session = (await explainJWT<Session>(token.value))
        const { data } = await supabase.auth.setSession(Session)
        if (!data.user)return resultNoData('登陆失效','403')
        const res = result(data.user)
        return Refresh(res,data.session,Session,data.user)
    }
    return resultNoData('您未登录，请先登录','403')
}