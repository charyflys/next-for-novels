import { getEmailAccess } from "../../lib/supabase/email";
import { getBody, result, resultNoData } from "../../lib/quickapi";
import supabase from "../../lib/supabaseClient";
import axios from "axios";
import redis from "../../lib/redis";
import { addProfile } from "../../lib/supabase/profile";
/**
 * 注册功能
 * 参数应当包括email和password
 */
export async function POST(req: Request): Promise<Response> {
    const { email, password } = await getBody<{ email: string, password: string }>(req)
    const access = await getEmailAccess(email)
    if (!access) return resultNoData('您的邮箱未受邀请，请向管理员申请','403')
    if (!access.status) return resultNoData('您的邮箱已经注册 ，请向管理员申诉','403')
    const { error, data } = await supabase.auth.signUp({ email, password })
    if (error) {
        return resultNoData(error.message, '403')
    }
    if (data.user) {
        redis.set(email, data.user.id)
        addProfile({
            id: data.user.id,
            role: access.role,
            nickname: null,
            status: true,
            muted: null,
            avatar: null,
        })
    }
    return resultNoData()
}

/**
 * 注册确认
 * 参数应当包括signupurl
 */
export async function PUT(req:Request) {
    const { signupurl } = await getBody<{signupurl:string}>(req)
    await axios.get(signupurl)
    return resultNoData()
}