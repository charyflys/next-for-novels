import { Session, User } from "@supabase/supabase-js";
import supabase from "../supabaseClient";

const table_name = 'access_emails'

export async function getEmailAccess(email: string) {
    const { error, data } = await supabase
        .from(table_name)
        .select()
        .eq('email', email)
    if (error || (!data)) return null
    return data[0] as Email_Access
}

export async function addAccessEmail(email: string, user: User) {
    if (!email) return { msg: 'no_email', err: true  }
    const { error } = await supabase.from(table_name)
        .insert({ adder: user.id, email })
    if (error) return { msg: error.message, err: true  }
    return { msg: 'success' }
}

export async function getAllCol() {
    const { data, error } = await supabase.from(table_name).select()
    return error ? [] : data
}

export async function removeEmail(email: string) {
    if (!email) return { msg: 'no_email', err: true }
    const { error } = await supabase.from(table_name)
        .delete()
        .eq('email', email)
    if (error) return { msg: error.message, err: true }
    return { msg: 'success' }
}

export type Email_Access = {
    // email: string //不需要的属性
    // adder: string //这个之后想办法把联表的功能替代上去，现阶段没有获取这个属性的必要
    role: 'admin' | null,
    status: boolean,
}