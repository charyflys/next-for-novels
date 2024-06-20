import Mock from 'mockjs'

if (process.env.NODE_ENV === 'development') {
    Mock.mock(/\/novel/,{
        
    })

}