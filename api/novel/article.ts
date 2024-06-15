import { resultNoData, result, getQuery, authCheck } from "../../lib/quickapi";
import { addArticle, getArticle } from "../../lib/supabase/articleBlob";

// TODO 获取目标对象是否有权限对该novel进行修改
export async function POST(req:Request) {
    const obj = await req.formData()
    const res = {} as any
    let file:File|null = null
    obj.forEach((item,key) => {
        res[key] = item
        if (item instanceof Blob) {
            // res[key+'Size'] = item.size
            // res[key+'Type'] = item.type
            // res[key+'Name'] = item.name
            // res[key+'LastModified'] = item.lastModified
            file = item
        }
    })  
    // const { check ,res:response, user} = await authCheck(req)
    // if (check||(!user)) return res

    if (!file) {
        return result(res,'no file','500')
    }
    const article = res as ArticleContent
    const uploadFile = new File(
        [file], 
        `/${article.novelId}/${article.chapterIndex}/${article.index}`
    )
    const re = await addArticle(uploadFile)
    if (re.err) {
        return resultNoData(re.msg,'403')
    }
    return resultNoData(re.path)
}

export async function GET(req:Request) {
    const { name } = await getQuery(req)
    const re = await getArticle(name as string)
    if (re.err) {
        return resultNoData(re.msg,'403')
    }
    return new Response(re.file,
        {
            status: 200,
            headers: {
                'Cache-Control': 'public, max-age=864000, immutable'
            }
        }
    )
}