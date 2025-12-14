# JobRight Helper - 面试任务

## 项目概述

开发一个浏览器扩展，用于自动填写 Greenhouse.io 上的求职申请表。

## 具体要求

### 代码包开发流程

1. `pnpm install` 安装依赖
2. `pnpm run dev` 启动项目
3. 在chrome://extensions/ 开启 Developer Model, 加载测试包, 安装包相对路径(`build/chrome-mv3-dev`)
4. 打开测试下面的测试链接
5. 点击右上角`Auto Fill Form`自动填充表单

### 问题定义：

基于给定的mock数据，和现有的代码框架，请填充现在的代码框架，保证用mock数据在下面的链接能跑通，自动填充数据：

1. 测试链接1：
   链接：https://boards.greenhouse.io/embed/job_app?token=4327952003&utm_source=jobright
   对应mock数据：mocks/4327952003.json
2. 测试链接2：
   链接：https://boards.greenhouse.io/embed/job_app?token=6909295&utm_source=jobright
   对应mock数据：mocks/6909295.json
3.

### 实现细节：

填写问题和给定的mock数据可以进行简单的写死的规则匹配（例如 提供的mock数据里面的），你需要做几个事情：

1. 在代码框架上，爬取页面上所有的表单，需要支持下面几个类型：

- 文本输入框
- 下拉选择框
- 教育信息等列表项

1. 丰富代码支持自动填充操作（即把mock数据里面的答案填充到链接对应的表单项里面）：
2. 统计出来 成功填充的字段数 以及 未填充的字段 （这个打印出来即可）

### 交付预期：

1. 开发后的代码
2. 一个demo录屏 (5-10s即可) 显示能操作运行代码成功（即填写成功，以及打印出来的 字段）
