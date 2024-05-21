'use client'
import request from "@/request";
import { Button } from "@mui/material";

function PostForm() {
    return request(
        'post',
        '/api/test/formdata',
        {
            name: 'test',
            age: 20,
            file: new File(['hello world'], 'hello.txt', { type: 'text/plain' })
        }
    )
}

export default function Page() {
  return <div>
    <Button onAbort={PostForm}>formdata</Button>
  </div>;
}