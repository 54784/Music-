import request from '@/utils/request'
import type { loginForm, loginResponseData } from './types'
// 统一管理接口
enum API {
  LOGIN_URL = '/api/login',
  REGISTER_URL = ''
  // USERINFO_URL = ""
}
// 登录
export const useLoginService = (data: loginForm) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, {
    data
  })
}

// 注册
export const useRegisterService = () => {}

export const useGetUserInfo = () => {
  return request.get('/user/getUserInfo')
}
