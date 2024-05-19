'use client'

import { Grid, Card, Paper,TextField, InputAdornment, Box, Button } from "@mui/material";
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
                <Box component='form' onSubmit={handleSubmit}>
                    <TextField
                        name="search"
                        label="搜索"
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
            <Grid item xs={12} md={8} lg={9}>
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
            </Grid>
        </Grid>
    )
}