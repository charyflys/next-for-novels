'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useAlertStore } from '@/stores/Alert'

import { SignIn } from '@/request/signin';
import { useLocalStorage } from '@/lib/frontquick';
// TODO remove, this demo shouldn't need to reset the theme.t

export default function Login() {
  const router = useRouter()
  const pushAlert = useAlertStore(state => state.setMsgAndColorAndOpen)
  const [showAdmin, setShowAdmin] = useLocalStorage<boolean>('showAdmin', false)
  const [render, setRender] = useLocalStorage<{ render: boolean, timestamp: number }>('render', { render: false, timestamp: 0 })

  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string,
      password= data.get('password') as string;
    if (!(email&&password)){
      // TODO
      return
    }
    SignIn(email,password)
    .then((res) => {
      // console.log(res)
      if(res.code==='200'){
        setShowAdmin(false)
        setRender({ render: false, timestamp: 0 })
        router.push('/')
        pushAlert('登录成功','success')
      }
    })
    .catch((err) => {
      console.error(err)
      if ('msg' in err)pushAlert(err.msg||err.message,'error')
      // router.push('/signin')
    })
};

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            登陆
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登陆
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  忘记密码？
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"还没有账号？注册"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}