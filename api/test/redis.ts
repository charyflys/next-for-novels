import redis from "@/lib/redis";
import { NextRequest } from "next/server";

export function Get(req:NextRequest) {
    return new Response(JSON.stringify(req))
}