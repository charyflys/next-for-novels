declare interface ArticleBase {
    name: string
    index: number
    created_at: number,
    updated_at: number,
    exist: boolean
}

declare interface Article extends ArticleBase {
    content: string
}

declare interface ArticleNoBody extends ArticleBase {
    novelId: string
    chapterIndex: number
}

declare interface ArticleFull extends Article {
    novelId: string
    chapterIndex: number
}
