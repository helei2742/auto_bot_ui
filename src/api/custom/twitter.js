import request from '@/utils/custom_request'

/**
 * 分页查询twitter
 * @param
 * {
 *     page,
 *     limit,
 *     fieldFilter
 *   }  page、limit 必选
 * @returns {*}
 */
export function pageQueryTwitter(
  {
    page,
    limit,
    fieldFilter
  }
) {
  return request({
    url: '/twitter/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      fieldFilter
    }
  })
}

/**
 * 上传twitter
 * @param uploadTwitterList uploadTwitterList
 * @returns {*}
 */
export function uploadTwitterList(uploadTwitterList) {
  return request({
    url: '/twitter/batchAdd',
    method: 'post',
    data: {
      rawLines: uploadTwitterList
    }
  })
}

/**
 * 删除Twitter，根据id
 * @param ids
 * @returns {*}
 */
export function deleteTwitter(ids) {
  return request({
    url: '/twitter/delete',
    method: 'post',
    data: {
      ids: ids
    }
  })
}
