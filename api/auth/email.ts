import { addAccessEmail, getAllCol, removeEmail } from "../../lib/supabase/email";
import { authCheck, getBody, getCookie, result, resultNoData } from "../../lib/quickapi";

/** 
 * 这个功能实际没有更新session的功能
*/
export async function GET(req: Request) {
    const { check ,res, user} = await authCheck(req)
    if (check||(!user)) return res
    if (!(user.profile.role === 'super' || user.profile.role === 'admin')) return resultNoData('无权限', '403')
    const coldata = await getAllCol()
    return result(coldata)
}

export async function POST(req: Request) {
    const { email } = await getBody<{ email: string, }>(req)


    const { check ,res, user} = await authCheck(req)
    if (check||(!user)) return res
    if (!(user.profile.role === 'super' || user.profile.role === 'admin')) return resultNoData('无权限', '403')
    // const { data, error } = await supabase.auth.setSession(Session)
    const { msg,err } = await addAccessEmail(email, user)
    return resultNoData(msg, err?'500':'200')

}

export async function DELETE(req: Request) {
    const { id } = await getBody<{ id: number, }>(req)
    const { check ,res, user} = await authCheck(req)
    if (check||(!user)) return res

    if (!(user.profile.role === 'super' || user.profile.role === 'admin')) return resultNoData('无权限', '403')
    // const { data, error } = await supabase.auth.setSession(Session)
    const { msg, err } = await removeEmail(id)
    return resultNoData(msg, err?'500':'200')

}