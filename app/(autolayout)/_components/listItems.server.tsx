
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box } from '@mui/material';
import { getProfile } from '@/request/profile';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { resBody } from '@/lib/quickapi';

const MainList = [
  {
    href: '/',
    icon: HomeOutlinedIcon,
    label: '首页',
  },
  {
    href: '/announce',
    icon: CampaignOutlinedIcon,
    label: '公告',
  },
  {
    href: '/favorite',
    icon: StarBorderOutlinedIcon,
    label: '我的收藏',
  },
  {
    href: '/novels',
    icon: MenuBookOutlinedIcon,
    label: '我的小说',
  },
]

export function MainListItems() {
  return (
    <React.Fragment>
      {MainList.map(v => {
        return (
          <ListItemButton href={v.href} key={v.href}>
            <ListItemIcon>
              <Box component={v.icon} />
            </ListItemIcon>
            <ListItemText primary={v.label} />
          </ListItemButton>
        )

      })}
    </React.Fragment>
  )
}

export const SecondaryList = [
  {
    href: '/',
    icon: SettingsOutlinedIcon,
    label: '设置',
  },
]

export const getServerSideProps = (async () => {
  const { data } = await getProfile();
  return { props: { data } }
}) satisfies GetServerSideProps<{ data: resBody }>

export default function SecondaryListItems({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (data&&data.role === 'admin') {
    SecondaryList.push({
      href: '/admin',
      icon: ManageAccountsOutlinedIcon,
      label: '管理',
    });
  }
  return (
    <React.Fragment>
      {SecondaryList.map(v => {
        return (
          <ListItemButton href={v.href} key={v.href}>
            <ListItemIcon>
              <Box component={v.icon} />
            </ListItemIcon>
            <ListItemText primary={v.label} />
          </ListItemButton>
        )

      })}
    </React.Fragment>
  );
} 
