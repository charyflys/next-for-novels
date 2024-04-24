import querystring from 'querystring'
import jose from 'jose'
// import jwt from 'jsonwebtoken'
import { jwtSecret } from './env-values';
// jose.s
const JOSE_SECRET = new TextEncoder().encode(jwtSecret)

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

export async function generateJWT(data: any) {
    // return jwt.sign(data, jwtSecret)
    const signedToken = await new jose.SignJWT(data)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(JOSE_SECRET);
    if (!signedToken) {
        throw new Error('Failed to sign token');
    }
    return signedToken;
}

export async function explainJWT<T>(token: string) {
    // return jwt.verify(token, jwtSecret)
    if (!token) {
        throw new Error('Failed to verify token');
      }
    
    
      try {
        const decoded = await jose.jwtVerify<T>(token, JOSE_SECRET);
    
        if (!decoded.payload) {
          throw new Error('Failed to verify token');
        }
    
        return decoded.payload;
      } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
      }}

export type resBody = {
    code: string,
    msg: string,
    data?: any
}