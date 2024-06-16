'use client'
import { Grid, Typography, Paper, TextField, InputAdornment, Box, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import BookCard from "../_components/BookCard";
import { useState } from "react";
import { getNovels } from "@/request/novel";
export default function SearchView() {
    const [novelList,setNovelList] = useState<NovelWithAuthor[]>([])
    const [search, setSearch] = useState<string>('')
    if (!novelList) {
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
    function handleSubmit(e: React.FormEvent<HTMLFormElement>,) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        setSearch(search)
        console.log(search);
    }
    const novel: NovelWithAuthor = {
        author: {
            role: null,
            nickname: '什么',
            status: false,
            muted: null,
            avatar: null
        },
        created_at: 0,
        updated_at: 0,
        catalogue: [
            {
                articles: [
                    {
                        path: "",
                        name: "",
                        index: 0,
                        exist: false
                    }
                ],
                index: 0,
                name: ""
            }
        ],
        novel_id: 0,
        title: "人",
        status: false,
        hidden: false,
        desciption: `由于工作过度，注意到的时候被卡车撞了的主人公伊中雄二。
    “啊，不该这么工作的。下一次要悠闲地在乡下生活……”也许是通过了雄二这样的愿望，他与神相遇，转生到了异世界的乡下。作为乡下贵族的次子阿尔弗里特=斯洛伍雷特获得了新生的他，在乡下会过着快乐而悠闲的生活吗？
    （PS：购书卷ID265）`,
        cover: "https://s2.loli.net/2024/06/10/baJvmKlgDG6oTLO.png",
        author_id: "dasfaew232f24"
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

