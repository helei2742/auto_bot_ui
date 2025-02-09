/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const botRouter = {
  path: '/bot',
  component: Layout,
  redirect: '/',
  name: 'Bot',
  meta: {
    title: 'Bot',
    icon: 'bug'
  },
  children: [
    {
      path: '/bot-market',
      component: () => import('@/views/custom/bot/bot-market'),
      name: 'BotMarket',

      meta: { title: 'bot market', icon: 'el-icon-sold-out' }
    },
    {
      path: '/my-bot',
      component: () => import('@/views/custom/bot/my-bot'),
      name: 'MyBot',
      meta: { title: 'my bot', icon: 'el-icon-s-grid' }
    },
    {
      path: '/bot-config/:id',
      hidden: true,
      component: () => import('@/views/custom/bot/bot-config'),
      name: 'BotConfig',
      meta: { title: 'bot config', icon: 'config' }
    }
  ]
}
export default botRouter
