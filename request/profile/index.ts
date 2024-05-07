import { resBody } from "@/lib/quickapi";
import request from "..";

const url = '/auth/profile'

export async function getProfile() {
  const res = await request<resBody>(
        'get',
        url
    )
  return res
}
