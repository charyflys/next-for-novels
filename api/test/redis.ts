// import redis from "../../lib/redis";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export async function GET(req:NextRequest) {

    return NextResponse.json({body:req.body,url:req.url})
}
export async function POST(req:NextRequest) {

    return NextResponse.json({body:req.body,url:req.url})
}