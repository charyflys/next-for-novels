// 考虑数据上下行问题
// 上传的数据应该不包含create和update的数据
// 相反下行应该携带

declare interface NovelBase {
    title: string
    status: boolean
    hidden: boolean
    desciption: string
    cover: string
    author_id:  string

}
// 如果只修改目录结构，应该考虑只上传catalogue部分和novel_id
declare interface Novel extends NovelBase{
    created_at: number
    updated_at: number
    catalogue: Chapter[]
}