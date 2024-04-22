"use client"
import { Alert, Snackbar } from "@mui/material";
import { useAlertStore } from '@/stores/Alert'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function AllLayout({ children, props: { showcopyright } }: Readonly<{
  children: React.ReactNode,
  props: {
    showcopyright: any
  }
}>) {
  const open = useAlertStore((state) => state.open)
  const msg = useAlertStore((state) => state.msg)
  const color = useAlertStore(state => state.severity)
  const setClose = useAlertStore((state) => state.Close)
  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setClose();
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={color}
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>
      <Copyright sx={{
        display: showcopyright ? '' : 'none'
      }}></Copyright>
    </ThemeProvider>
  )
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}