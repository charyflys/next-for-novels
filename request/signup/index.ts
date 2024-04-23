import { resBody } from "@/lib/quickapi";
import request from "..";

const url = '/auth/signup'

export function SignUp(email: string,password: string) {
    return request<resBody>(
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
    return request<resBody>(
        'put',
        url,
        {
            signupurl
        },
        'form'
    )
}