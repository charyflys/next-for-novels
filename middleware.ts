import { NextRequest, NextResponse } from 'next/server';
import { hostTokenName } from './lib/env-values'
import { explainJWT, generateJWT } from './lib/quickapi';
import supabase from './lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import md5 from 'md5';
import redis from './lib/redis';
import { getProfile } from './lib/supabase/profile';


function applySetCookie(req: NextRequest, res: NextResponse) {
    // 1. Parse Set-Cookie header from the response
    const setCookies = new ResponseCookies(res.headers);

    // 2. Construct updated Cookie header for the request
    const newReqHeaders = new Headers(req.headers);
    const newReqCookies = new RequestCookies(newReqHeaders);
    setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

    // 3. Set up the “request header overrides” (see https://github.com/vercel/next.js/pull/41380)
    //    on a dummy response
    // NextResponse.next will set x-middleware-override-headers / x-middleware-request-* headers
    const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });

    // 4. Copy the “request header overrides” headers from our dummy response to the real response
    dummyRes.headers.forEach((value, key) => {
        if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
            res.headers.set(key, value);
        }
    });
}

export default async function middleware(request: Request) {
    if (process.env.NODE_ENV === 'development') {
        // 在开发环境中禁用中间件
        return NextResponse.next();
      }
    const req = new NextRequest(request)
    const url = req.nextUrl.clone()
    url.pathname = '/signin'
    const cookie = req.cookies.get(hostTokenName)
    if (cookie) {
        const session = await explainJWT<Session & { time: number }>(cookie.value)
        if ((session.time === undefined) || (Date.now() - session.time > 3600000)) {
            const res1 = NextResponse.next();
            const { data, error } = await supabase.auth.setSession(session)
            if (!data.user) return NextResponse.redirect(url)
            const profile = await getProfile(data.user.id)
            if (error || !data.session) {
                url.searchParams.append('session_err', 'true')
                return NextResponse.redirect(url)
            }
            const { access_token, refresh_token } = data.session
            const session_refresh = { access_token, refresh_token, time: Date.now() }
            const jwt = await generateJWT(session_refresh)
            const md5jwt = md5(jwt)
            res1.cookies.set(hostTokenName, jwt, {
                secure: true,
                path: '/',
                maxAge: 2592000
            })
            applySetCookie(req, res1);
            const user = Object.assign(data.user, { profile })
            await redis.set(md5jwt, user,
                { ex: 3600 }
            )
            return res1;
        }
    } else {
        url.searchParams.append('nocookie', 'true')
        return NextResponse.redirect(url)
    }
}


export const config = {
    matcher: [
        '/',
        '/novel',
        '/novels',
        '/favorite',
        '/search',
        '/announce',
        '/admin'
    ],
};