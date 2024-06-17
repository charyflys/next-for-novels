'use client'
import qs from 'qs'
import { Grid, Typography, Paper, TextField, InputAdornment, Box, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import BookCard from "../_components/BookCard";
import { useEffect, useState } from "react";
import { getNovels } from "@/request/novel";
// import { useSearchParams,useRouter } from 'next/navigation'
export default function SearchView() {
    const [novelList, setNovelList] = useState<NovelWithAuthor[]>([])
    // const searchParams  = useSearchParams()
    // const router = useRouter()
    // const querySearch = searchParams.get('q')
    // const [search, setSearch] = useState<string>(querySearch||'')
    const [search, setSearch] = useState<string>('')
    const getSearch = () =>setTimeout(() => {
        if (!window) {
            getSearch()
            return
        }
        const { q } = qs.parse(window.location.search.replace('?', '')) as { q: string | undefined }
        setSearch(q||'')
    },10)
    getSearch()
    if (novelList.length === 0) {
        getNovels().then(res => {
            if (res.data) {
                const { novelList: list, profiles }: { novelList: Novel[], profiles: [string, User_Profile][] } = res.data
                const map = new Map(profiles)
                setNovelList(list.map(v => {
                    const profile = map.get(v.author_id) as User_Profile
                    return Object.assign(v, { author: profile })
                }))
            }
        })
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>,) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        setSearch(search)
        // router.replace(`/search?q=${search}`)
        const url = new URL(window.location.href)
        url.searchParams.set('q',search)
        window.history.pushState({},'',url)
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
                        defaultValue={search}
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
                        .map(v =>
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

