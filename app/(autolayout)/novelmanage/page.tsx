'use client'
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  ListItemButton,
  ListItemText,
  List
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ViewListIcon from '@mui/icons-material/ViewList';
import { addNovel, getNovelByUser, updateNovel, updateNovelMulu } from '@/request/novel';
import { useAlertStore } from '@/stores/Alert';

export default function NovelManagerView() {
  const [novelList, setNovelList] = useState<Novel[]>([])
  const [editOpen, setEditOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [editNovel, setEditNovel] = useState<Novel>()
  const [muluDialog, setMuluShow] = useState(false)
  const [muluSelect, setMuluSelect] = useState<number>()
  const [chapterName, setChapterName] = useState<string>('')
  const setAlert = useAlertStore(state => state.setMsgAndColorAndOpen)
  if (novelList.length===0) {
    getNovelByUser('').then(res => {
      setNovelList(res.data)
    })
  }
  function EditNovel(event: React.MouseEvent,novel: Novel) {
    // console.log(novel)
    setEditNovel(novel)
    setEditOpen(true)
  }
  function EditMulu(novel: Novel) {
    const mulu = JSON.parse(JSON.stringify(novel.catalogue))
    const {
      novel_id,
      title,
      status,
      hidden,
      description,
      cover,
      author_id,
      created_at,
      updated_at
    } = novel
    setEditNovel({
      novel_id,
      title,
      status,
      hidden,
      description,
      cover,
      author_id,
      catalogue: mulu,
      created_at,
      updated_at
    })
    setMuluShow(true)
  }
  function AddNovelSubmit (e: React.FormEvent<HTMLFormElement> ) {
    e.preventDefault()
    const form = new FormData(e.currentTarget);
    const novelObj = {} as any
    ['title','status','hidden','description','cover'].forEach(v=> {
      novelObj[v]=form.get(v)
      if (v ==='status'||v==='hidden')novelObj[v]=!!form.get(v)
    })
    // console.log(novelObj)
    addNovel(novelObj as NovelBase).then(res => {
      getNovelByUser('').then(res => {
        setNovelList(res.data)
      })
      setAlert('添加成功','success')
      setAddOpen(false)
    })
  }
  function EditNovelSubmit (e: React.FormEvent<HTMLFormElement> ) {
    e.preventDefault()
    const form = new FormData(e.currentTarget);
    const novelObj = {} as any
    ['novel_id','title','status','hidden','description','cover'].forEach(v=> {
      novelObj[v]=form.get(v)
      if (v ==='status'||v==='hidden')novelObj[v]=!!form.get(v)
    })
    // console.log(novelObj)
    updateNovel(novelObj as NovelBase).then(res => {
      getNovelByUser('').then(res => {
        setNovelList(res.data)
      })
      setAlert('修改成功','success')
      setEditOpen(false)
    })
  }
  function NameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChapterName(e.target.value)
  }
  function AddChapterInFront() {
    if (chapterName==='') {
      setAlert('你没有写任何名称！','warning')
      return
    }
    if(editNovel) {
      const index = editNovel.catalogue[editNovel.catalogue.length-1].index + 1 || 1
      editNovel.catalogue.push({
        index,
        name: chapterName,
        articles: []
      })
      setEditNovel(JSON.parse(JSON.stringify(editNovel)))
    }
  }
  function ChangeChapterInFront() {
    if (chapterName==='') {
      setAlert('你没有写任何名称！','warning')
      return
    }
    if(editNovel) {
      const chapter = editNovel.catalogue.find(v=>v.index===muluSelect)
      if (chapter) {
        chapter.name = chapterName
        setEditNovel(JSON.parse(JSON.stringify(editNovel)))
      } else {
        setAlert('你没有选中任何一卷')
      }
    }
  }
  function MuluSubmit() {
    if (editNovel) {
      const {novel_id, catalogue} = editNovel
      updateNovelMulu({novel_id, catalogue}).then(res => {
        getNovelByUser('').then(res => {
          setNovelList(res.data)
        })
        setAlert('修改成功','success')
        setMuluShow(false)
      })
    }
  }
  return (
    <Container>
      {/* <Typography variant="h4" gutterBottom>Novel Management</Typography> */}
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)} >
        添加小说
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>标题</TableCell>
              <TableCell>连载状态</TableCell>
              <TableCell>是否隐藏</TableCell>
              <TableCell>描述</TableCell>
              <TableCell>封面</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              novelList.map(v => (
                <TableRow key={v.novel_id}>
                  <TableCell>{v.title}</TableCell>
                  <TableCell>{v.status ? '连载中':'已完结'}</TableCell>
                  <TableCell>{v.hidden ? '隐藏': '显示'}</TableCell>
                  <TableCell>{ v.description }</TableCell>
                  <TableCell>
                    <img src={v.cover} alt={v.title} width={50} />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => EditNovel(e,v)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => EditMulu(v)}>
                      <ViewListIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>编辑小说</DialogTitle>
        <DialogContent>
          <form onSubmit={EditNovelSubmit}>
            <TextField 
            sx={{ display: 'none'}}
            name='novel_id'
            defaultValue={editNovel?.novel_id}
            />
            <TextField 
            fullWidth 
            margin="normal" 
            label="小说标题" 
            defaultValue={editNovel?.title}
            name='title'
            />
            <TextField 
            fullWidth 
            margin="normal" 
            label="描述" 
            multiline
            defaultValue={editNovel?.description}
            name='description'
            />
            <FormControlLabel
              control={<Checkbox defaultChecked={editNovel?.status} />}
              label="是否连载中"
              name='status'
            />
            <FormControlLabel
              control={<Checkbox defaultChecked={editNovel?.hidden} />}
              label="是否隐藏"
              name='hidden'
            />
            <TextField 
            fullWidth 
            margin="normal" 
            label="封面图片url" 
            defaultValue={editNovel?.cover}
            name='cover'
            />
            <Typography>有关图片上传，建议注册<Link href='https://sm.ms'>sm.ms</Link></Typography>
            <DialogActions>
              <Button onClick={() => setEditOpen(false)}>取消</Button>
              <Button type="submit" variant="contained" color="primary">
                保存
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
        <DialogTitle>新增小说</DialogTitle>
        <DialogContent>
          <form onSubmit={AddNovelSubmit}>
            <TextField 
            fullWidth 
            margin="normal" 
            label="小说标题" 
            defaultValue="" 
            name='title'
            />
            <TextField 
            fullWidth 
            margin="normal" 
            label="描述" 
            multiline
            defaultValue="" 
            name='description'
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="是否连载中"
              name='status'
            />
            <FormControlLabel
              control={<Checkbox />}
              label="是否隐藏"
              name='hidden'
            />
            <TextField 
            fullWidth 
            margin="normal" 
            label="封面图片url" 
            defaultValue="https://s2.loli.net/2024/06/16/EMq4BWVYrRuegnU.jpg"
            name='cover'
            />
            <Typography>有关图片上传，建议注册<Link href='https://sm.ms'>sm.ms</Link></Typography>
            <DialogActions>
              <Button onClick={() => setAddOpen(false)}>取消</Button>
              <Button type="submit" variant="contained" color="primary">
                保存
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={muluDialog} onClose={() => setMuluShow(false)}>
        <DialogTitle>其他设置</DialogTitle>
        <DialogContent>
          <List>
            {
              editNovel?.catalogue.map(v => (
                <ListItemButton 
                selected={muluSelect===v.index} 
                key={v.index}
                onClick={()=>{setMuluSelect(v.index);setChapterName(v.name)}}
                >
                  <ListItemText primary={v.index+'. '+v.name} />
                </ListItemButton>
              ))
            }
          </List>
            <TextField 
            fullWidth
            margin='normal'
            label={muluSelect?`第${muluSelect}卷名称`:'卷名称'}
            value={chapterName}
            onChange={NameInputChange}
            />
            <Button onClick={AddChapterInFront}>新增</Button>
            <Button onClick={ChangeChapterInFront}>修改</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMuluShow(false)}>取消</Button>
          <Button onClick={MuluSubmit} variant="contained" color="primary">提交</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};


