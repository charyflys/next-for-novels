import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest) {
    if(!(req instanceof NextRequest)) {
        req = new NextRequest(req)
    }
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({req,res})
    const { data: {user}} = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.redirect(new URL('/login'))
    }
    return res
}

export const config = {
    matcher: ['/']
}