import { supabase } from "../../lib/supabaseClient";
import { getBody, getQuery, result, resultNoData } from "../../lib/quickapi";
import axios from "axios";
/**
 * 注册功能
 * 参数应当包括email和password
 */
export async function POST(req: Request): Promise<Response> {
    const { email, password } = await getBody<{ email: string, password: string }>(req)
    const { error, data } = await supabase.auth.signUp({ email, password })
    if (error) {
        return resultNoData(error.message, '500')
    }
    return result(data)
}

/**
 * 注册确认
 * 参数应当包括signupurl
 */
export async function PUT(req:Request) {
    const { signupurl } = await getBody<{signupurl:string}>(req)
    const res = await axios.get(signupurl)
    return result(res)
}