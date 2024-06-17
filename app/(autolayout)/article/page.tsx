import React from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Link,
  Grid,
  Paper,
  Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

export default function ChapterDetailPage () {
    const inner= `
              75 三个臭皮匠，但……

          醒来后，发现自己被绑在冰冷的地上。

          “可恶！！丽艾尔人呢，给我出来！！”

          我仿佛是一只害怕的小型犬，带着哭腔大声叫唤。

          可恶，结果她还是干出了绑架临尝这种毫无新鲜感的事情。我也想过她总有一天会这么干，但没想到她会在光天化日之下行动。
          话说我被绑架的次数是不是越来越多了？别再绑架了，我甚至都有一点习惯了。
          好了，这是掌握现状吧。

          我被绑架多久了？这是哪里？

          这里太黑了，除了冰冷的地面和头上的铁框外什么都感觉不到。

          “……神官？”

          听到一个熟悉的声音。

          我尽最大伸出手，指尖碰到了冰冷的铁框栏杆……厚厚的布？
          我再用手指抚过栏杆上的间隙，试着拉了一下那块布。布似乎只是轻轻盖着，一碰就滑了下来。
          另一个侧展现出的空间比我想象的要狭窄。

          这是一个毫无装饰的大房间，像是个仓库。房间角落里堆着一座女神像。旁边还有几个被布盖住的正方形笼子，估计和关住我的这个一样。`
  return (
    <Box sx={{ p: 2, bgcolor: '#fff', minHeight: '100vh', color: '#000' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            75 三个臭皮匠，但……
          </Typography>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Stack>

        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            评论(15)
          </Typography>
          <Box>
            <IconButton>
              <ShareIcon />
            </IconButton>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </Box>
        </Box> */}
        <Typography variant="body2" color="text.secondary" sx={{ textAlign:'center' }}>
          更新时间: 2024-06-11 21:49:55
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap', padding: 2 }}>
            {inner}
        </Typography>
    </Box>
  );
};

