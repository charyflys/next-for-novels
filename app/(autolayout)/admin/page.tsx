'use client'
import { Email_Access } from "@/lib/supabase/email";
import { addAccessEmail, deleteAccessEmail, getEmail } from "@/request/email";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Tab, Tabs, TextField, Typography } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import React from "react";

export default function Page() {
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = React.useState<Email_Access[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<Array<number|string>>([]);
  
  
  if(rows.length === 0)getEmail().then(res => {
    setRows(res.data);
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function onSelectChange(rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails<any>) {
    setSelectedRows(rowSelectionModel);
  }
  function handleDelete() {
    const arr: Promise<any>[] = []
    selectedRows.forEach(item => {
      arr.push(deleteAccessEmail({id:item}))
    })
    Promise.all(arr).then(() => {
      getEmail().then(res => {
        setRows(res.data);
      })
      delClose()
    })
  }
  const [addEmail, setAddEmail] = React.useState('');
  function handleAdd() {
    //TODO
    addAccessEmail({email:addEmail}).then(() => {
      getEmail().then(res => {
        setRows(res.data);  
      })
      addClose()
    })
  }

  const [delOpen, setdelOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  function delClose() {
    setdelOpen(false);
  }
  function delDialogOpen() {
    setdelOpen(true);
  }

  function addDialogOpen() {
    setAddOpen(true);
  }
  function addClose() {
    setAddOpen(false);
  }

  return (
  <Paper>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="注册管理" {...a11yProps(0)} />
        <Tab label="访问状态" {...a11yProps(1)} />
      </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
      <Box>
        <Button onClick={addDialogOpen}>新增</Button>
        <Button onClick={delDialogOpen}>删除</Button>
        {/* <Button>修改</Button> */}
      </Box>
      <DataTable rows={rows} onSelectChange={onSelectChange}/>
      <Dialog
        open={addOpen}
        onClose={addClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"新增"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            请输入要新增的邮箱
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            onChange={(e) => {e.preventDefault();setAddEmail(e.target.value)}}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addClose}>取消</Button>
          <Button onClick={handleAdd} autoFocus>
            提交
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={delOpen}
        onClose={delClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"确认删除"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            确认删除选中的所有邮箱？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={delClose}>取消</Button>
          <Button onClick={handleDelete} autoFocus color="error">
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
      Item Two
    </CustomTabPanel>
  </Paper>)
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: '邮箱', width: 130 },
  // { field: 'status', headerName: '状态', width: 70 },
  {
    field: 'Status',
    headerName: '状态',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => row.status ? '有效' : '无效',
  },
  {
    field: 'role',
    headerName: '权限',
    description: 'super为超管，admin为管理员，空为普通用户',
    width: 160,
  },
];


function DataTable({rows, onSelectChange}:{rows:Email_Access[],onSelectChange:(rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails<any>)=>void}): JSX.Element {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        onRowSelectionModelChange={onSelectChange}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
