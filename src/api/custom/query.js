import request from '@/utils/request'

/**
 * 分页查询账户基本信息
 * @param {page, limit, email, type} type可选
 * @returns {*}
 */
export function pageQueryAccountBaseInfo({ page, limit, email, type }) {
  return request({
    url: '/accountBaseInfo/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      email,
      type
    }
  })
}

/**
 * 分页查询代理
 * @param {page, limit, type, protocol} type、protocol可选
 * @returns {*}
 */
export function pageQueryProxyInfo({ page, limit, type, protocol }) {
  return request({
    url: '/proxyInfo/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      proxyType: type,
      proxyProtocol: protocol
    }
  })
}

/**
 * 分页查询浏览器环境
 * @param {page, limit}
 * @returns {*}
 */
export function pageQueryBrowserEnv({ page, limit }) {
  return request({
    url: '/browserEnv/pageQuery',
    method: 'post',
    data: {
      page,
      limit
    }
  })
}

/**
 * 分页查询twitter
 * @param
 * {
 *     page,
 *     limit,
 *     username,
 *     email,
 *     token,
 *     f2aKey
 *   }  page、limit 必选
 * @returns {*}
 */
export function pageQueryTwitter(
  {
    page,
    limit,
    username,
    email,
    token,
    f2aKey
  }
) {
  return request({
    url: '/twitter/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      username,
      email,
      token,
      f2aKey
    }
  })
}

/**
 * 分页查询discord
 * @param
 *   {
 *     page,
 *     limit,
 *     username,
 *     bindEmail,
 *     token
 *   } page,limit必须
 * @returns {*}
 */
export function pageQueryDiscord(
  {
    page,
    limit,
    username,
    bindEmail,
    token
  }
) {
  return request({
    url: '/discord/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      username,
      bindEmail,
      token
    }
  })
}

/**
 * 分页查telegramList
 * @param
 *   {
 *       page,
 *       limit,
 *       username,
 *       phone_prefix,
 *       phone
 *   } page,limit,必须
 * @returns {*}
 */
export function pageQueryTelegram(
  {
    page,
    limit,
    username,
    phone_prefix,
    phone
  }
) {
  return request({
    url: '/telegram/pageQuery',
    method: 'post',
    data: {
      page,
      limit,
      username,
      phone_prefix,
      phone
    }
  })
}

/**
 * 分页查bot
 * @param page
 * @param limit
 */
export function pageQueryBot({page, limit}) {
  return request({
    url: '/bot/pageQuery',
    method: 'post',
    data: {
      page,
      limit
    }
  })
}

/**
 * 查询账户类型列表
 * @returns
 * [
 *   {
 *    type: 'google',
 *    count: 10
 *   }
 *]
 */
export function queryAccountTypeList() {
  return request({
    url: '/accountBaseInfo/typeList',
    method: 'get'
  })
}


