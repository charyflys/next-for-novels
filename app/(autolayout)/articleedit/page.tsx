'use client'
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { getNovelByUser } from '@/request/novel';
import { useAlertStore } from '@/stores/Alert';
import { addArticle, getArticle } from '@/request/article';

export default function ArticleEdit () {
  const [novelList, setNovelList] = useState<Novel[]>([

  ])
  const [novel, setNovel] = useState<Novel>()
  const [chapter, setChapter] = useState<Chapter>()
  const [article, setArtcle] = useState<ArticleBase>()
  const [articleContent, setContent] = useState<string>('')
  const [articleIndex, setArticleIndex] = useState<number>(-1)
  const setAlert = useAlertStore(state => state.setMsgAndColorAndOpen)
  if (novelList.length===0) {
    getNovelByUser('').then(res => {
      setNovelList(res.data)
    })
  }

  function addArticleInFront () {
    if (chapter===undefined) {
      setAlert('小说和卷不能为空','warning')
      return
    }
    setArtcle({
      name: '新增章节', 
      index: (chapter!==undefined)?chapter.articles.length:1,
      exist: true,
    });
    setArticleIndex(chapter?chapter.articles.length:1)
  }
  function addArticleSubmit(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const articleObj = {
      name: form.get('name'),
      index: parseInt(form.get('index') as string),
      exist: true,
      novelId: parseInt(form.get('novelId') as string),
      chapterIndex: parseInt(form.get('chapterIndex') as string),  
      content: form.get('content')
    } as ArticleContent
    console.log(articleObj)
    addArticle(articleObj).then(res => {
      setAlert('新增成功')
      getNovelByUser('').then(res => {
        setNovelList(res.data)
      })
    })
  }
  return (
    <Container>
      <Typography variant="h4" gutterBottom>反人类的文章编辑</Typography>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={addArticleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
            <FormControl fullWidth margin="normal">
                <InputLabel>文章</InputLabel>
                <Select name='novelId'>
                  <MenuItem value='' onClick={() => {setNovel(undefined);setChapter(undefined);setArtcle(undefined)}}>--</MenuItem>
                  {
                    novelList.map(v => (
                      <MenuItem value={v.novel_id} key={v.novel_id} onClick={() => setNovel(v)}>
                        {v.title}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>卷</InputLabel>
                <Select name='chapterIndex'>
                <MenuItem value='' onClick={() => {setChapter(undefined);setArtcle(undefined)}}>--</MenuItem>

                  {novel?.catalogue.map(v => (
                    <MenuItem value={v.index} key={v.index} onClick={() => setChapter(v)}>
                      {v.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>章节</InputLabel>
                <Select name='index' value={articleIndex?.toString()} onChange={(e: SelectChangeEvent) => setArticleIndex(parseInt(e.target.value))}>
                <MenuItem value={-1} onClick={() => {setArtcle(undefined)}}>--</MenuItem>

                  {
                    chapter?.articles.map(v => (
                      <MenuItem 
                      value={v.index} 
                      key={v.index} 
                      onClick={() => {setArtcle(JSON.parse(JSON.stringify(v)));getArticle(v.path).then(res => setContent(res.data))}}>
                        {v.name}
                      </MenuItem>
                    ))
                  }
                  {
                    // article&&chapter&&(!chapter.articles.find(v=>article.index!==v.index)) ? 
                    ((chapter!==undefined)&&(article!==undefined)&&(!chapter.articles.find(v=>v.index===article.index)))?  <MenuItem
                    value={article?.index}
                    >
                      {article?.name}
                    </MenuItem>
                    :''
                  }
                </Select>
              </FormControl>
              <Button
              onClick={addArticleInFront}
              >
                新增
              </Button>
              {/* <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Exist"
              /> */}
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                margin="normal"
                label="章节名称"
                name='name'
                value={article?.name}
                onChange={(e) => {setArtcle(JSON.parse(JSON.stringify({name:e.target.value,exist: true,index: article?.index})))}}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Content"
                multiline
                rows={10}
                name='content'
                value={articleContent}
                onChange={(e) => setContent(e.target.value)}
                defaultValue="Example content goes here..."
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button type='submit' variant="contained" color="primary">
              提交修改或新增
            </Button>
          </DialogActions>
        </form>
      </Paper>
    </Container>
  );
};

