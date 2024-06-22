'use client'
import React from 'react';
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
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

const ArticleEdit = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Edit Article</Typography>
      <Paper sx={{ p: 2 }}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Index</InputLabel>
                <Select defaultValue={1}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Chapter Index</InputLabel>
                <Select defaultValue={1}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Exist"
              />
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Images</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>
                      <ListItemText primary="Image 1" />
                      <IconButton edge="end" aria-label="add">
                        <AddIcon />
                      </IconButton>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Image 2" />
                      <IconButton edge="end" aria-label="add">
                        <AddIcon />
                      </IconButton>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Image 3" />
                      <IconButton edge="end" aria-label="add">
                        <AddIcon />
                      </IconButton>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                defaultValue="Example Article Name"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Content"
                multiline
                rows={10}
                defaultValue="Example content goes here..."
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="contained" color="primary">
              Save
            </Button>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Paper>
    </Container>
  );
};

export default ArticleEdit;
