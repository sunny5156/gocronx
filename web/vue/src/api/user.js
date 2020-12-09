import request from '@/utils/request'

// 用户列表
export function getUserList(query) {
  return request({
    url: '/user',
    method: 'get',
    params: query
  })
}

// 添加、编辑用户
export function addUser(data) {
  return request({
    url: '/user/store',
    method: 'post',
    data
  })
}

// 启用用户
export function enableUser(id) {
  return request({
    url: `/user/enable/${ id }`,
    method: 'post'
  })
}

// 禁用用户
export function disableUser(id) {
  return request({
    url: `/user/disable/${ id }`,
    method: 'post'
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/user/remove/${ id }`,
    method: 'post'
  })
}

// 修改密码
export function editPassword(id, data) {
  return request({
    url: `user/editPassword/${data.id}`,
    method: 'post',
    data
  })
}

//
export function editMyPassword(data) {
  return request({
    url: '/user/editMyPassword',
    method: 'post',
    data
  })
}

//
export function searchUser(data) {
  return request({
    url: 'user/search',
    method: 'post',
    data
  })
}
