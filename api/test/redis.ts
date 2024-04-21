import redis from "../../lib/redis";
import url from 'url'
export const runtime = "edge";
export async function GET(req:Request) {
    const qs = url.parse(req.url,true)
    // const key = qs.redis.get(qs.key)
    return Response.json(qs)
}
export async function POST(req:Request) {
    const body = await req.text()
    const qs = url.parse(body)
    return Response.json(qs)
}