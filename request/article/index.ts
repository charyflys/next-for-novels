import { resBody } from "@/lib/quickapi";
import request from "..";
import lzma from 'lzma/src/lzma_worker'
const compress = lzma.LZMA.compress
const decompress = lzma.LZMA.decompress

const url = '/novel/article'

export async function getArticle(articlepath: string) {
    return await fetch('/api'+url+`?article=${articlepath}`)
    .then(res=>res.arrayBuffer())
    .then(arrbuf=> new Promise((resolve, reject) => {

        const uint8arr = new Uint8Array(arrbuf)
        decompress(uint8arr,(result,error) => {
            if (error) {
                reject({
                    code: '500',
                    msg: error.message
                })
            }
            resolve({
                code: '200',
                data: result as string,
                msg: 'ok'
            })
        })
    }))
}

export async function addArticle(data: ArticleContent) {
    return new Promise((resolve,reject) => {
        compress(data.content,8,(result,error) => {
            if (error)reject({ code:'500', msg: 'compress failed' })
            const {
                name,
                index,
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

export async function deleteArticle(data: ArticleBase) {
    return await request<resBody>(
        'delete',
        url,
        data,
        'form'
    )
}
