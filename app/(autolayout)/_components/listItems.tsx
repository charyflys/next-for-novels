'use client'

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
import { useLocalStorage } from '@/lib/frontquick';
import { CheckSession } from '@/request/signin';

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
    href: '/novelmanage',
    icon: MenuBookOutlinedIcon,
    label: '我的小说',
  },
]
// 主列表，包括首页，公告，收藏，小说
export function MainListItems() {
  const [path, setPath] = React.useState('')
  React.useEffect(() => {
    if (path==='') {
      setPath(location.pathname)
    }
  })
  return (
    <React.Fragment>
      {MainList.map(v => {
        return (
          <ListItemButton selected={path===v.href} href={v.href} key={v.href}>
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
// 次要列表
// 管理员才显示管理选项
export default function SecondaryListItems() {
  const [secondaryList, setsecondaryList] = React.useState(SecondaryList)
  const [showAdmin, setShowAdmin] = useLocalStorage<boolean>('showAdmin', false)
  const [render, setRender] = useLocalStorage<{ render: boolean, timestamp: number }>('render', { render: false, timestamp: 0 })
  const [path, setPath] = React.useState('')
  React.useEffect(() => {
    if (path==='') {
      setPath(location.pathname)
    }
  })
  if (!render || render.timestamp < Date.now() - 1800000) {
    getProfile().then(res => {
      // console.log(res)
      if (res.data.role === 'admin' || res.data.role === 'super') {
        setShowAdmin(true)
        if(secondaryList.length!==1)setsecondaryList([
          {
            href: '/setting',
            icon: SettingsOutlinedIcon,
            label: '设置',
          },
        ])
      }
      else {
        setShowAdmin(false)
        if(secondaryList.length===1)setsecondaryList([
          {
            href: '/setting',
            icon: SettingsOutlinedIcon,
            label: '设置',
          },
          {
            href: '/admin',
            icon: ManageAccountsOutlinedIcon,
            label: '管理',
          }
        ])
      }
      setRender({ render: true, timestamp: Date.now() })
    })
  }
  if (render&&render.timestamp < Date.now() - 900000) {
    CheckSession()
  }
    
  if (secondaryList.length === 1 && showAdmin) {
    setsecondaryList([...secondaryList, {
      href: '/admin',
      icon: ManageAccountsOutlinedIcon,
      label: '管理',
    }])
    setRender({ render: true, timestamp: Date.now() })
  }

  return (
    <React.Fragment>
      {secondaryList.map(v => {
        return (
          <ListItemButton selected={path===v.href} href={v.href} key={v.href}>
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
