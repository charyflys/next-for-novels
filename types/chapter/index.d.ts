declare interface ChapterBase {
    index: number
    name: string
}

declare interface Chapter extends ChapterBase{
    articles: ArticleBase[]
}
// 上行数据应包含novelid，需要考虑是通过继承接口
// 还是通过Object.assgin来处理