'use client'
import { Grid, Typography, Paper, TextField, InputAdornment, Box, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import BookCard from "../_components/BookCard";
import { useState } from "react";
import { getNovels } from "@/request/novel";
import { useRouter } from 'next/router'
export default function SearchView() {
    const [novelList,setNovelList] = useState<NovelWithAuthor[]>([])
    const [search, setSearch] = useState<string>('')
    const router = useRouter()
    if (novelList.length===0) {
        getNovels().then(res => {
            if(res.data) {
                const { novelList:list, profiles }:{novelList: Novel[],profiles:[string,User_Profile][]} = res.data
                const map = new Map(profiles)
                setNovelList(list.map(v => {
                    const profile = map.get(v.author_id) as User_Profile
                    return Object.assign(v, { author: profile })
                }))
            }
        })
    }
    console.log(router.query)
    function handleSubmit(e: React.FormEvent<HTMLFormElement>,) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        setSearch(search)
        console.log(search);
        
    }
    return (
        <Grid container spacing={2} sx={{
            margin: 0,
            width: '100%'
        }}>
            <Grid item xs={12} sx={{
                marginBottom: 2
            }}>
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
            <Grid container spacing={4} sx={{
                display: 'grid',
                justifyContent: 'space-around',
                gridGap: '10px',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 500px))'
            }}>
                {
                    novelList
                    .filter(v => v.title.includes(search))
                    .map(v=>
                        (<Grid item key={v.novel_id}>
                            <BookCard novel={v} />
                        </Grid>)
                    )
                }
                {/* <Grid item>
                    <BookCard novel={novel} />
                </Grid> */}

            </Grid>
        </Grid>
    )
}

