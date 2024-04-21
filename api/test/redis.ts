import { NextRequest, NextResponse } from "next/server";
// import redis from "../../lib/redis";

export async function GET(req:NextRequest) {
    const value = req.nextUrl.searchParams.get('key')
    const query = req.nextUrl.searchParams.getAll('text')
    return NextResponse.json({
        value,
        query
    })
}