import { getAllCol, getNovel, getNovelsByIds, updateNovel, addNovel } from "../../lib/supabase/novel";
import { authCheck, getBody, result, resultNoData } from "../../lib/quickapi";


type novelQuery = {
    type: 'search'|'info'|'persons'
    id: number
    user_id: string
}
// 接口合并，几个和获取Novel的接口合并到一起
export async function GET(req: Request) {
    const { check ,res, user} = await authCheck(req)
    if (check||(!user)) return  res?resultNoData(...res) : resultNoData('error','500')
    const { type, id, user_id } = await getBody<novelQuery>(req)
    switch(type) {
        case 'info': {
            const data = await getNovel(id)
            if (!data) return resultNoData('不存在指定的小说', '404')
            return result(data)
        }
        case 'search': {
            const data = await getAllCol()
            if (data===null) return  resultNoData('错误，请向开发者求助', '500')
            return result(data)
        }
        case 'persons': {
            // TODO 展示指定用户的收藏，鉴于现阶段压根就没做这么一个表......
        }
    }
    return resultNoData('未知的请求', '500')
}

// 新增Novel，不包含目录结构，可以使用form
export async function POST(req: Request) {
    const { check ,res, user} = await authCheck(req)
    if (check||(!user)) return  res?resultNoData(...res) : resultNoData('error','500')
    const novel = await getBody<NovelBase>(req)
    if (user.id!==novel.author_id) {
        novel.author_id = user.id
    }
    const {msg, err} = await addNovel(novel)
    return resultNoData(msg,  err? '500': '200')
}

// 更新Novel
export async function PUT(req:Request) {
    const { check ,res, user} = await authCheck(req)
    if (check||(!user)) return  res?resultNoData(...res) : resultNoData('error','500')
    const novel = await getBody<NovelBase>(req)
    if (user.id!==novel.author_id) {
        return resultNoData('你不是该文章的所有者，参与者功能暂时未开发，敬请期待','403')
    }
    const {msg, err} = await updateNovel(novel)
    return resultNoData(msg,  err? '500': '200')

}