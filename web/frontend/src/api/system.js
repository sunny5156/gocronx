import request from '@/utils/request'

// 获取邮件服务器配置信息
export function getEmailInfo() {
  return request({
    url: `/system/mail`,
    method: 'get'
  })
}

// 获取slack信息
export function getSlackInfo() {
  return request({
    url: `/system/slack`,
    method: 'get'
  })
}

// 获取webhook信息
export function getWebhookInfo() {
  return request({
    url: `/system/webhook`,
    method: 'get'
  })
}

// 邮件通知新增用户
export function addEmailUser(data) {
  return request({
    url: `/system/mail/user`,
    method: 'post',
    data
  })
}

// 邮件通知删除用户
export function deleteEmailUser(id) {
  return request({
    url: `/system/mail/user/remove/${ id }`,
    method: 'post'
  })
}

// 添加channel
export function addChannel(data) {
  return request({
    url: `/system/slack/channel`,
    method: 'post',
    data
  })
}

// 删除channel
export function deleteChannel(id) {
  return request({
    url: `/system/slack/channel/remove/${ id }`,
    method: 'post'
  })
}

// 邮件服务器配置更新
export function updateEmail(data) {
  return request({
    url: `/system/mail/update`,
    method: 'post',
    data
  })
}

// slack配置更新
export function updateSlack(data) {
  return request({
    url: `/system/slack/update`,
    method: 'post',
    data
  })
}

// webhook配置更新
export function updateWebhook(data) {
  return request({
    url: `/system/webhook/update`,
    method: 'post',
    data
  })
}

// 登录日志
export function getLoginLogs(params) {
  return request({
    url: `/system/login-log`,
    method: 'get',
    params
  })
}
