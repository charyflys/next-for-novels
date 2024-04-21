export const GET = (req,res) => {
    let data = ''
    req.on('data',chunk => data+=chunk)
    req.on('end', async() => {
        data = JSON.parse(data)
        if('妮露今天吃什么？妮露今天故事集'===data.check)
        res.send(JSON.stringify({message:"登陆成功"}))
        else {
            res.send(JSON.stringify({message:'登陆失败'}))
            //,input:data.check,output: '妮露今天吃什么？妮露今天故事集',data,checkResult:'妮露今天吃什么？妮露今天故事集'===data.check
        }
    })
}