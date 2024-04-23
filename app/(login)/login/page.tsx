'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useUserStore } from '@/stores/User';
import { SignIn } from '@/request/signin';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { supabase } from "@/lib/supabaseMiddle/supabaseComponent";
// TODO remove, this demo shouldn't need to reset the theme.t

export default function Login() {
  const router = useRouter()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string,
      password= data.get('password') as string;
    if (!(email&&password)){
      // TODO
      return
    }
    //SignIn(email,password)
    //.then((res) => {
    //  console.log(res)
    //  if(res.code==='200')router.push('/')
    //})
    //.catch((err:AxiosError) => {
    //  console.error(err)
    //  router.push('/login')
    //})


    const { error, data } = await supabase.auth.signInWithPassword({
        email,password
    })
    if (error) {
        return
    }
    console.log(data)
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="记住我"
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
                <Link href="#" variant="body2">
                  {"还没有账号？注册"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}