import { NextRequest } from "next/server";
import { explainJWT, generateJWT, getBody, result, resultNoData } from "../../lib/quickapi";
import supabase from "../../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { hostTokenName } from "../../lib/env-values";

export async function POST(req:Request) {
    
    const { email, password } = await getBody<{ email: string, password: string }>(req)
    const { error, data } = await supabase.auth.signInWithPassword({
        email,password
    })
    if (error) {
        return resultNoData(error.message, '500')
    }
    // const res = result(data.user)
    // res.headers.set('Set-Cookie',`${hostTokenName}=${generateJWT(data.session)}; Path: /; Max-Age=60480000`)
    const res = new Response(
        JSON.stringify(data.user),
        {
            headers: {
                'Set-Cookie': `${hostTokenName}=${generateJWT(data.session)}; Path: /; Max-Age=60480000`,
                Location: '/'
            },
        }
    )
    
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
                res.headers.set('Set-Cookie',`${hostTokenName}=${generateJWT(data.session)}; Path: /; Max-Age=60480000`)
                res.headers.set('Location','/')
                return res
            }
        } else {
            return resultNoData('登陆失效','403')
        }

    }
    return resultNoData('您未登录，请先登录','403')
}