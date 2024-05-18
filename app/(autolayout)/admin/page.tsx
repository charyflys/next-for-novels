'use client'
import { Email_Access } from "@/lib/supabase/email";
import { getEmail } from "@/request/email";
import { Box, Button, Paper, Tab, Tabs, Typography } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import React from "react";

export default function Page() {
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = React.useState<Email_Access[]>([]);
  if(rows.length === 0)getEmail().then(res => {
    console.log('?');
    setRows(res.data);
  });
  console.log(rows);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function onSelectChange(rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails<any>) {
    console.log(rowSelectionModel,details);
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
        <Button>新增</Button>
        <Button>删除</Button>
        {/* <Button>修改</Button> */}
      </Box>
      <DataTable rows={rows} onSelectChange={onSelectChange}/>
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
