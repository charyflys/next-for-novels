// import redis from "../../lib/redis";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export async function GET(req:Request) {
    const req1 = new NextRequest(req)
    return NextResponse.json({
        body:req1.body,
        url:req1.url,
        ip: req1.ip,
        key: req1.nextUrl.searchParams.get('key')
    })
}
export async function POST(req:Request) {
    const req1 = new NextRequest(req)
    
    return NextResponse.json({
        body:req1.body,
        url:req1.url,
        ip: req1.ip
    })
}