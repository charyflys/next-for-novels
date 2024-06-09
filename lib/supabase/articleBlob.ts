import supabase from "../supabaseClient";
const bucketName = 'articles'

/**
 * 
 * @param file 上传的文章的文件
 * 会自动覆盖原本就存在的文件
 * 另外为保证路径不会出问题，应该由服务器端处理
 */
export async function addArticle(file: File) {
    const { data, error } = await supabase.storage.from(bucketName).upload(
        file.name,
        file,
        {
            upsert: true
        }
    )
    if (error||(!data)) {
        return { msg: error.message, err: true}
    }
    return { msg: 'success', path: data.path }
}

export async function getArticle(fileName:string) {
    const { data, error } = await supabase.storage.from(bucketName).download(fileName)
    if (error||(!data)) {
        return { msg: error.message, err: true}
    }
    return { msg: 'success', file: data }
}