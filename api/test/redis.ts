import redis from "@/lib/redis";
import { NextRequest } from "next/server";

export default function get(req:NextRequest) {
    return new Response(JSON.stringify(req))
}