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
  ListItemIcon,
  Slider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Comment from '@mui/icons-material/Comment';
import GradeIcon from '@mui/icons-material/Grade';
import { getNovelById } from '@/request/novel';
import { getArticle } from '@/request/article';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { ExpandLess, ExpandMore, Settings } from '@mui/icons-material';
import { useLocalStorage } from '@/lib/frontquick';

const articlePathModel = /n(\d+)-c(\d+)-a(\d+)/
export default function ChapterDetailPage() {
  const [open, setOpen] = useState(false)
  const [renderInner, setRender] = useState<string[]>([])
  const [novel, setNovel] = useState<NovelWithAuthor>()
  const [showChapter, setChapter] = useState('')
  const [pathCheck, setPathCheck] = useState(false)
  const [articlepath, setArticlePath] = useState<[number, number, number]>()
  const [article, setArticle] = useState<Article>()
  const [next, setNext] = useState<Article>()
  const [pre, setPre] = useState<Article>()

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settings, setSettings] = useLocalStorage<{fontSize?:number,lineHeight?:number}>('watchViewSetting',{})
  
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
            novelFromServer.catalogue.sort((a, b) => a.index - b.index)
            novelFromServer.catalogue.forEach(v => {
              v.articles.sort((a, b) => a.index - b.index)
            })
            setNovel(novelFromServer)
            if (articleM) {
              setArticlePath([parseInt(articleM[1]), parseInt(articleM[2]), parseInt(articleM[3]),])
              const chapter = novelFromServer.catalogue.find(v => v.index - 0 === parseInt(articleM[2]))
              const article = chapter?.articles.find(v => v.index - 0 === parseInt(articleM[3]))
              if (article && chapter) {
                setChapter(chapter.name)
                setArticle(article)
                const pre = chapter.articles.find(v => v.index === article.index - 1)
                if (pre) {
                  setPre(pre)
                } else {
                  const chapter = novelFromServer.catalogue.find(v => v.index - 0 === parseInt(articleM[2]) - 1)
                  const article = chapter ? chapter.articles[chapter.articles.length - 1] : undefined
                  setPre(article)
                }
                const next = chapter.articles.find(v => v.index === article.index + 1)
                if (next) {
                  setNext(next)
                } else {
                  const chapter = novelFromServer.catalogue.find(v => v.index - 1 === parseInt(articleM[2]))
                  const article = chapter ? chapter.articles[0] : undefined
                  setNext(article)
                }
              }
            }
          })
        }
        if (renderInner.length === 0) {
          getArticle(articlePath).then(res => {
            setRender(res.data.split('\n').map(v => v+'\n'))
          })
        }
      }
    }
  })

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault()
  }

  function setFontSize(event: Event, value: number | number[]) {
    const num = value as number
    setSettings({
      fontSize: num,
      lineHeight: settings.lineHeight
    })
  }
  function setLineHeight(event: Event, value: number | number[]) {
    const num = value as number
    setSettings({
      fontSize: settings.fontSize,
      lineHeight: num
    })
  }
  

  return (
    <>
      <Box sx={{ p: 1, bgcolor: '#fff', color: '#000', position: 'sticky', top: 56, paddingBottom: 1 }}>
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
        <IconButton onClick={() => setSettingsOpen(!settingsOpen)}>
          <Settings fontSize='small' />
        </IconButton>
        <Collapse in={settingsOpen}>        
          <Box sx={{ p: 2}}>
            <Typography>字体大小</Typography>
            <Slider
            defaultValue={settings.fontSize||16}
            min={5}
            max={30}
            onChange={setFontSize}
            valueLabelDisplay="auto"
            />
            <Typography>行间距</Typography>
            <Slider 
            defaultValue={settings.lineHeight||24}
            min={5}
            max={40}
            onChange={setLineHeight}
            valueLabelDisplay="auto"
            />
          </Box>
        </Collapse>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          更新时间：{
            (article && article.updated_at && new Date(article.updated_at * 1000).toLocaleString().replaceAll('/', '-'))
            ||
            (article && article.created_at && new Date(article.created_at * 1000).toLocaleString().replaceAll('/', '-'))
          }
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography 
        variant="body1" 
        component="div" 
        sx={{ 
          whiteSpace: 'pre-wrap', 
          padding: 2,
          fontSize: settings.fontSize + 'px',
          lineHeight: settings.lineHeight + 'px'
        }}>
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
        {
          pre ?
            <Button
              href={`/novel/${novel?.novel_id}/${pre.path.split('/').join('&')}`}
            >
              上一话
            </Button>
            :
            <Button
              color='inherit'
            >
              没有了
            </Button>
        }
        <Button onClick={() => setOpen(true)}>
          目录
        </Button>
        {
          next ?
            <Button
              href={`/novel/${novel?.novel_id}/${next.path.split('/').join('&')}`}
            >
              下一话
            </Button>
            :
            <Button
              color='inherit'
            >
              没有了
            </Button>
        }
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
                    <ListItemText primary={`第${v.index}卷    ${v.name}`} />
                    {showChapter !== v.name ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={showChapter === v.name} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      {v.articles.map(a => {
                        const isMine = a.path === article?.path
                        return (
                          <ListItemButton
                            key={a.path}
                            onClick={isMine ? preventDefault : () => { }}
                            href={`/novel/${novel.novel_id}/${a.path.split('/').join('&')}`}
                          >
                            {
                              isMine ?
                                <>
                                  <ListItemIcon>
                                    <BookmarkBorderIcon />
                                  </ListItemIcon>
                                  <ListItemText primary={`第${a.index}章  ${a.name}`}></ListItemText>
                                </>
                                : <ListItemText inset primary={`第${a.index}章  ${a.name}`}></ListItemText>
                            }
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

