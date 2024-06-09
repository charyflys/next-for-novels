home page
首行搜索
第二行
推荐+欢迎
第三行

网站路由以及功能api开发思考
当前首页的设计停滞，优先完成api开发任务

首先明确数据库内容
Novel 表：存储小说的基本信息。

novel_id (主键): 唯一标识每本小说
title: 小说标题
cover: 小说封面
status: 状态，0表示未完结，1表示完结
hidden: 是否隐藏，0表示不隐藏，1表示隐藏
author_id (外键): 作者ID，关联到 Author 表
description: 小说简介
created_at: 创建时间
updated_at: 更新时间
Author 表：存储作者的信息，不使用，改使用Profile表。
id可能危险吗？不确定

为考虑到数据库大小问题，文本压缩引入LZMA算法。
article上传和编辑的作者认证问题

由于article压缩后的二进制文件无法传输到数据库中，再使用base64又会变大，与压缩的初衷不符
使用supabase的二进制存储解决
更改原有的表设置，为novel表添加一个json存储的字段来存储目录，

json格式
[
    {
        chapter_name: '章节名称',
        index: <章节序列>,
        [
            {
                article_name: '文章内容',
                index: <文章序列>,
                created_at: 创建时间,
                updated_at: 更新时间,
                exist: boolean //不推荐先设置目录后输入文章
            }
        ]
    }
]
文章存储路径为
/(md5小说名+作者名)/(章名)/(节名)