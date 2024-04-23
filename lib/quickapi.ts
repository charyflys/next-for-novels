import querystring from 'node:querystring'
import jwt from 'jsonwebtoken'
import { jwtSecret } from './env-values';
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

export function generateJWT(data: any) {
    return jwt.sign(data, jwtSecret)
}

export function explainJWT(token: string) {
    return jwt.verify(token, jwtSecret)
}

export type resBody = {
    code: string,
    msg: string,
    data?: any
}