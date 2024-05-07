import { resBody } from "@/lib/quickapi";
import request from "..";

const url = '/auth/email'

export async function getEmail() {
    return await request<resBody>(
        'get',
        url
    )
}

export async function addAccessEmail(data: { email: string }) {
    return await request<resBody>(
        'post',
        url,
        data,
        'form'
    )
}

export async function deleteAccessEmail(data: { email: string }) {
    return await request<resBody>(
        'delete',
        url,
        data,
        'form'
    )
}