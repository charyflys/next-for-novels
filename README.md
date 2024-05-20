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
author_id (外键): 作者ID，关联到 Author 表
description: 小说简介
created_at: 创建时间
updated_at: 更新时间
Author 表：存储作者的信息，不使用，改使用Profile表。
id可能危险吗？不确定

章节表
chapter_id (主键): 唯一标识每个章节
novel_id (外键): 小说ID，关联到 Novel 表
title: 章节标题
chapter_number: 章节编号
created_at: 创建时间
updated_at: 更新时间


Article 表：存储文章的信息。

article_id (主键): 唯一标识每篇文章
chapter_id (外键): 章节ID，关联到 Chapter 表
title: 文章标题
content: 文章内容
article_number: 文章编号，表示在该章节中的顺序
created_at: 创建时间
updated_at: 更新时间