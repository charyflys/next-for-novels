import { NextRequest } from "next/server";
import { explainJWT, generateJWT, getBody, result, resultNoData } from "../../lib/quickapi";
import supabase from "../../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { hostTokenName } from "../../lib/env-values";
import redis from "../../lib/redis";
import md5 from 'md5'

export async function POST(req:Request) {
    
    const { email, password } = await getBody<{ email: string, password: string }>(req)
    const { error, data } = await supabase.auth.signInWithPassword({
        email,password
    })
    if (error) {
        return resultNoData(error.message, '500')
    }
    const { access_token,refresh_token } = data.session
    const session = { access_token,refresh_token } 
    const jwt = await generateJWT(session)
    await redis.set(md5(jwt),data.user,{px: 60})
    const res = result(data.user)
    res.headers.set('Set-Cookie',`${hostTokenName}=${jwt} ; Path= /; Max-Age=2592000; Secure `)
    
    return res
}

export async function GET(req:Request) {
    const nextreq = new NextRequest(req)
    const token = nextreq.cookies.get(hostTokenName)
    if (token){
        const Session = (await explainJWT<Session>(token.value))
        const { data } = await supabase.auth.setSession(Session)
        const res = result(data.user)
        if (data.session) {
            if(data.session.access_token===Session.access_token&&data.session.refresh_token===Session.refresh_token)
            return res
            else {
                const { access_token,refresh_token } = data.session
                const session = { access_token,refresh_token } 
                const jwt = await generateJWT(session)
                await redis.set(md5(jwt),data.user,{px: 60})

                const res = result(data.user)
                res.headers.set('Set-Cookie',`${hostTokenName}=${jwt} ; Path= / ; Max-Age=2592000 ; Secure`)
            
                return res
            }
        } else {
            return resultNoData('登陆失效','403')
        }

    }
    return resultNoData('您未登录，请先登录','403')
}