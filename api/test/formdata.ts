import { getBody, result } from "../../lib/quickapi";

export async function POST(req:Request) {
    const obj = await getBody(req) as any
    return result(200, obj)
}