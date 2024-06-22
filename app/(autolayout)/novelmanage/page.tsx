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
  Link
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ViewListIcon from '@mui/icons-material/ViewList';
import { addNovel, getNovelByUser, updateNovel } from '@/request/novel';

export default function NovelManagerView() {
  const [novelList, setNovelList] = useState<Novel[]>([])
  const [editOpen, setEditOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [editNovel, setEditNovel] = useState<Novel>()
  if (novelList.length===0) {
    getNovelByUser('').then(res => {
      setNovelList(res.data)
    })
  }
  function EditNovel(event: React.MouseEvent,novel: Novel) {
    console.log(novel)
    setEditNovel(novel)
    setEditOpen(true)
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
    })
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
                    <IconButton >
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
    </Container>
  );
};


