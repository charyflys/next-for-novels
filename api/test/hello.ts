export function GET(req:Request) {
    return Response.json(req.headers)
}