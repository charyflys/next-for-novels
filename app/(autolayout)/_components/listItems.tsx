
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
// 主列表，包括首页，公告，收藏，小说
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
// 次要列表
// 管理员才显示管理选项
export default function SecondaryListItems() {
  const [secondaryList, setsecondaryList] = React.useState(SecondaryList)
  const [showAdmin, setShowAdmin] = useLocalStorage<boolean>('showAdmin', false)
  getProfile().then(res => {
    if (res.data.role === 'admin' || res.data.role === 'super') {
      setShowAdmin(true)
      setsecondaryList([
        {
          href: '/',
          icon: SettingsOutlinedIcon,
          label: '设置',
        },
      ])
    }
    else {
      setShowAdmin(false)
      setsecondaryList([
        {
          href: '/',
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
  })  
  if(secondaryList.length === 1&&showAdmin){
      setsecondaryList([...secondaryList, {
        href: '/admin',
        icon: ManageAccountsOutlinedIcon,
        label: '管理',
      }])
  } 

  return (
    <React.Fragment>
      {secondaryList.map(v => {
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

function useLocalStorage <T> (key: string, initialValue: T)  {
  const [state, setState] = React.useState(() => {
    // Initialize the state
    try {
      const value = window.localStorage.getItem(key)
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value: (arg0: any) => any) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(state) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue]
}