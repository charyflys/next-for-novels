import request from "..";
import { resBody } from '@/lib/quickapi'
const url = '/novel/novel'

export async function getNovelByUser(id: string) {
    return request<resBody>('get',url,{
        type: 'persons',
        user_id: id
    })
}

export async function getNovels() {
    return request<resBody>('get',url,{
        type: 'search'
    })
}

export async function getNovelById(novelid: number) {
    return request<resBody>('get',url, {
        type: 'info',
        id: novelid
    })
}

export async function addNovel(novel: NovelBase) {
    return request<resBody>('post', url, novel, 'form')
}

export async function updateNovel(novel:NovelBase) {
    return request<resBody>('put', url, novel, 'form')
}