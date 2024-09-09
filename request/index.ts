import axios from "axios";
import qs from "qs";
const http = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

enum HttpType {
    OK= 200,
}

http.interceptors.request.use((config) => {
  // console.log(config.data)
  try {
    if ('ContentType' in config&&config.ContentType === "application/x-www-form-urlencoded") {
      config.data =
        config.data && qs.stringify(config.data, { indices: false });
    }
  } catch (e) {
    // console.log(e);
  }
  // console.log(config);
  return config;
});

http.interceptors.response.use(
  async (response) => {
    // HTTP响应状态码正常
    if (response.status === 200) {
      
        const { code } = response.data;
        if (code&&typeof code === 'string'&&/^[23]\d\d$/.test(code)){
          return Promise.resolve(response)
        }
        // 使用js原生方法处理登陆态丢失的问题，强制跳转
        if (code&&typeof code === 'string'&&code==='401') {
          window.location.replace('/signin')
          return Promise.reject(response.data)
        }
        return Promise.reject(response.data)
    } else {
      console.error("服务器出错或者连接不到服务器")
      return Promise.reject(response);
    }
  },
  (error) => {

    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK')
    // KMessage("连接不到服务器",'danger')
    console.error("连接不到服务器")

    return Promise.reject(error);
  }
);



export default function request<T> (
    method: 'post'|'get'|'put'|'delete', 
    url: string, 
    submitData?: any, 
    ContentType?: 'form'|'file'|'files'|'rest'|'json'|'formdata') {
  let file: FormData,contentType:string
  switch (ContentType) {
    case "form":
      contentType = "application/x-www-form-urlencoded";
      break;
    case "file":
      contentType = "multipart/form-data";
      file = new FormData();
      file.append('imgFile',submitData as Blob);
      submitData = file;
      break;
    case "formdata":
        contentType = "multipart/form-data";
      file = new FormData();
      for(const key in submitData){
        if(!(submitData[key] instanceof Array)){
          console.log(submitData[key]);
          file.append(key,submitData[key]);
        } else {
          submitData[key].forEach((item:any) => {
            file.append(key,item);
          });
        }
      }
      // for(let i:number = 0;i<submitData.length;i++) {
      //   file.append('file',submitData[i]);
      // }
      submitData = file;
      break;
    case "rest":
      url+='/'+submitData;
      submitData=null;
      break;
    default:
        contentType = "application/json";
  }
  return new Promise<T>((resolve, reject) => {
    const reqParams = {
      method,
      url,
      [method.toLowerCase() === "get" //|| method.toLowerCase() === "delete"
        ? "params"
        : "data"]: submitData,
        contentType,
      // paramsSerializer: function (params) {
      //   return qs.stringify(params, { indices: false });
      // },
    };
    http(reqParams)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
