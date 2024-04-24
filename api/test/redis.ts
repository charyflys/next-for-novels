import redis from "../../lib/redis";
import querystring from 'node:querystring'
export const runtime = "edge";
export async function GET(req:Request) {
    const qs = querystring.parse(req.url.replace(/^.+?\?/,''))
    const key = 'key' in qs&&(false===!qs['key']) ? await redis.get(qs.key.toString()) : ''
    return Response.json(key)
}

export async function POST(req:Request) {
    const body = await req.text()
    const ContentType = req.headers.get('Content-Type') 
    const qs = ContentType === "application/json" ?
    JSON.parse(body):
    querystring.parse(body);
    if ('key' in qs&&qs.key !== undefined&&'value' in qs&&qs.value !== undefined) {
        await redis.set(qs.key,qs.value)
        return Response.json({msg: 'ok'})
    }
    return Response.json({msg: 'failed',qs,redis})

}