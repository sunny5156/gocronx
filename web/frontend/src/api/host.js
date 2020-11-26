import request from '@/utils/request'

// 任务节点列表
export function getHostList(params) {
  return request({
    url: '/host',
    method: 'get',
    params
  })
}

// 添加、编辑任务节点
export function addHost(data) {
  return request({
    url: `/host/store`,
    method: 'post',
    data
  })
}

// 删除任务节点
export function deleteHost(id) {
  return request({
    url: `/host/remove/${id}`,
    method: 'post'
  })
}

// 测试连接
export function testHostLink(id) {
  return request({
    url: `host/ping/${id}`,
    method: 'get'
  })
}
