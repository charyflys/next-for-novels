import { NextRequest, NextResponse } from "next/server";

export async function quickRequest(req: Request,querys: string[]) {
    const req1 = new NextRequest(req)
    let body
    if (req1.method.toLocaleLowerCase()!=='get')
        body = await req.text()
}   