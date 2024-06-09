export interface ArticleBase {
    name: string
    index: number
    created_at: number,
    updated_at: number,
    exist: boolean
}

export interface Article extends ArticleBase {
    content: string
}
