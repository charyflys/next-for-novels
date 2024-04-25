import { addAccessEmail, getAllCol, removeEmail } from "../../lib/supabase/email";
import { explainJWT, generateJWT, getBody, result, resultNoData } from "../../lib/quickapi";
import { NextRequest } from "next/server";
import { hostTokenName } from "../../lib/env-values";
import supabase from "../../lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";
import redis from "../../lib/redis";
import md5 from "md5";
import Refresh from "../../lib/supabase/refreshtoken";

/** 
 * 这个功能实际没有更新session的功能
*/
export async function GET(req: Request) {
    const nextreq = new NextRequest(req)
    const token = nextreq.cookies.get(hostTokenName)
    if (!token) return resultNoData('您未登录，请先登录', '403')
    const Session = (await explainJWT<Session>(token.value))
    const user = await redis.get<User>(md5(token.value))
    if (!user) return resultNoData('登陆过期', '403')
    if (!(user.role === 'super' || user.role === 'admin')) return resultNoData('无权限', '403')
    const coldata = await getAllCol()
    return result(coldata)
}

export async function POST(req: Request) {
    const { email } = await getBody<{ email: string, }>(req)
    const nextreq = new NextRequest(req)


    const token = nextreq.cookies.get(hostTokenName)
    if (!token) return resultNoData('您未登录，请先登录', '403')
    const Session = (await explainJWT<Session>(token.value))
    const user = await redis.get<User>(md5(token.value))
    if (!user) return resultNoData('登陆过期', '403')
    if (!(user.role === 'super' || user.role === 'admin')) return resultNoData('无权限', '403')
    // const { data, error } = await supabase.auth.setSession(Session)
    const { msg, session: new_session } = await addAccessEmail(email, Session)
    const res = resultNoData(msg, '200')
    return Refresh(res, new_session, Session, user)

}

export async function DELETE(req: Request) {
    const { email } = await getBody<{ email: string, }>(req)
    const nextreq = new NextRequest(req)
    // const email = nextreq.nextUrl.searchParams.get('email') as string

    const token = nextreq.cookies.get(hostTokenName)
    if (!token) return resultNoData('您未登录，请先登录', '403')
    const Session = (await explainJWT<Session>(token.value))
    const user = await redis.get<User>(md5(token.value))
    if (!user) return resultNoData('登陆过期', '403')
    if (!(user.role === 'super' || user.role === 'admin')) return resultNoData('无权限', '403')
    // const { data, error } = await supabase.auth.setSession(Session)
    const { msg, session: new_session } = await removeEmail(email, Session)
    const res = resultNoData(msg, '200')
    return Refresh(res, new_session, Session, user)

}