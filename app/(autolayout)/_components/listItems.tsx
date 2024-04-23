import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href='/'>
      <ListItemIcon>
        <HomeOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="首页" />
    </ListItemButton>
    <ListItemButton href='/announce'>
      <ListItemIcon>
        <CampaignOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="公告" />
    </ListItemButton>
    <ListItemButton href='/favorite'>
      <ListItemIcon>
        <StarBorderOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="我的收藏" />
    </ListItemButton>
    <ListItemButton href='/novels'>
      <ListItemIcon>
        <MenuBookOutlinedIcon/>
      </ListItemIcon>
      <ListItemText primary='我的小说'/>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <SettingsOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="设置" />
    </ListItemButton>
  </React.Fragment>
);
