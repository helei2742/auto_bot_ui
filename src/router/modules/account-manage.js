/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const importRouter = {
  path: '/account-manage',
  component: Layout,
  redirect: '/account-manage/account-base-info',
  name: 'AccountManage',
  meta: {
    title: '账号管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'account-base-info',
      component: () => import('@/views/custom/account/account-base-info-manage'),
      name: 'AccountBaseInfoManage',
      meta: { title: '基本账号管理', icon: 'el-icon-user' }
    },
    {
      path: 'proxy-info',
      component: () => import('@/views/custom/account/proxy-info-manage'),
      name: 'ProxyInfoManage',
      meta: { title: '代理管理', icon: 'international' }
    },
    {
      path: 'browser-env',
      component: () => import('@/views/custom/account/browser-env-manage'),
      name: 'BrowserEnvManage',
      meta: { title: '浏览器环境管理', icon: 'browser' }
    },
    {
      path: 'social-account',
      component: () => import('@/views/custom/account/index'),
      name: 'SocialAccount',
      redirect: '@/views/custom/import/import-twitter-account',
      meta: { title: '社交账号管理', icon: 'social' },
      children: [
        {
          path: 'twitter',
          component: () => import('@/views/custom/account/social/twitter-account-manage.vue'), // Parent router-view
          name: 'Twitter',
          meta: { title: 'twitter', icon: 'twitter' }
        },
        {
          path: 'discord',
          name: 'Discord',
          component: () => import('@/views/custom/account/social/discord-account-manage.vue'),
          meta: { title: 'discord', icon: 'discord' }
        },
        {
          path: 'telegram',
          name: 'Telegram',
          component: () => import('@/views/custom/account/social/telegram-account-manage.vue'),
          meta: { title: 'telegram', icon: 'telegram' }
        }
      ]
    }
  ]
}
export default importRouter
