'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Grid, Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemButton, ListItemText, Skeleton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getNovelById } from '@/request/novel';
import { ExpandLess,ExpandMore } from '@mui/icons-material';

export default function BookDetailPage() {
    const [novel, setNovel] = useState<NovelWithAuthor>()

    const [showChapter, setChapter] = useState('')
    const errPush = () => {
        location.replace('/search')
    }
    useEffect(() => {
        if (!novel) {
            const res = /\/novel\/(\d+)/.exec(location.pathname)
            if (!res) {
                errPush()
            }
            const result = res as RegExpExecArray
            getNovelById(parseInt(result[1])).then(res => {
                const novelFromServer = res.data as NovelWithAuthor
                setNovel(novelFromServer)
                const chapter = novelFromServer.catalogue[0]
                if (chapter) setChapter(chapter.name)
            })
                .catch(() => {
                    errPush()
                })
        }
    })
    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            <Card sx={{ display: 'flex', mb: 2, }}>
                <CardMedia
                    component="img"
                    sx={{ width: 100,height:150,marginLeft:2,marginTop:2 }}
                    image={novel?.cover || 'https://s2.loli.net/2024/06/16/EMq4BWVYrRuegnU.jpg'} // 替换为你的图像路径
                    alt={novel?.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {novel ? novel.title : <Skeleton variant='text' height={32} width={400} />}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                            作者：{novel ? novel.author.nickname : <Skeleton variant='text' height={27} width={150} sx={{ display: 'inline-block' }} />}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                            创建时间：{novel ? new Date((novel.created_at+1704038400)*1000).toLocaleString() : <Skeleton variant='text' height={20} width={150} sx={{ display: 'inline-block' }} />}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                            更新时间：{novel ? new Date((novel.updated_at+1704038400)*1000).toLocaleString() : <Skeleton variant='text' height={20} width={150} sx={{ display: 'inline-block' }} />}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                            简介：
                        </Typography>
                        {novel ?
                            <Typography variant="body2" component="div" sx={{ minHeight: 100,paddingRight:1 }}>{novel.description}</Typography>
                            : (
                                <Typography>
                                    <Skeleton variant='text' height={20} />
                                    <Skeleton variant='text' height={20} />
                                    <Skeleton variant='text' height={20} />
                                    <Skeleton variant='text' height={20} />
                                    <Skeleton variant='text' height={20} />
                                </Typography>
                            )}
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
                        <Button variant="contained" color="secondary" sx={{ marginRight: 1 }}>
                            收藏
                        </Button>
                        <Button variant="contained" color="success">
                            分享
                        </Button>
                    </Box>
                </Box>
            </Card>
            <Typography variant='h5' display={'flex'} justifyContent={'center'}>目录</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} spacing={1}>
                    <List sx={{
                        maxHeight: '68vh',
                        overflowY: 'auto'
                    }}>
                        {
                            novel ? novel.catalogue.map(v => {
                                return (
                                    <>
                                        <ListItemButton onClick={() => setChapter(v.name)}>
                                            <ListItemText primary={`第${v.index}章    ${v.name}`} />
                                            {showChapter !== v.name ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={showChapter === v.name} timeout='auto' unmountOnExit>
                                            <List component='div' disablePadding>
                                                {v.articles.map(a => {
                                                    return (
                                                        <ListItemButton sx={{ pl:4 }} key={a.path} href={`/novel/${novel.novel_id}/${a.path.split('/').join('&')}`}>
                                                            <ListItemText primary={`第${a.index}节  ${a.name}`}></ListItemText>
                                                        </ListItemButton>
                                                    )
                                                })}
                                            </List>
                                        </Collapse>
                                    </>
                                    // <Grid item xs={12} md={6} key={v.index} sx={{ maxWidth: '100%' }}>

                                    //     <Accordion sx={{ maxWidth: '100%' }}>
                                    //         <AccordionSummary sx={{ maxWidth: '100%' }} expandIcon={<ExpandMoreIcon />}>
                                    //             <Typography>{v.name}</Typography>
                                    //         </AccordionSummary>
                                    //         <AccordionDetails>
                                    //             <List>
                                    //                 {v.articles.map(a => {
                                    //                     return (
                                    //                         <ListItemButton key={a.path}>
                                    //                             <ListItemText primary={a.name}></ListItemText>
                                    //                         </ListItemButton>
                                    //                     )
                                    //                 })}
                                    //             </List>
                                    //         </AccordionDetails>
                                    //     </Accordion>
                                    // </Grid>
                                )
                            })
                                : (
                                    <>
                                        <Skeleton>
                                            <Grid item xs={12} md={6}>
                                                <Accordion sx={{ maxWidth: '100%' }}>
                                                    <AccordionSummary sx={{ maxWidth: '100%' }} expandIcon={<ExpandMoreIcon />}>
                                                        <Typography width={'100vw'}>你</Typography>
                                                    </AccordionSummary>
                                                </Accordion>
                                            </Grid>
                                        </Skeleton>
                                        <Skeleton>
                                            <Grid item xs={12} md={6}>
                                                <Accordion sx={{ maxWidth: '100%' }}>
                                                    <AccordionSummary sx={{ maxWidth: '100%' }} expandIcon={<ExpandMoreIcon />}>
                                                        <Typography width={'100vw'}>你</Typography>
                                                    </AccordionSummary>
                                                </Accordion>
                                            </Grid>
                                        </Skeleton>
                                        <Skeleton>
                                            <Grid item xs={12} md={6}>
                                                <Accordion sx={{ maxWidth: '100%' }}>
                                                    <AccordionSummary sx={{ maxWidth: '100%' }} expandIcon={<ExpandMoreIcon />}>
                                                        <Typography width={'100vw'}>你</Typography>
                                                    </AccordionSummary>
                                                </Accordion>
                                            </Grid>
                                        </Skeleton>
                                        <Skeleton>
                                            <Grid item xs={12} md={6}>
                                                <Accordion sx={{ maxWidth: '100%' }}>
                                                    <AccordionSummary sx={{ maxWidth: '100%' }} expandIcon={<ExpandMoreIcon />}>
                                                        <Typography width={'100vw'}>你</Typography>
                                                    </AccordionSummary>
                                                </Accordion>
                                            </Grid>
                                        </Skeleton>

                                    </>
                                )
                        }
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}
