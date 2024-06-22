import { getAllCol, getNovel, getNovelsByIds, updateNovel, addNovel, getNovelsFromMine, updateNovelMuLu } from "../../lib/supabase/novel";
import { authCheck, getBody, getQuery, result, resultNoData } from "../../lib/quickapi";
import { getProfile, User_Profile } from "../../lib/supabase/profile";


// 接口合并，几个和获取Novel的接口合并到一起
export async function GET(req: Request) {
    const { check, res, user } = await authCheck(req)
    if (res) return resultNoData(...res)
    const { type, id, user_id } = await getQuery(req)
    switch (type) {
        case 'info': {
            const novelid = (id) as string
            const data = await getNovel(parseInt(novelid))
            if (!data) return resultNoData('不存在指定的小说', '404')
            const profile = await getProfile(data.author_id)
            return new Response(JSON.stringify({
                msg: 'ok',
                code: '200',
                data: Object.assign(data, { author: profile })
            }),
                {
                    status: 200,
                    headers: {
                        'Cache-Control': 'public, max-age=1800, immutable'
                    }
                }
            )
        }
        case 'search': {
            const data = await getAllCol()
            if (data === null) return resultNoData('错误，请向开发者求助', '500')
            const arr: [string, User_Profile][] = []
            data.forEach(v => {
            })
            for (const v of data) {
                const profile = await getProfile(v.author_id)
                profile && arr.push([v.author_id, profile])
            }
            return result({ novelList: data, profiles: arr })
        }
        case 'persons': {
            const userId = (user_id) as string
            const data = await getNovelsFromMine(userId||user.id)
            if (data === null) return resultNoData('错误，请向开发者求助', '500')
            return result(data)
        }
        case 'collection': {
            // TODO 展示指定用户的收藏，鉴于现阶段压根就没做这么一个表......
        }
        default:
            const data = await getAllCol()
            if (data === null) return resultNoData('错误，请向开发者求助', '500')
            return result(data)
    }
    // return resultNoData('未知的请求', '500')
}

// 新增Novel，不包含目录结构，可以使用form
export async function POST(req: Request) {
    const { check, res, user } = await authCheck(req)
    if (res) return resultNoData(...res)
    const novel = await getBody<NovelBase>(req)
    if (user.id !== novel.author_id) {
        novel.author_id = user.id
    }
    const { msg, err } = await addNovel(novel)
    return resultNoData(msg, err ? '500' : '200')
}

// 更新Novel
export async function PUT(req: Request) {
    const { check, res, user } = await authCheck(req)
    if (res) return resultNoData(...res)
    const novel = await getBody<NovelBase>(req)

    const purpose = await getNovel(novel.novel_id)
    if (!purpose) {
        return resultNoData('要修改的小说不存在', '404')
    }

    if (user.id !== purpose.author_id) {
        return resultNoData('你不是该文章的所有者，参与者功能暂时未开发，敬请期待', '403')
    }
    const { msg, err } ='catalogue' in novel ?await updateNovelMuLu(novel as NovelMuLu):await updateNovel(novel)
    return resultNoData(msg, err ? '500' : '200')

}