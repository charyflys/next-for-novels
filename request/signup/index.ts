import request from "..";

const url = '/auth/signup'

export function SignUp(email: string,password: string) {
    return request(
        'post',
        url,
        {
            email,
            password
        },
        'form'
    )
}

export function SignUpVerify(signupurl: string) {
    return request(
        'put',
        url,
        {
            signupurl
        },
        'form'
    )
}