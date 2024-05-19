'use client'

import { Grid, Typography, Paper,TextField, InputAdornment, Box, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import { SimpleNovel } from "./_components/SimpleNovel";

export default function Home() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>,) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        console.log(search);
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box 
                    component='form' 
                    onSubmit={handleSubmit}
                    display="flex"
                    alignItems="center"
                >
                    <TextField
                        name="search"
                        variant="standard"
                        fullWidth 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit">搜索</Button>
                </Box>
            </Grid>
            <Typography variant="h5" component="h2" gutterBottom>
          推荐小说
        </Typography>
        <Grid container spacing={4}>
          {/* Example Recommended Novels */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">小说 1</Typography>
              <Typography>简介...</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">小说 2</Typography>
              <Typography>简介...</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">小说 3</Typography>
              <Typography>简介...</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            我收藏的小说更新
          </Typography>
          <Grid container spacing={4}>
            {/* Example Favorite Novels */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">收藏的小说 1</Typography>
                <Typography>最新章节...</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">收藏的小说 2</Typography>
                <Typography>最新章节...</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
            {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <SimpleNovel
                        name="hello"
                        img="http://lz.sinaimg.cn/large/8a65eec0gy1hnttgax1tej207i0aidh8.jpg"
                    ></SimpleNovel>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    2
                </Paper>
            </Grid> */}
        </Grid>
    )
}