import request from '@/utils/custom_request'

/**
 * 上传Telegram
 * @param telegramList telegramList
 * @returns {*}
 */
export function uploadTelegramList(telegramList) {
  return request({
    url: '/telegram/batchAdd',
    method: 'post',
    data: {
      rawLines: telegramList
    }
  })
}
/**
 * 分页查询Telegram
 * @param {page, limit}
 * @returns {*}
 */
export function pageQueryTelegram({ page, limit, filterMap }) {
  return request({
    url: '/telegram/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      filterMap
    }
  })
}

/**
 * 删除Telegram，根据id
 * @param ids
 * @returns {*}
 */
export function deleteTelegram(ids) {
  return request({
    url: '/telegram/delete',
    method: 'post',
    data: {
      ids: ids
    }
  })
}
