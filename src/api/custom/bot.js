import request from '@/utils/custom_request'

/**
 * 分页查询浏览器环境
 * @param {page, limit}
 * @returns {*}
 */
export function pageQueryBot({ page, limit, filterMap }) {
  return request({
    url: '/bot/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      filterMap
    }
  })
}

/**
 * 创建bot
 * @param botId
 * @param botKey
 * @param accountIds
 */
export function createBot({ botId, botKey, accountIds }) {
  return request({
    url: '/bot/create',
    method: 'post',
    data: {
      botId,
      botKey,
      accountIds
    }
  })
}
