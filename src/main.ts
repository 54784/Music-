// 引入模板的全局样式
import '@/styles/index.scss'
// svg 插件配置
import 'virtual:svg-icons-register'
// 引入路由鉴权文件
import './permission'
import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error忽略当前文件ts类型的检测
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createPinia } from 'pinia'
// 导入 pinia持久化插件
// @ts-ignore
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import pinia from '@/store'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// app.use(ElementPlus, {
//   locale: zhCn
// })
app.use(pinia.use(piniaPluginPersistedstate))
app.use(router)
// 引入自定义插件对象 注册整个项目全局组件
import gloalComponent from '@/components/index.ts'

app.use(gloalComponent)

import Vant from 'vant'
import 'vant/lib/index.css'
app.use(Vant) // 把vant中所有组件都导入了
// 通过import.meta.env 可获取当前环境下的变量
// console.log(import.meta.env)

app.mount('#app')
