// import redis from "../../lib/redis";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export async function GET(req:Request) {
    const req1 = new NextRequest(req)
    req1.nextUrl.searchParams
    return NextResponse.json({
        body:req1.body,
        url:req1.url,
        ip: req1.ip,
        key: req1.nextUrl.searchParams.get('key'),
        query: req1.nextUrl.searchParams
    })
}
export async function POST(req:Request) {
    const body = await req.text()
    
    return NextResponse.json({
        body:body
    })
}