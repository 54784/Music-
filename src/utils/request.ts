import { showLoadingToast, closeToast, showFailToast } from 'vant'
import axios from 'axios'
import { useUserStore } from '@/store/index'

// 创建axios 实例 将来对创建出来的实例，进行自定义封装
const instance = axios.create({
  // 接口调用的基础地址
  // baseURL: 'http://172.20.10.7:3007/',
  baseURL: 'http://127.0.0.1:3007/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 8000 // 超时时间
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 开启loading 禁止背景点击(节流处理 防止多次点击)
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 5
    })
    // Toast.loading({
    //   message: '加载中...',
    //   forbidClick: true, // 禁止背景点击
    //   loadingType: 'spinner', // loading图标
    //   duration: 0 // 展示时长(ms)，默认2s 值为 0 时，toast 不会自动消失 我们应该在响应回来的时候关闭
    // })

    // 只要有token 就在请求时携带 便于请求需要授权的接口
    const useUser = useUserStore()
    const token = useUser.token

    if (token) {
      config.headers.token = token
    }
    // console.log(config.headers);

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么(默认axios会多包装一层data，需要响应拦截器中修改)
    const res = response.data
    if (res.code !== 0) {
      showFailToast(res.message)
      // 抛出一个错误的Promise 如果不抛出 awiat还会往下走
      return Promise.reject(res.message)
    } else {
      // 正确情况
      closeToast() // 关闭当前展示的提示
    }
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 导出配置好的实例
export default instance
