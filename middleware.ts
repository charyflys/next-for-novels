import { NextRequest, NextResponse } from 'next/server';
import { hostTokenName } from './lib/env-values'
import { explainJWT } from './lib/quickapi';
import supabase from './lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
export default async function middleware(request: Request) {
    const req = new NextRequest(request)
    const url = req.nextUrl.clone()
    url.pathname = '/signin'
    const cookie = req.cookies.get(hostTokenName)
    if (cookie) {
        const session = await explainJWT<Session>(cookie.value)
        const { data,error } = await supabase.auth.setSession(session)
        if (error||(!data.session)) {
            return NextResponse.redirect(url)
        }
    }
    return NextResponse.redirect(url)
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