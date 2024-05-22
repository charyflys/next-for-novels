'use client'
import { Container, Typography, TextField, Box, Button, Grid, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';

export default function EditArticle() {
  const [title, setTitle] = useState('');
  const [chapter, setChapter] = useState('');
  const [sectionNumber, setSectionNumber] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    // Handle save logic here
    console.log({
      title,
      chapter,
      sectionNumber,
      content,
    });
  };

  return (
    <>
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            编辑文章
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="标题"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="对应章节"
                    variant="outlined"
                    fullWidth
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="章节内编号"
                    variant="outlined"
                    fullWidth
                    value={sectionNumber}
                    onChange={(e) => setSectionNumber(e.target.value)}
                  />
                </Box>
                <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                  保存
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <TextField
                  label="内容"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={20}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
