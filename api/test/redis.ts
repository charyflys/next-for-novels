import { NextRequest, NextResponse } from "next/server";
// import redis from "../../lib/redis";

export async function GET(req:NextRequest) {
    const arr = []
    for(const key in req) {
        arr.push(key)
    }
    return new Response(JSON.stringify(arr))
}