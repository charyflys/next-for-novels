import { getNovel, updateNovelMuLu } from "../../lib/supabase/novel";
import { resultNoData, result, getQuery, authCheck, getBody } from "../../lib/quickapi";
import { addArticle, checkArticleList, getArticle } from "../../lib/supabase/articleBlob";
import md5 from "md5";

// TODO 获取目标对象是否有权限对该novel进行修改
export async function POST(req:Request) {
    const obj = await req.formData()
    const res = {} as any
    let file:File|null = null
    obj.forEach((item,key) => {
        res[key] = item
        if (item instanceof Blob) {
            file = item
        }
    })  
    const { user, res:checkres } = await authCheck(req)
    if (checkres) return resultNoData(...checkres)
    if (!file) {
        return result(res,'no file','500')
    }
    const article = res as ArticleContent

    const novel = await getNovel(article.novelId)
    if (!novel) {
        return resultNoData('要修改的小说不存在','404')
    }
    if (user.id!==novel.author_id) {
        return resultNoData('你没有修改权限','403')
    }
    const chapter = novel.catalogue.find(v=>v.index===article.chapterIndex-0)
    if (!chapter) {
        return resultNoData('不存在对应的章节'+article.chapterIndex,'404')
    }
    const purposeArticle = chapter.articles.find(v=>v.index === article.index) as  Article

    const uploadFile = new File(
        [file], 
        `${user.id}/n${novel.novel_id}-c${chapter.index}-a${article.index}`
    )
    const re = await addArticle(uploadFile)
    if (re.err) {
        return resultNoData(re.msg,'403')
    }
    const {name,index,exist} = article
    if (!purposeArticle) {
        chapter.articles.push({
            name,
            index,
            exist,
            created_at: Math.floor(Date.now()/1000),
            path: uploadFile.name
        })
    } else {
        purposeArticle.exist = exist
        purposeArticle.index = index
        purposeArticle.name = name
        purposeArticle.updated_at = Math.floor(Date.now()/1000)
    }
    await updateNovelMuLu({ novel_id: novel.novel_id, catalogue: novel.catalogue})
    return resultNoData(re.path)
}

export async function GET(req:Request) {
    const { article } = await getQuery(req)
    const re = await getArticle(article as string)
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

export async function PUT(req: Request) {
    const { user, res:checkres } = await authCheck(req)
    if (checkres) return resultNoData(...checkres)
    const { msg, err, filelist} = await checkArticleList(user.id)
    if(err) {
        return resultNoData(msg, '500')
    }
    return result(filelist)
}