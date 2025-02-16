import request from '@/utils/custom_request'

/**
 * 上传Discord
 * @param discordList discordList
 * @returns {*}
 */
export function uploadDiscordList(discordList) {
  return request({
    url: '/discord/batchAdd',
    method: 'post',
    data: {
      rawLines: discordList
    }
  })
}
/**
 * 分页查询Discord
 * @param {page, limit}
 * @returns {*}
 */
export function pageQueryDiscord({ page, limit, filterMap }) {
  return request({
    url: '/discord/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      filterMap
    }
  })
}

/**
 * 删除Discord，根据id
 * @param ids
 * @returns {*}
 */
export function deleteDiscord(ids) {
  return request({
    url: '/discord/delete',
    method: 'post',
    data: {
      ids: ids
    }
  })
}
