import { getBody, result } from "../../lib/quickapi";

export async function POST(req:Request) {
    const obj = await req.text()
    return result(200, obj)
}