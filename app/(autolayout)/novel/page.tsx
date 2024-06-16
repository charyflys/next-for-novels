'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Chip, Grid, Stack, Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getNovelById } from '@/request/novel';

const tags = ['web', '王都调查篇', '村子的收获祭', '卡古拉拉旅游篇'];

export default function BookDetailPage() {
    const [novel, setNovel] = useState<NovelWithAuthor>()
    useEffect(() => {
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
                            {novel?.title}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                            作者：{novel?.author.nickname}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                            更新时间：{novel?.updated_at}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                            链接：<a href="https://ncode.syosetu.com/n5375y" style={{ color: '#90caf9' }}>https://ncode.syosetu.com/n5375y</a>
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
                        <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
                            论坛
                        </Button>
                        <Button variant="contained" color="secondary" sx={{ marginRight: 1 }}>
                            收藏
                        </Button>
                        <Button variant="contained" color="success">
                            分享
                        </Button>
                    </Box>
                </Box>
            </Card>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    简介：
                </Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                    {novel?.description}
                </Typography>
            </Box>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} spacing={1}>
                    {
                        novel && novel.catalogue.map(v => {
                            return (
                                <Grid item xs={12} md={6} key={v.index}>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography>公告</Typography>
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
                    }
                    <Grid item xs={12} md={6}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>web 卡古拉拉旅游篇</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    这里是web卡古拉拉旅游篇的内容。
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
