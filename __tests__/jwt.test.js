import {generateJWT,explainJWT} from '../lib/quickapi'
let data,token,decode
describe(
    'jwt encode and decode',
    () =>  {
        it('genarate',() => {
            data = { email:'920858862@qq.com' ,password: '390234'}
            token = generateJWT(data)
            console.log(token)
            expect(token).not.toBeNull()
        })
        it('explain',() => {
            const {email,password} = explainJWT(token)
            decode = {email,password}
            console.log(decode)
            expect(JSON.stringify(decode)).toBe(JSON.stringify(data))
        })
    }
)