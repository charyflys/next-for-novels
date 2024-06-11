
declare interface ArticleBase {
    name: string
    index: number
    exist: boolean
}

declare interface Article extends ArticleBase {
    created_at: number,
    updated_at: number
}

declare interface ArticleContent extends ArticleBase {
    novelId: string
    chapterIndex: number
    content: string
}


