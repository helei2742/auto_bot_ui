import request from '@/utils/request'

/**
 * 上传账户基本信息
 * @param accountBaseInfoList
 * @returns {*}
 */
export function uploadAccountBaseInfoList(accountBaseInfoList) {
  return request({
    url: '/accountBaseInfo/upload',
    method: 'post',
    data: {
      accountBaseInfoList
    }
  })
}

/**
 * 上传代理
 * @param proxyInfoList proxyInfoList
 * @returns {*}
 */
export function uploadProxyInfoList(proxyInfoList) {
  return request({
    url: '/proxyInfoList/upload',
    method: 'post',
    data: {
      proxyInfoList
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
    url: '/uploadTwitterList/upload',
    method: 'post',
    data: {
      uploadTwitterList
    }
  })
}

/**
 * 上传代理
 * @param browserEnvList browserEnvList
 * @returns {*}
 */
export function uploadBrowserEnvList(browserEnvList) {
  return request({
    url: '/browserEnvList/upload',
    method: 'post',
    data: {
      browserEnvList
    }
  })
}

/**
 * 上传discord
 * @param discordList discordList
 * @returns {*}
 */
export function uploadDiscordList(discordList) {
  return request({
    url: '/discordList/upload',
    method: 'post',
    data: {
      discordList
    }
  })
}

/**
 * 上传telegramList
 * @param telegramList telegramList
 * @returns {*}
 */
export function uploadTelegramList(telegramList) {
  return request({
    url: '/telegramList/upload',
    method: 'post',
    data: {
      telegramList
    }
  })
}
