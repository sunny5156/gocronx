import request from '@/utils/request'

// 项目列表
export function getProjectList(params) {
  return request({
    url: '/project',
    method: 'get',
    params
  })
}

// 项目详情
export function getProjectDetail(id) {
  return request({
    url: `/project/${id}`,
    method: 'get',
  })
}

// 项目配置人员列表
export function getProjectUserList(params) {
  return request({
    url: `project/user/list/${params.project_id}`,
    method: 'get',
    params
  })
}


// 添加、编辑项目
export function addProject(data) {
  return request({
    url: '/project/store',
    method: 'post',
    data
  })
}

// 项目人员列表
export function getAllUser(data) {
  return request({
    url: `/user/search`,
    method: 'post',
    data
  })
}

// 删除项目管理人员
export function removeManager(id) {
  return request({
    url: `/project/user/remove/${id}`,
    method: 'post'
  })
}
// 添加项目管理人员
export function addManager(data) {
  return request({
    url: `/project/user/store`,
    method: 'post',
    data
  })
}
