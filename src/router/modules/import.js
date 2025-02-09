/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const importRouter = {
  path: '/import',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '导入',
    icon: 'import'
  },
  children: [
    {
      path: 'import-account-base-info',
      component: () => import('@/views/custom/import/import-account-base-info'),
      name: 'ImportAccountBaseInfo',
      meta: { title: '导入基本账号', icon: 'peoples' }
    },
    {
      path: 'import-proxy-info',
      component: () => import('@/views/custom/import/import-proxy-info'),
      name: 'ImportProxyInfo',
      meta: { title: '导入代理', icon: 'international' }
    },
    {
      path: 'import-browser-env-info',
      component: () => import('@/views/custom/import/import-browser-env.vue'),
      name: 'ImportBrowserEnvInfo',
      meta: { title: '导入浏览器环境', icon: 'browser' }
    },
    {
      path: 'import-social-account',
      component: () => import('@/views/custom/import/index'),
      name: 'ImportSocialAccount',
      redirect: '@/views/custom/import/import-twitter-account',
      meta: { title: '导入社交账号', icon: 'social' },
      children: [
        {
          path: 'twitter',
          component: () => import('@/views/custom/import/social/import-twitter-account.vue'), // Parent router-view
          name: 'twitter',
          meta: { title: 'twitter', icon: 'twitter' }
        },
        {
          path: 'discord',
          name: 'discord',
          component: () => import('@/views/custom/import/social/import-discord-account.vue'),
          meta: { title: 'discord', icon: 'discord' }
        },
        {
          path: 'telegram',
          name: 'telegram',
          component: () => import('@/views/custom/import/social/import-telegram-account.vue'),
          meta: { title: 'telegram', icon: 'telegram' }
        }
      ]
    }
  ]
}
export default importRouter
