import { NextRequest, NextResponse } from 'next/server';
import { hostTokenName } from './lib/env-values'
import { explainJWT } from './lib/quickapi';
import supabase from './lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
export default async function middleware(request: Request) {
    const req = new NextRequest(request)
    const cookie = req.cookies.get(hostTokenName)
    if (cookie) {
        const session = explainJWT(cookie.value) as Session
        const { data,error } = await supabase.auth.setSession(session)
        if (error||(!data.session)) {
            return NextResponse.redirect('/signin')
        }
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