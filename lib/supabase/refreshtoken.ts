import { Session, User } from "@supabase/supabase-js";
import { generateJWT, resultNoData } from "../quickapi";
import redis from "../redis";
import md5 from "md5";
import { hostTokenName } from "../env-values";

export default async function Refresh(res: Response, session: Session|null, firstsession: Session, user: User) {
    if (session) {
        if (!(session.access_token === firstsession.access_token && session.refresh_token === firstsession.refresh_token)) {
            const { access_token, refresh_token } = session
            const Session = { access_token, refresh_token, time: Date.now() }
            const jwt = await generateJWT(Session)
            await redis.set(md5(jwt), user, { px: 60 })
            res.headers.set('Set-Cookie', `${hostTokenName}=${jwt} ; Path= / ; Max-Age=2592000 ; Secure`)
        }
        return res
    } else {
        return resultNoData('登陆失效', '403')
    }
}