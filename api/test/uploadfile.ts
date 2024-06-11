import { resultNoData, result, getQuery } from "../../lib/quickapi";
import { addArticle, getArticle } from "../../lib/supabase/articleBlob";


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
    if (!file) {
        return result(res)
    }
    const uploadFile = new File([file],'/test/article.txt')
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