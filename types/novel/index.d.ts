// 考虑数据上下行问题
// 上传的数据应该不包含create和update的数据
// 相反下行应该携带

declare interface NovelBase {
    novel_id: number
    title: string
    status: boolean
    hidden: boolean
    description: string
    cover: string
    author_id:  string

}
// 如果只修改目录结构，应该考虑只上传catalogue部分和novel_id
declare interface Novel extends NovelBase{
    created_at: number
    updated_at: number
    catalogue: Chapter[]
}

declare interface NovelWithAuthor extends Novel{
    author: User_Profile
}

declare interface NovelMuLu {
    novel_id: number
    catalogue: Chapter[]
}

declare type User_Profile = {
    role: 'super' | 'admin' | null,
    nickname: string | undefined,
    status: boolean,
    muted: number | null,
    avatar: string | null,
}