// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {showSuccessToast} from 'vant'
import { useLoginService, useGetUserInfo, useLogoutService } from '@/api/login'
import type { loginForm, loginResponseData } from '@/api/user/types'
import type { UserState } from './types/type'
export const useUserStore = defineStore(
  'user',
  () => {
    const isShowFooter = ref(false)
    // 从本地存储中获取 token
    const token = ref(localStorage.getItem('token') || '')
    const userInfo = ref({
      username: '',
      avatar: '',
      email: '',
      nickname: '',
      personalsignature: '',
      phone: '',
      sex: ''
    })

    // 登录请求
    const userLogin = async (data: loginForm) => {
      const res = await useLoginService(data.username, data.password)
      console.log(res)

      const responseData = res as unknown as loginResponseData // 确认接口中返回的数据结构，然后进行类型断言
      if (!responseData.code) {
        token.value = responseData.data as string // 登陆成功存token  类型断言 务必是字符串的情况下
        localStorage.setItem('token', token.value as string) // 本地持久化
        return 'ok'
      } else {
        return Promise.reject(new Error(responseData.data.msg))
      }
    }
    // 通过token获取当前用户信息
    const getUserInfo = async () => {
      let res: any = await useGetUserInfo()
      userInfo.value = res.data
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value as any)) // 本地持久化
    }
    // 退出登录
    const userLogout = async () => {
      const res: any = await useLogoutService()
      if (!res.code) {
        token.value = ''
        userInfo.value.username = ''
        userInfo.value.avatar = ''
        localStorage.removeItem('token')
        showSuccessToast(res.message)
      }
    }

    return {
      isShowFooter,
      token,
      userInfo,
      userLogin,
      userLogout,
      getUserInfo
    }
  },
  {
    persist: true
  }
)
