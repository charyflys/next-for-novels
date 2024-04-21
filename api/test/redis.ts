// import redis from "../../lib/redis";

export async function GET(req:Response) {

    return new Response(JSON.stringify({body:req.body,url:req.url}))
}
export async function POST(req:Response) {

    return new Response(JSON.stringify({body:req.body,url:req.url}))
}