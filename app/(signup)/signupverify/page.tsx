'use client'
import { useSearchParams } from 'next/navigation'
import { SignUpVerify } from '@/request/signup'
import { AxiosError } from 'axios'
export default function Page() {
    const param = useSearchParams()
    const signupurl = param.get('signupurl')
    if (signupurl) {
        SignUpVerify(signupurl)
        .then(res => {

        })
        .catch((err: AxiosError) => {

        })
    }
    return <div>

    </div>
}