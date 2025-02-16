import request from '@/utils/custom_request'

/**
 * 上传浏览器环境
 * @param browserEnvList browserEnvList
 * @returns {*}
 */
export function uploadBrowserEnvList(browserEnvList) {
  return request({
    url: '/browserEnv/batchAdd',
    method: 'post',
    data: {
      rawLines: browserEnvList
    }
  })
}
/**
 * 分页查询浏览器环境
 * @param {page, limit}
 * @returns {*}
 */
export function pageQueryBrowserEnv({ page, limit, filterMap }) {
  return request({
    url: '/browserEnv/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      filterMap
    }
  })
}

/**
 * 删除BrowserEnv，根据id
 * @param ids
 * @returns {*}
 */
export function deleteBrowserEnv(ids) {
  return request({
    url: '/browserEnv/delete',
    method: 'post',
    data: {
      ids: ids
    }
  })
}
