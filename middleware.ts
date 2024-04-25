import { NextRequest, NextResponse } from 'next/server';
import { hostTokenName } from './lib/env-values'
import { explainJWT } from './lib/quickapi';
import supabase from './lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
const mysessionname='q6VIka04'


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
    const req = new NextRequest(request)
    const url = req.nextUrl.clone()
    url.pathname = '/signin'
    const cookie = req.cookies.get(hostTokenName)
const mysscookie = req.cookies.get(mysessionname)
    if (cookie) {
if(mysscookie){

} else {
        const session = await explainJWT<Session>(cookie.value)
        const { data,error } = await supabase.auth.setSession(session)
        if (error||(!data.session)) {
            url.searchParams.append('nosession','true')
            return NextResponse.redirect(url)
        }

const res1 = NextResponse.next();
  res1.cookies.set(mysscookie, 'bar', {maxAge: 86400 });

  // Apply those cookies to the request
  applySetCookie(req, res1);

  return res1;
}
    } else {
        url.pathname = '/signin'
        url.searchParams.append('nocookie','true')
        url.searchParams.append('cookiename',hostTokenName)
        url.searchParams.append('cookies',JSON.stringify(req.cookies))
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
    ],
};