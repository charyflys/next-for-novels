import { Grid, Card, Paper } from "@mui/material";
import { SimpleNovel } from "./_components/SimpleNovel";

export default function Home() {
    return (
        <Grid container spacing={2}>
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