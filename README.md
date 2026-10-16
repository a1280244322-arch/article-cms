# 大事件文章管理系统 | Vue 3

基于 Vue 3 + Element Plus 构建的文章内容管理后台前端项目。

## 项目介绍

本项目是一个基于 Vue 3 开发的文章内容管理系统前端，采用组件化开发方式，围绕用户管理、文章分类管理、文章发布与编辑等业务场景，实现了后台管理界面及相关交互功能。

项目使用 Vue Router 管理页面路由、Pinia 管理用户状态、Axios 封装接口请求，并结合 Element Plus 和富文本编辑器完成后台管理功能。

**个人负责内容：前端页面开发、业务交互实现、状态管理、组件封装及后端 API 对接。**

## 技术栈

- Vue 3 + Composition API
- Vue Router
- Pinia
- Element Plus
- Axios
- Vue Quill
- JavaScript
- SCSS

## 项目预览

建议在此展示项目实际截图：

- 登录与注册页面
- <img width="1265" height="1326" alt="image" src="https://github.com/user-attachments/assets/5a61a911-c3d1-4d57-8473-986172afd518" />
<img width="1269" height="1324" alt="image" src="https://github.com/user-attachments/assets/e66d9b9f-054f-4478-8230-77e7e65dd292" />

- 文章列表及筛选页面
- <img width="1263" height="1322" alt="image" src="https://github.com/user-attachments/assets/436038f2-212a-44b9-81c6-f6626e2137c8" />

- 文章编辑与富文本编辑器
- <img width="1269" height="1325" alt="image" src="https://github.com/user-attachments/assets/64b8b97a-cbdd-4912-bcae-255cd5d34590" />

- 个人中心页面
- <img width="1261" height="1318" alt="image" src="https://github.com/user-attachments/assets/1aaee5c5-d259-4bcd-bea8-39f754e52741" />


## 核心功能

### 用户管理

- 实现用户注册、登录及退出功能。
- 基于 Token 管理用户登录状态。
- 支持个人资料修改、头像更新和密码修改。

### 文章管理

- 实现文章列表查询、分页及条件筛选。
- 支持文章新增、编辑、删除及发布。
- 集成富文本编辑器，实现文章内容编辑。
- 支持文章封面上传、预览及草稿保存。

### 文章分类管理

- 实现文章分类的查询、新增、修改和删除。
- 将分类选择功能封装为可复用组件，实现分类数据与文章编辑表单联动。

## 前端技术实现

### 1. 基于 Pinia 的用户状态管理

使用 Pinia 集中管理用户信息及登录 Token，通过状态持久化减少页面刷新造成的登录状态丢失问题。

结合 Vue Router 路由守卫，对需要登录的后台页面进行访问控制。

### 2. Axios 请求模块封装

对 Axios 进行统一封装，通过请求拦截器自动携带 Token，并在响应拦截器中集中处理接口错误和登录失效情况。

将用户、文章、分类等接口按照业务模块进行管理，减少页面组件中的重复请求逻辑，提高代码可维护性。

### 3. 富文本编辑与表单交互

基于 Vue Quill 实现文章内容编辑，结合 Element Plus 表单组件完成文章信息填写、分类选择、封面上传及编辑提交等交互。

通过组件状态管理处理新增、编辑及草稿等不同业务场景。

### 4. 组件化开发

按照业务功能拆分页面与组件，封装文章分类选择、文章编辑等模块，降低重复代码，提高页面维护和功能扩展的便利性。

## 项目目录

```text
src/
├── api/           # 业务接口封装
├── assets/        # 静态资源
├── components/    # 公共组件
├── router/        # 路由配置
├── stores/        # Pinia状态管理
├── utils/         # Axios请求封装
└── views/         # 业务页面
```

## 项目说明

本项目为文章管理系统的前端部分，通过已有后端 API 实现数据查询与业务操作。

主要展示 Vue 3 组件化开发、后台 CRUD 业务实现、用户状态管理、路由访问控制及前后端接口对接能力。
