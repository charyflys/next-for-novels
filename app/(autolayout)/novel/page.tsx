'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Chip, Grid, Stack, Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemButton, ListItemText, Skeleton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getNovelById } from '@/request/novel';

const tags = ['web', '王都调查篇', '村子的收获祭', '卡古拉拉旅游篇'];

export default function BookDetailPage() {
    const [novel, setNovel] = useState<NovelWithAuthor>()
    useEffect(() => {
        // Object.assign(window, {
        //     setA: () => {
        //         setNovel({
        //             author: {
        //                 role: null,
        //                 nickname: '什么',
        //                 status: false,
        //                 muted: null,
        //                 avatar: null
        //             },
        //             created_at: 0,
        //             updated_at: 0,
        //             catalogue: [
        //                 {
        //                     articles: [
        //                         {
        //                             path: "",
        //                             name: "A",
        //                             index: 0,
        //                             exist: false
        //                         },
        //                         {
        //                             path: "",
        //                             name: "F",
        //                             index: 1,
        //                             exist: false
        //                         },
        //                     ],
        //                     index: 0,
        //                     name: "C"
        //                 },
        //                 {
        //                     articles: [
        //                         {
        //                             path: "",
        //                             name: "A",
        //                             index: 0,
        //                             exist: false
        //                         },
        //                         {
        //                             path: "",
        //                             name: "F",
        //                             index: 1,
        //                             exist: false
        //                         },
        //                     ],
        //                     index: 0,
        //                     name: "T"
        //                 },
        //             ],
        //             novel_id: 0,
        //             title: "人",
        //             status: false,
        //             hidden: false,
        //             description: `由于工作过度，注意到的时候被卡车撞了的主人公伊中雄二。
        //         “啊，不该这么工作的。下一次要悠闲地在乡下生活……”也许是通过了雄二这样的愿望，他与神相遇，转生到了异世界的乡下。作为乡下贵族的次子阿尔弗里特=斯洛伍雷特获得了新生的他，在乡下会过着快乐而悠闲的生活吗？
        //         （PS：购书卷ID265）`,
        //             cover: "",
        //             author_id: "dasfaew232f24"
        //         })
        //     }
        // })
        if (!novel) {
            const res = /\/novel\/(\d+)/.exec(location.pathname)
            if (!res) {
                location.replace('/search')
            }
            const result = res as RegExpExecArray
            getNovelById(parseInt(result[1])).then(res => {
                const novelFromServer = res.data as NovelWithAuthor
                setNovel(novelFromServer)
            })
        }
    })
    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            <Card sx={{ display: 'flex', mb: 2, }}>
                <CardMedia
                    component="img"
                    sx={{ width: 180 }}
                    image={novel?.cover || 'https://s2.loli.net/2024/06/16/EMq4BWVYrRuegnU.jpg'} // 替换为你的图像路径
                    alt={novel?.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {novel ? novel?.title : <Skeleton variant='text' height={32} width={400} />}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                            作者：{novel ? novel?.author.nickname : <Skeleton variant='text' height={27} width={150} sx={{ display: 'inline-block' }} />}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                            更新时间：{novel ? novel?.updated_at : <Skeleton variant='text' height={20} width={150} sx={{ display: 'inline-block' }} />}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                            简介：
                        </Typography>
                        {novel ?
                            <Typography variant="body2" component="div" sx={{ height: 100 }}>{novel?.description}</Typography>
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
                    {
                        novel ? novel.catalogue.map(v => {
                            return (
                                <Grid item xs={12} md={6} key={v.index} sx={{ maxWidth: '100%' }}>
                                    <Accordion sx={{ maxWidth: '100%' }}>
                                        <AccordionSummary sx={{ maxWidth: '100%' }} expandIcon={<ExpandMoreIcon />}>
                                            <Typography>{v.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <List>
                                                {v.articles.map(a => {
                                                    return (
                                                        <ListItemButton key={a.path}>
                                                            <ListItemText primary={a.name}></ListItemText>
                                                        </ListItemButton>
                                                    )
                                                })}
                                            </List>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
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
                </Grid>
            </Grid>
        </Box>
    );
}
