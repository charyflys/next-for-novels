import querystring from 'querystring'
import { jwtVerify, SignJWT } from 'jose'
// import jwt from 'jsonwebtoken'
import { hostTokenName, jwtSecret } from './env-values';
import { User_Profile } from './supabase/profile';
import md5 from 'md5';
import redis from './redis';
import { User } from '@supabase/supabase-js';
// jose.s
const JOSE_SECRET = new TextEncoder().encode(jwtSecret)

export async function getBody<T>(req: Request): Promise<T> {
    const body = await req.text()
    return req.headers.get('Content-Type') === "application/json" ?
        JSON.parse(body) :
        querystring.parse(body);
}

export async function getQuery(req: Request) {
    return querystring.parse(req.url.replace(/^.+?\?/, ''))
}

export function result(res: any, msg?: string, code?: string) {
    return Response.json({
        msg: msg || 'ok',
        code: code || '200',
        data: res
    })
}
export function resultNoData(msg?: string, code?: string) {
    return Response.json({
        msg: msg || 'ok',
        code: code || '200',
    })
}

export async function generateJWT(data: any) {
    // return jwt.sign(data, jwtSecret)
    const signedToken = await new SignJWT(data)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(JOSE_SECRET);
    if (!signedToken) {
        throw new Error('Failed to sign token');
    }
    return signedToken;
}

export function getCookie(req: Request): Map<string, string> {
    const cookie_header = req.headers.get('Cookie')
    if (!cookie_header) return new Map()
    const arr = cookie_header.split('; ').map(v => {
        const i = v.indexOf('=')
        return [v.substring(0, i), v.substring(i + 1)]
    }) as [string, string][]
    return new Map<string, string>(arr)
}

export async function explainJWT<T>(token: string) {
    // return jwt.verify(token, jwtSecret)
    if (!token) {
        throw new Error('Failed to verify token');
    }
    try {
        const decoded = await jwtVerify<T>(token, JOSE_SECRET);
        if (!decoded.payload) {
            throw new Error('Failed to verify token');
        }
        return decoded.payload;
    } catch (error) {
        // console.log(error);
        throw new Error(`${error}`);
    }
}

export async function resultCookie(
    res: Response,
    config: {
        name: string,
        value: string,
        secure: boolean,
        path?: string,
        maxage: number,
    }) {
    res.headers.set('Set-Cookie',
        `${config.name}=${config.value};` +
        `Path=${config.path || '/'};` +
        `Max-Age=${config.maxage};` +
        `${config.secure ? 'Secure;' : ''}`
    )
    return res
}

export async function resultToken(res: Response, token: string) {
    return resultCookie(res, {
        name: hostTokenName,
        value: token,
        secure: true,
        maxage: 2592000
    })
}

export async function authCheck(req: Request) {
    const token = getCookie(req).get(hostTokenName)
    if (!token) return { 
        check: false, 
        res: ['您未登录，请先登录', '401']
    }
    const user = await redis.get<User & { profile: User_Profile }>(md5(token))
    if (!user) return { 
        check: false, 
        res: ['登陆过期', '401']
    }
    return {
        check: true,
        user
    }
}

export type resBody<T = any> = {
    code: string,
    msg: string,
    data: T
}