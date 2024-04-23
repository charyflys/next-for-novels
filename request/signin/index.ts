import { resBody } from "@/lib/quickapi";
import request from "..";

const url = '/auth/signin'

export function SignIn(email: string,password: string) {
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
