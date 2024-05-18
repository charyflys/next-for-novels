'use client'
import { Email_Access } from "@/lib/supabase/email";
import { getEmail } from "@/request/email";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowModes, GridRowModesModel } from '@mui/x-data-grid';
import React from "react";

export default function Page() {
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = React.useState<Email_Access[]>([]);
  getEmail().then(res => {
    setRows(res.data);
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
  <Paper>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="注册管理" {...a11yProps(0)} />
        <Tab label="访问状态" {...a11yProps(1)} />
      </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
      <DataTable rows={rows} />
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

function handleEditClick(id: any) {
  return () => {
    console.log(`Edit ${id}`);
  };
}

function handleDeleteClick(id: any) {  
  return () => {
    console.log(`Delete ${id}`);
  };
}



function DataTable({rows}:{rows:Email_Access[]}) {
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
    {
      field: 'actions',
      type: 'actions',
      headerName: '操作',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
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
