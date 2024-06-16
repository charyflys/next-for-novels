'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Chip, Grid, Stack, Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getNovelById } from '@/request/novel';

const tags = ['web', '王都调查篇', '村子的收获祭', '卡古拉拉旅游篇'];

export default function BookDetailPage() {
    const [novel, setNovel] = useState<NovelWithAuthor>()
    useEffect(() => {
        const res = /\/novel\/(\d+)/.exec(location.pathname)
        if (!res) {
            location.replace('/search')
        }
        const result = res as RegExpExecArray 
        getNovelById(parseInt(result[1])).then(res => {
            const novelFromServer = res.data as NovelWithAuthor
            setNovel(novelFromServer)
        })
    })
    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            <Card sx={{ display: 'flex', mb: 2, }}>
                <CardMedia
                    component="img"
                    sx={{ width: 180 }}
                    image={novel?.cover||'https://s2.loli.net/2024/06/16/EMq4BWVYrRuegnU.jpg'} // 替换为你的图像路径
                    alt={ novel?.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            { novel?.title}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                            { novel?.author.nickname}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            {tags.map((tag) => (
                                <Chip key={tag} label={tag} color="primary" />
                            ))}
                        </Stack>
                        <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                            更新时间：2024-06-14 15:24:43
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
                    由于工作过度，进入到刚转生的妖梦卡车撞了的主人公伊吹中被第二。啊，不被这个工作的。下一次要停止的样子下生活……“也许是遇过了”被二这样的想起，他与轮期间，转生到了异世界第5卷。作为乡下无赖的次数阿尔卑斯第一斯洛在悬挂锁了新的他，在乡下过慢节奏而感的生活吗？
                </Typography>
            </Box>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} spacing={1}>
                    <Grid item xs={12} md={6}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>公告</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <ListItemButton>
                                        <ListItemText primary={'阅前提示'}></ListItemText>
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemText primary={'作者序言'}></ListItemText>
                                    </ListItemButton>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>文库 一卷</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    这里是文库一卷的内容。
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>文库 二卷 村子的收获祭</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    这里是文库二卷村子的收获祭的内容。
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Web 乡下生活篇</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    这里是Web乡下生活篇的内容。
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>web 王都底对篇+日常</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    这里是web王都底对篇+日常的内容。
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
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
