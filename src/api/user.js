import request from '@/utils/request'

// 注册
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword,
  })
}

// 登录
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', {
    username,
    password,
  })
}

// 获取用户信息
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}

// 修改用户信息
export const userUpdateInfoService = ({ id, nickname, email }) => {
  return request.put('/my/userinfo', {
    id,
    nickname,
    email,
  })
}

// 修改密码
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) => {
  return request.patch('/my/updatepwd', {
    old_pwd,
    new_pwd,
    re_pwd,
  })
}

// 修改头像
export const userUploadAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', {
    avatar,
  })
}
