import { getBody, result } from "../../lib/quickapi";



export async function POST(req:Request) {
    const obj = await req.formData()
    const res = {} as any
    obj.forEach((item,key) => {
        res[key] = item
        if (item instanceof Blob) {
            res[key] = item.size
        }
    })  
    // const form = new multiparty.Form();
    // form.parse(req)
    // const obj = await req.text()
    return result(200, res)
}