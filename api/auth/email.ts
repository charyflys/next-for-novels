import { addAccessEmail, getAllCol, removeEmail } from "../../lib/supabase/email";
import { explainJWT, generateJWT, getBody, getCookie, result, resultNoData } from "../../lib/quickapi";
import { hostTokenName } from "../../lib/env-values";
import { Session, User } from "@supabase/supabase-js";
import redis from "../../lib/redis";
import md5 from "md5";
import { User_Profile } from "@/lib/supabase/profile";

/** 
 * 这个功能实际没有更新session的功能
*/
export async function GET(req: Request) {
    const token = getCookie(req).get(hostTokenName)
    if (!token) return resultNoData('您未登录，请先登录', '401')
    const user = await redis.get<User&{ profile: User_Profile}>(md5(token))
    if (!user) return resultNoData('登陆过期', '401')
    if (!(user.profile.role === 'super' || user.profile.role === 'admin')) return resultNoData('无权限', '403')
    const coldata = await getAllCol()
    return result(coldata)
}

export async function POST(req: Request) {
    const { email } = await getBody<{ email: string, }>(req)


    const token = getCookie(req).get(hostTokenName)
    if (!token) return resultNoData('您未登录，请先登录', '401')
    const user = await redis.get<User&{ profile: User_Profile}>(md5(token))
    if (!user) return resultNoData('登陆过期', '401')
    if (!(user.profile.role === 'super' || user.profile.role === 'admin')) return resultNoData('无权限', '403')
    // const { data, error } = await supabase.auth.setSession(Session)
    const { msg,err } = await addAccessEmail(email, user)
    return resultNoData(msg, err?'500':'200')

}

export async function DELETE(req: Request) {
    const { email } = await getBody<{ email: string, }>(req)
    const token = getCookie(req).get(hostTokenName)
    if (!token) return resultNoData('您未登录，请先登录', '401')
    const user = await redis.get<User&{ profile: User_Profile}>(md5(token))
    if (!user) return resultNoData('登陆过期', '401')
    if (!(user.profile.role === 'super' || user.profile.role === 'admin')) return resultNoData('无权限', '403')
    // const { data, error } = await supabase.auth.setSession(Session)
    const { msg, err } = await removeEmail(email)
    return resultNoData(msg, err?'500':'200')

}