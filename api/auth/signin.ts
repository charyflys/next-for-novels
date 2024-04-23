import { NextRequest } from "next/server";
import { explainJWT, generateJWT, getBody, result, resultNoData } from "../../lib/quickapi";
import supabase from "../../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

export async function POST(req:Request) {
    
    const { email, password } = await getBody<{ email: string, password: string }>(req)
    const { error, data } = await supabase.auth.signInWithPassword({
        email,password
    })
    if (error) {
        return resultNoData(error.message, '500')
    }
    const time = Date.now()
    const res = result(data.user).headers
    .set('Set-Cookie',`_Secure-token="${generateJWT(data.session)}"; Secure; Max-Age=604800000`)
    return res
}

export async function GET(req:Request) {
    const nextreq = new NextRequest(req)
    const token = nextreq.cookies.get('_Secure-token')
    if (token){
        const Session = explainJWT(token.value) as Session
        const { data } = await supabase.auth.setSession(Session)
        const res = result(data.user).headers
        .set('Set-Cookie',`_Secure-token="${generateJWT(data.session)}"; Secure; Max-Age=604800000`)
        return res
    }
    return resultNoData('您未登录，请先登录','403')
}