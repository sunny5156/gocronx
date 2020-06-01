import httpClient from '../utils/httpClient'

export default {
  // 用户列表
  list (projectId, query, callback) {
    httpClient.get(`/project/user/list/${projectId}`, query, callback)
  },
  remove (id, callback) {
    httpClient.post(`/project/user/remove/${id}`, {}, callback)
  },
  update (data, callback) {
    httpClient.post('/project/user/store', data, callback)
  }

}
