import {create} from 'zustand'
export const useNovelStore = create<NovelStore>((set) => ({
    Novel: null as NovelWithAuthor|null,
    updateNovel: (newUser: NovelWithAuthor|null) => set({Novel: newUser})
}))


type NovelStore = {
    Novel: NovelWithAuthor|null,
    updateNovel: (newUser: NovelWithAuthor|null) => void
}