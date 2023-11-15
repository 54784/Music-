import request from '@/utils/request'
// 登录接口
export const useLoginService = (username: string, password: string) => {
  return request.post('/user/login', {
    username,
    password
  })
}

// 获取用户信息
export const useGetUserInfo = () => {
  return request.get('/user/getUserInfo')
}

export const useLogoutService = () => {
  return request.post('/user/logout')
}