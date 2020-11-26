import request from '@/utils/request'

// 获取定时任务项目选项
export function getTaskProject() {
  return request({
    url: '/project/all',
    method: 'get'
  })
}

// 获取定时任务节点选项
export function getTaskHost() {
  return request({
    url: '/host/all',
    method: 'get'
  })
}

// 获取定时任务列表
export function getTimingTaskList(params) {
  return request({
    url: '/task',
    method: 'get',
    params
  })
}

// 启用定时任务
export function enableTimingTask(data, id) {
  return request({
    url: `/task/enable/${ id }`,
    method: 'post',
    data
  })
}

// 禁用定时任务
export function disableTimingTask(data, id) {
  return request({
    url: `/task/enable/${ id }`,
    method: 'post',
    data
  })
}

// 手动执行定时任务
export function handleStartTimingTask(id) {
  return request({
    url: `/task/run/${ id }`,
    method: 'get'
  })
}

// 删除定时任务
export function deleteTimingTask(id) {
  return request({
    url: `/task/remove/${ id }`,
    method: 'post'
  })
}

// 任务日志
export function getTaskLogs(params) {
  return request({
    url: `task/log`,
    method: 'get',
    params
  })
}

// 添加、编辑定时任务
export function editTimingTask(data) {
  return request({
    url: '/task/store',
    method: 'post',
    data
  })
}

// 清空日志
export function clearTaskLogs() {
  return request({
    url: '/task/log/clear',
    method: 'post'
  })
}

// 停止任务
export function stopTask(data) {
  return request({
    url: '/task/log/stop',
    method: 'post',
    data
  })
}
