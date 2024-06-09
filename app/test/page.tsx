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
function UploadFile() {
  return request(
      'post',
      '/test/uploadfile',
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
function handleClick1() {
  console.log('clicked');
  UploadFile();
}

export default function Page() {
  return <div>
    <Button onClick={handleClick}>formdata</Button>
    <Button onClick={handleClick1}>uploadfile</Button>
    </div>;
}