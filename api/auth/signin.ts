import { getBody, result, resultNoData } from "../../lib/quickapi";
import supabase from "../../lib/supabaseClient";

export async function POST(req:Request) {
    const { email, password } = await getBody<{ email: string, password: string }>(req)
    const { error, data } = await supabase.auth.signInWithPassword({
        email,password
    })
    if (error) {
        return resultNoData(error.message, '500')
    }
    return result(data)
}