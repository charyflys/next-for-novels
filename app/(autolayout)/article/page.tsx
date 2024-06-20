/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Stack,
  Button,
  Drawer,
  ListItemButton,
  ListItemText,
  List,
  Collapse,
  ListItemIcon
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Comment from '@mui/icons-material/Comment';
import GradeIcon from '@mui/icons-material/Grade';
import { getNovelById } from '@/request/novel';
import { getArticle } from '@/request/article';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const articlePathModel = /n(\d+)-c(\d+)-a(\d+)/
export default function ChapterDetailPage() {
  const [open, setOpen] = useState(false)
  const [renderInner, setRender] = useState<string[]>([])
  const [novel, setNovel] = useState<NovelWithAuthor>()
  const [showChapter, setChapter] = useState('')
  const [pathCheck, setPathCheck] = useState(false)
  const [articlepath, setArticlePath] = useState<[number, number, number]>()
  const [article, setArticle] = useState<Article>()
  useEffect(() => {
    if (!pathCheck) {
      const res = /\/novel\/(\d+)\/(.{36})&(.+)/.exec(location.pathname)
      setPathCheck(true)
      if (res) {
        const articlePath = res[2] + '/' + res[3]
        const novelId = parseInt(res[1])
        const articleM = articlePathModel.exec(res[3])
        if (articleM) {
          setArticlePath([parseInt(articleM[1]), parseInt(articleM[2]), parseInt(articleM[3]),])
        }
        if (!novel) {
          getNovelById(novelId).then(res => {
            const novelFromServer = res.data as NovelWithAuthor
            setNovel(novelFromServer)
            if (articleM) {
              setArticlePath([parseInt(articleM[1]), parseInt(articleM[2]), parseInt(articleM[3]),])
              const chapter = novelFromServer.catalogue.find(v => v.index - 0 === parseInt(articleM[2]))
              const article = chapter?.articles.find(v => v.index - 0 === parseInt(articleM[3]))
              if (article) {
                setArticle(article)
              }
            }
          })
        }
        if (renderInner.length === 0) {
          getArticle(articlePath).then(res => {
            setRender([res.data])
          })
        }
      }
    }
  })

  function handleClickTest(event: React.MouseEvent) {
    event.preventDefault()
  }

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault()
  }

  return (
    <>
      <Box sx={{ p: 1, bgcolor: '#fff', color: '#000', position: 'sticky', top: 63, paddingBottom: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <IconButton href={`/novel/${novel?.novel_id}`}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {article?.name}
          </Typography>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Stack>
      </Box>
      <Box sx={{ p: 2, bgcolor: '#fff', color: '#000', paddingTop: 0 }}>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          更新时间：{article && article.updated_at && new Date(article.updated_at * 1000).toLocaleString().replaceAll('/', '-')}
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
        <Button onClick={() => setOpen(true)}>
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
                  <ListItemButton onClick={() => setChapter(showChapter === v.name ? '' : v.name)}>
                    <ListItemText primary={`第${v.index}章    ${v.name}`} />
                    {showChapter !== v.name ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={showChapter === v.name} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      {v.articles.map(a => {
                        const isMine = a.path === article?.path
                        return (
                          <ListItemButton
                            sx={{ pl: 4 }}
                            key={a.path}
                            onClick={isMine ? preventDefault : () => { }}
                            href={`/novel/${novel.novel_id}/${a.path.split('/').join('&')}`}
                          >
                            {
                              isMine ? <ListItemIcon>
                                <BookmarkBorderIcon />
                              </ListItemIcon> : ''
                            }
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

