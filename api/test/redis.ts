import redis from "../../lib/redis";

export function GET(req:Request) {
    req.json().then(res => {
        return new Response(JSON.stringify(res))
    })
}