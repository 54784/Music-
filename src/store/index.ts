import { createPinia } from 'pinia'
// import piniaPluginPersist from 'pinia-plugin-persist'
// 创建总仓库
const pinia = createPinia()
// 暴露仓库
export default pinia

export * from './modules/user.ts'
export * from './modules/footerMusic.ts'
