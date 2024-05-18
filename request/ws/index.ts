import { resBody } from "@/lib/quickapi";
import request from "..";

const url = '/auth/ws'

export async function wsLogin() {
  return request<{ [index: string]: string }>(
        'get',
        url,
    )
}