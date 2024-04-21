import redis from "../../lib/redis";

export function GET(req:Request,res: Response) {
    return new Response(JSON.stringify('query' in req&&req.query as any))
}