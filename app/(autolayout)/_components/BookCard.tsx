'use client'
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';

export default function BookCard({ novel }:{ novel:NovelWithAuthor }) {
  return (
    <Card sx={{ display: 'flex', marginBottom: 2, maxWidth: '95vw' }}>
      <CardMedia
        component="img"
        sx={{ height: 240,width: 170 }}
        image={novel.cover||'https://s2.loli.net/2024/06/16/EMq4BWVYrRuegnU.jpg'} // 替换为你的图像路径
        alt={novel.title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography 
          component="div" 
          variant="h5" 
          sx={{ fontWeight: 'bold',marginBottom: .5 }}>
            {novel.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: 1 }}>
            作者：{novel.author.nickname}
          </Typography>
          <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            overflow: 'hidden',
            height:60,
            marginBottom: 2,
            }}>
            简介：{novel.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around',paddingTop: 1}}>
            <Button href={`/novel/${novel.novel_id}`}>
                <b>查看详情</b>
            </Button>
            <Button color='inherit'>
                <b>开始阅读</b>
            </Button>
        </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
