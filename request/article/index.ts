import { resBody } from "@/lib/quickapi";
import request from "..";
import { Article, ArticleBase } from "@/types/Article";
import { compress, decompress } from 'lzma'

const url = '/auth/article'

export async function getArticle(articlepath: string) {
    return await fetch(url+`?article=${articlepath}`)
    .then(res=>res.arrayBuffer())
    .then(arrbuf=> {
        const uint8arr = new Uint8Array(arrbuf)
        decompress(uint8arr,(result,error) => {
            console.log(result,error)
        })
    })
}

export async function addArticle(data: Article) {
    return new Promise((resolve,reject) => {
        compress(data.content,8,(result,error) => {
            if (error)reject({ code:'500', msg: 'compress failed' })
            const {
                name,
                index,
                created_at,
                updated_at,
                exist,
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
                    content: result
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
