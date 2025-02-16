import request from '@/utils/custom_request'

/**
 * 上传账户基本信息
 * @param accountBaseInfoList
 * @returns {*}
 */
export function uploadAccountBaseInfoList(accountBaseInfoList) {
  return request({
    url: '/accountBaseInfo/batchAdd',
    method: 'post',
    data: {
      rawLines: accountBaseInfoList
    }
  })
}

/**
 * 分页查询账户基本信息
 * @param {page, limit, filterMap}
 * @returns {*}
 */
export function pageQueryAccountBaseInfo({ page, limit, filterMap }) {
  return request({
    url: '/accountBaseInfo/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      filterMap
    }
  })
}

/**
 * 删除账户，根据id
 * @param ids
 * @returns {*}
 */
export function deleteAccountBaseInfo(ids) {
  return request({
    url: '/accountBaseInfo/delete',
    method: 'post',
    data: {
      ids: ids
    }
  })
}
