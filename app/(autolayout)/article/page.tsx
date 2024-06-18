/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Link,
  Grid,
  Paper,
  Stack,
  Button,
  CardMedia,
  Drawer,
  ListItemButton,
  ListItemText,
  List,
  Collapse
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Comment from '@mui/icons-material/Comment';
import GradeIcon from '@mui/icons-material/Grade';
import { useNovelStore } from '@/stores/Novel';
import { getNovelById } from '@/request/novel';
import { getArticle } from '@/request/article';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
export default function ChapterDetailPage() {
  const [open, setOpen] = useState(false)
  const [renderInner, setRender] = useState<string[]>([])
  const [novel, setNovel] = useState<NovelWithAuthor>()
  const [showChapter, setChapter] = useState('')

  const NovelStore = useNovelStore(state => state.Novel)

  let novelId: number, articlePath: string, pathCheck: boolean
  if (!novel) {
    if (NovelStore) {
      setNovel(NovelStore)
    }
  }
  useEffect(() => {
    if (!pathCheck) {
      const res = /\/novel\/(\d+)\/(.{36})&(.+)/.exec(location.pathname)
      if (res) {
        articlePath = res[2] + '/' + res[3]
        novelId = parseInt(res[1])
        if (!novel) {
          getNovelById(novelId).then(res => {
            const novelFromServer = res.data as NovelWithAuthor
            setNovel(novelFromServer)
          })
        }
        getArticle(articlePath).then(res => {
          setRender([res.data])
        })
      }
    }
  })

  function handleClickTest(event: React.MouseEvent) {
    event.preventDefault()
  }


  return (
    <>
      <Box sx={{ p: 1, bgcolor: '#fff', color: '#000', position: 'sticky', top: 63, paddingBottom: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            75 三个臭皮匠，但……
          </Typography>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Stack>
      </Box>
      <Box sx={{ p: 2, bgcolor: '#fff', color: '#000', paddingTop: 0 }}>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          更新时间: 2024-06-11 21:49:55
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap', padding: 2 }}>
          {renderInner}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2, bgcolor: '#fff', color: '#000', display: 'flex', justifyContent: 'space-around' }}>
        <IconButton size='large'>
          <FavoriteIcon fontSize='large' color='error' />
        </IconButton>
        <IconButton size='large'>
          <GradeIcon fontSize='large' color='inherit' />
        </IconButton>
        <IconButton size='large'>
          <Comment fontSize='large' />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ p: 2, bgcolor: '#fff', color: '#000', display: 'flex', justifyContent: 'space-around' }}>
        <Button>
          上一话
        </Button>
        <Button>
          目录
        </Button>
        <Button href='/' onClick={handleClickTest}>
          下一话
        </Button>
      </Box>
      <Box
        sx={{ p: 2, bgcolor: '#fff', color: '#000', margin: '10px 0' }}
      >

      </Box>
      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <List sx={{ marginTop: 10, width: 300 }}>
          {
            novel?.catalogue.map(v => {
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
                          <ListItemButton
                            sx={{ pl: 4 }}
                            key={a.path}
                            href={`/novel/${novel.novel_id}/${a.path.split('/').join('&')}`}
                          >
                            <ListItemText primary={`第${a.index}节  ${a.name}`}></ListItemText>
                          </ListItemButton>
                        )
                      })}
                    </List>
                  </Collapse>
                </>
              )
            })

          }
        </List>
      </Drawer>
    </>
  );
};

