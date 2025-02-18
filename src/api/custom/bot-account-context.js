import request from '@/utils/custom_request'

/**
 * 分页查询Bot账户的基本信息
 * @param {page, limit, filterMap}
 * @returns {*}
 */
export function pageQueryAccountContext({ page, limit, filterMap }) {
  return request({
    url: '/accountContext/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      filterMap
    }
  })
}
