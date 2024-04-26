import { Session, User } from "@supabase/supabase-js";
import { generateJWT, resultNoData, resultToken } from "../quickapi";
import redis from "../redis";
import md5 from "md5";
import { getProfile } from "./profile";

export default async function Refresh(res: Response, session: Session | null, firstsession: Session, user: User) {
    if (session) {
        if (!(session.access_token === firstsession.access_token && session.refresh_token === firstsession.refresh_token)) {
            const { access_token, refresh_token } = session
            const Session = { access_token, refresh_token, time: Date.now() }
            const jwt = await generateJWT(Session)
            const md5jwt = md5(jwt)
            await redis.set(md5jwt, user,
                { ex: 3600 }
            )
            resultToken(res, jwt)
        }
        return res
    } else {
        return resultNoData('登陆失效', '403')
    }
}