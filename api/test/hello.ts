export function GET(req:Request) {
    return Response.json({setCookie:req.headers.getSetCookie(),cookie: req.headers.get('Cookie')})
}