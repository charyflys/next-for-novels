import { getBody, result } from "../../lib/quickapi";
import { addArticle, getArticle } from "@/lib/supabase/articleBlob";


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
        return result(200, res)
    }
    const uploadFile = new File([file],'/test/article.txt')
    const re = await addArticle(uploadFile)
    if (re.err) {
        return result(403,re.msg)
    }
    return result(200,re.path)
}