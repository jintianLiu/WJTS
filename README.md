# 无境探索论坛网站

## 项目简介

"无境探索"是一个大型多页论坛网站，专为旅行爱好者设计，提供旅行分享、攻略交流、摄影作品展示等功能。网站采用现代化设计风格，响应式布局适配各种设备屏幕。

## 项目结构

```
d:\无境探索网站2.0\
├── forum-assets/         # 论坛资源文件
│   ├── css/              # CSS样式文件
│   ├── js/               # JavaScript脚本文件
│   └── images/           # 图片资源目录
├── pages/                # 页面文件
│   ├── login.html        # 登录页面
│   ├── register.html     # 注册页面
│   ├── post-detail.html  # 帖子详情页面
│   └── forgot-password.html  # 忘记密码页面
├── index.html            # 首页
├── README.md             # 项目说明文档
└── logo.jpg              # 网站Logo（需要自行添加）
```

## Logo处理说明

请将网站Logo图片保存为`logo.jpg`并放置在根目录下。Logo将显示在网站导航栏、登录页、注册页等各个页面中。建议使用尺寸适中的图片，以确保在不同设备上显示效果良好。

## 主要功能

1. **首页** - 展示热门帖子、分类导航、活跃用户等
2. **用户系统** - 支持注册、登录、密码找回
3. **帖子系统** - 浏览、查看详情、评论、点赞、收藏
4. **搜索功能** - 搜索帖子和用户
5. **分类浏览** - 按不同分类浏览帖子
6. **响应式设计** - 适配桌面、平板和移动设备

## 技术栈

- HTML5
- Tailwind CSS v3
- JavaScript
- Font Awesome
- Google Fonts

## 使用说明

1. 确保所有文件完整下载到本地
2. 添加`logo.jpg`图片到根目录
3. 使用浏览器直接打开`index.html`即可访问网站

## 注意事项

- 本项目使用了CDN引入的外部资源（Tailwind CSS、Font Awesome、Google Fonts），请确保网络连接正常
- 网站中的数据均为模拟数据，实际使用时需要连接后端服务
- 用户系统的登录、注册功能为前端模拟，需要后端API支持才能实现完整功能

## 开发说明

如需进一步开发，可以修改以下文件：

- **样式修改**：编辑`forum-assets/css/style.css`
- **功能修改**：编辑`forum-assets/js/main.js`
- **页面修改**：编辑对应的HTML文件

## 浏览器兼容性

支持以下浏览器的最新版本：
- Google Chrome
- Mozilla Firefox
- Apple Safari
- Microsoft Edge

## 版权信息

© 2024 无境探索论坛. 保留所有权利.