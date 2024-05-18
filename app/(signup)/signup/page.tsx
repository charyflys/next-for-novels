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
import { SignUp as SignUpRequest } from '@/request/signup';
import { useAlertStore } from '@/stores/Alert'

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  const pushAlert = useAlertStore(state => state.setMsgAndColorAndOpen)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string
    const password = data.get('password') as string
    if (!(email&&password)) {
      // TODO
      return
    }
    SignUpRequest(email, password)
    .then(res => {
      console.log(res)
      pushAlert('请前往邮箱确认您的注册')
    })
    .catch((res) => {
      if ('msg' in res){
        console.log(res.msg,res.msg||res.message)
        pushAlert(res.msg||res.message,'error')
      }
        
    })
    
    // if (!res) (setMsg(res),OpenAlert())
  };
//   const [email,setEmail] = useState('')
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
            注册
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="邮箱"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="密码"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              注册
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                 已经有账号了？登陆
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}