import querystring from 'node:querystring'

export async function getBody<T> (req: Request): Promise<T> {
    const body = await req.text()
    return req.headers.get('Content-Type') === "application/json" ?
    JSON.parse(body):
    querystring.parse(body);
}

export async function getQuery(req:Request) {
    return querystring.parse(req.url.replace(/^.+?\?/,''))
}

export function result(res:any,msg?: string,code?: string) {
    return Response.json({
        msg: msg||'ok',
        code: code||'200',
        data: res
    })
}
export function resultNoData(msg?:string,code?:string) {
    return Response.json({
        msg: msg||'ok',
        code: code||'200',
    })
}

export type resBody = {
    code: string,
    msg: string,
    data?: any
}