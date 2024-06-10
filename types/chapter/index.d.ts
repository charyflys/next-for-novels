declare interface ChapterBase {
    index: number
    name: string
}

declare interface Chapter extends ChapterBase{
    articles: ArticleBase[]
}