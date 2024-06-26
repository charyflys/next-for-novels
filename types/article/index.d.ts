
declare interface ArticleBase {
    name: string
    index: number
    exist: boolean
}

declare interface Article extends ArticleBase {
    path: string
    created_at?: number,
    updated_at?: number
}

declare interface ArticleContent extends ArticleBase {
    novelId: number
    chapterIndex: number
    content: string
}


