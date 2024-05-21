'use client'
import request from "@/request";
import { Button } from "@mui/material";

function PostForm() {
    return request(
        'post',
        '/test/formdata',
        {
            name: 'test',
            age: 20,
            file: new File(['hello world'], 'hello.txt', { type: 'text/plain' })
        },
        'formdata'
    )
}
function handleClick() {
    console.log('clicked');
    PostForm();
}

export default function Page() {
  return <div>
    <Button onClick={handleClick}>formdata</Button>
  </div>;
}