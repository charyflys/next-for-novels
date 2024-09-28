import { resBody } from "@/lib/quickapi";
import request from "..";

const url = '/log/'

export async function getStoryList() {
    return await request<resBody<string[]>>(
        'get',
        url+'GetStoryNames'
    )
}

export async function getStoryTags(story_Name: string) {
    return await request<resBody<{tag_list:string[]}>>(
        'post',
        url+'GetMessageArrayList',
        {story_Name},
        'json'
    )
}

export async function getTagInnerList(story_Name:string, array_id: string) {
    return await request<resBody<{DataList: LogContent[]}>>(
        'post',
        url+'GetMessageArrayData',
        {story_Name,array_id},
        'json'
    )
}

export async function deleteStoryByName(name:string) {
    return await request<resBody>(
        'delete',
        url+'DeleteStoryByName',
        {name},
        'json'
    )
}