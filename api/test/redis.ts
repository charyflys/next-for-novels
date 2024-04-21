import redis from "../../lib/redis";
import querystring from 'node:querystring'
export const runtime = "edge";
export async function GET(req:Request) {
    const qs = querystring.parse(req.url.replace(/^.+?\?/,''))
    // const key = qs.redis.get(qs.key)
    return Response.json(qs)
}
export async function POST(req:Request) {
    const body = await req.text()
    const ContentType = req.headers.get('Content-Type') 
    const qs = ContentType === "application/json" ?
    JSON.parse(body):
    querystring.parse(body)
    return Response.json({qs,ContentType})
}