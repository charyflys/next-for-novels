
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box } from '@mui/material';

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

export const mainListItems = (
  <React.Fragment>
    {MainList.map(v => {
      return (
        <ListItemButton href={v.href} key={v.href}>
        <ListItemIcon>
          <Box component={v.icon}  />
        </ListItemIcon>
        <ListItemText primary={v.label} />
      </ListItemButton>
      )

    })}
  </React.Fragment>
)

export const SecondaryList = [
  {
    href: '/',
    icon: SettingsOutlinedIcon,
    label: '设置',
  },
]

export const secondaryListItems = (
  <React.Fragment>
    {SecondaryList.map(v => {
      return (
        <ListItemButton href={v.href} key={v.href}>
        <ListItemIcon>
          <Box component={v.icon}  />
        </ListItemIcon>
        <ListItemText primary={v.label} />
      </ListItemButton>
      )

    })}
  </React.Fragment>
);
