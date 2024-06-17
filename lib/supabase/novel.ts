import supabase from "../supabaseClient";

const table_name = 'novel'

export async function getNovel(id: number) {
    const { error, data } = await supabase
        .from(table_name)
        .select('*')
        .eq('novel_id', id)
    if (error || (!data)) return null
    return data.length ? data[0] as Novel : null 
}

export async function getAllCol() {
    const { data, error } = await supabase
    .from(table_name)
    .select(`
        novel_id,
        title,
        status,
        hidden,
        description,
        cover,
        author_id
    `)
    return error ? [] : data as Novel[]
}

export async function getNovelsByIds(Ids: number[]) {
    const { data, error} = await supabase.from(table_name).select().in('novel_id',Ids)
    return error ? [] : data
}

export async function getNovelsFromMine(id:string) {
    const { data, error } = await supabase.from(table_name).select().eq('author_id',id)
    return error ? [] : data
}

export async function updateNovel(novel: NovelBase) {
    const id = novel.novel_id
    const obj = {} as any
    const novelcopy = novel as any
    NovelName.forEach(v => {
        obj[v] = novelcopy[v]
    })
    const { error } = await supabase
    .from(table_name)
    .update(obj)
    .eq('novel_id', id)
    if (error) return { msg: error.message, err: true }
    return { msg: 'ok' }
}

export async function updateNovelMuLu(novel: NovelMuLu) {
    const id = novel.novel_id
    const updateNovel = {
        catalogue: novel.catalogue,
        updated_at: Math.floor((Date.now() - 1704038400000)/1000)
    }
    const { error } = await supabase
    .from(table_name)
    .update(updateNovel)
    .eq('novel_id', id)
    if (error) return { msg: error.message, err: true }
    return { msg: 'ok' }
}


export async function addNovel(novel: NovelBase) {
    Object.assign(novel,{create_at: Math.floor((Date.now() - 1704038400000)/1000)})
    const { error } = await supabase
        .from(table_name)
        .insert(novel)
    if (error) return { msg: error.message, err: true }
    return { msg: 'ok' }
}

const NovelName = [
    'title',
    'status',
    'hidden',
    'desciption',
    'cover',
]
