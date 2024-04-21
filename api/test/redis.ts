import redis from "../../lib/redis";

export default function get(req:Request) {
    return new Response(JSON.stringify(req))
}