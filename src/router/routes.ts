// 对面暴露
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'), // 路由懒加载
    name: 'login' // 命名路由
  },
  {
    // 登陆后展示数据的
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/layout/home/index.vue')
      },
      {
        path: '/boke',
        component: () => import('@/views/layout/boke/index.vue')
      },
      {
        path: '/faxian',
        component: () => import('@/views/layout/faxian/index.vue')
      },
      {
        path: '/my',
        component: () => import('@/views/layout/my/index.vue')
      },
      {
        path: '/shequ',
        component: () => import('@/views/layout/shequ/index.vue')
      }
    ]
  },
  {
    path: '/songlistDetail',
    name: 'songlistDetail',
    component: () => import('@/views/songListDetail/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  {
    // 任意路由
    path: '/:pathMatch(.*)*',
    redirect: '/404', // 重定向到404
    name: 'any'
  }
]
