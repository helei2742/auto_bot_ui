import request from '@/utils/custom_request'

/**
 * 上传代理
 * @param proxyInfoList proxyInfoList
 * @returns {*}
 */
export function uploadProxyInfoList(proxyInfoList) {
  return request({
    url: '/proxyInfo/batchAdd',
    method: 'post',
    data: {
      rawLines: proxyInfoList
    }
  })
}

/**
 * 分页查询代理
 * @param {page, limit, filterMap}
 * @returns {*}
 */
export function pageQueryProxyInfo({ page, limit, filterMap }) {
  return request({
    url: '/proxyInfo/pageQuery',
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
export function deleteProxyInfo(ids) {
  return request({
    url: '/proxyInfo/delete',
    method: 'post',
    data: {
      ids: ids
    }
  })
}
