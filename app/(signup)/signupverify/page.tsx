'use client'
import { useSearchParams } from 'next/navigation'
import { SignUpVerify } from '@/request/signup'
import { AxiosError } from 'axios'
import { Suspense } from 'react'
import { useAlertStore } from '@/stores/Alert'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
export default function Page() {
    return <Suspense>
        <InnerParams />
    </Suspense>
}

function InnerParams() {
    const param = useSearchParams()
    const signupurl = param.get('signupurl')
    const setAlert = useAlertStore(state=> state.setMsgAndColorAndOpen)
    if (signupurl) {
        SignUpVerify(signupurl)
        .then(res => {
            setAlert('成功注册！将在3秒后跳转')
            setTimeout(() => {
                location.href='/signin'
            },3000)
        })
        .catch((err: AxiosError) => {

        })
    }
    return      <Card sx={{maxWidth:500,margin: 'auto',marginTop:10}}>
    <CardMedia
      sx={{ height: 500 }}
      image="https://s2.loli.net/2024/06/10/baJvmKlgDG6oTLO.png"
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        正在执行注册最后一步，请等待
      </Typography>
      <Typography variant="body2" color="text.secondary">
        十分欢迎你加入本社区
      </Typography>
    </CardContent>

  </Card>
  
}