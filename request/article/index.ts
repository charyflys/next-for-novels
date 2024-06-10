import { resBody } from "@/lib/quickapi";
import request from "..";
import lzma from 'lzma/src/lzma_worker'
const compress = lzma.LZMA.compress
const decompress = lzma.LZMA.decompress

const url = '/auth/article'

export async function getArticle(articlepath: string) {
    return await fetch('/api'+url+`?article=${articlepath}`)
    .then(res=>res.arrayBuffer())
    .then(arrbuf=> {
        const uint8arr = new Uint8Array(arrbuf)
        decompress(uint8arr,(result,error) => {
            if (error) {
                return {
                    code: '500',
                    msg: error.message
                }
            }
            return {
                code: '200',
                data: result,
                msg: 'ok'
            }
        })
    })
}

export async function addArticle(data: ArticleFull) {
    return new Promise((resolve,reject) => {
        compress(data.content,8,(result,error) => {
            if (error)reject({ code:'500', msg: 'compress failed' })
            const {
                name,
                index,
                created_at,
                updated_at,
                exist,
                novelId,
                chapterIndex,
                
            } = data
            resolve(request<resBody>(
                'post',
                url,
                {
                    name,
                    index,
                    created_at,
                    updated_at,
                    exist,
                    content: new Blob([new Uint8Array(result)]),
                    novelId,
                    chapterIndex,
                },
                'formdata'
            ))
        })
    })
}

export async function deleteArticle(data: ArticleNoBody) {
    return await request<resBody>(
        'delete',
        url,
        data,
        'form'
    )
}
