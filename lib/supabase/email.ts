import { Session } from "@supabase/supabase-js";
import supabase from "../supabaseClient";

const table_name = 'access_emails'

export async function getEmailAccess(email: string) {
    const { error, data } = await supabase
        .from(table_name)
        .select()
        .eq('email', email)
    if (error || (!data)) return null
    return !!data.length
}

export async function addAccessEmail(email: string, session: Session) {
    if (!email) return { msg: 'no_email',session }
    const { data: { user, session: new_session } } = await supabase.auth.setSession(session)
    if (!user) return { msg: 'no_session', session: new_session }
    const { error } = await supabase.from(table_name)
        .insert({ adder: user.id, email })
    if (error) return { msg: error.message, session: new_session }
    return { msg: 'success', session: new_session }
}

export async function getAllCol() {
    const { data, error } = await supabase.from(table_name).select()
    return error ? [] : data
}

export async function removeEmail(email: string, session: Session) {
    if (!email) return { msg: 'no_email',session }
    const { data: { user, session: new_session } } = await supabase.auth.setSession(session)
    if (!user) return { msg: 'no_session', session: new_session }
    const { error } = await supabase.from(table_name)
        .delete()
        .eq('email', email)
    if (error) return { msg: error.message, session: new_session }
    return { msg: 'success', session: new_session }
}