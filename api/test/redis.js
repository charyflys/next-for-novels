import redis from "@/lib/redis";

export default function get(req) {
    return new Response(JSON.stringify(req))
}