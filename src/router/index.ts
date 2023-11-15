// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'

import { useUserStore } from '@/store'
// 组件外访问小仓库是访问不到的 需要访问 大仓库
import pinia from '@/store'
const userStore = useUserStore(pinia)

const router = createRouter({
  // 路由模式 hash
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由规则
  routes: constantRoute
})

// 底部播放组件的显示隐藏 若是登录页即隐藏
router.beforeEach((to, from) => {
  if (to.path == '/login') {
    userStore.isShowFooter = false
  } else {
    userStore.isShowFooter = true
  }
})

export default router
