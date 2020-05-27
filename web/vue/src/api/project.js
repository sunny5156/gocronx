import httpClient from '../utils/httpClient'

export default {
  // 任务列表
  list(query, callback) {
    httpClient.get('/project', query, callback)
  },

  all(query, callback) {
    httpClient.get('/project/all', {}, callback)
  },

  detail(id, callback) {
    httpClient.get(`/project/${id}`, {}, callback)
  },

  update(data, callback) {
    httpClient.post('/project/store', data, callback)
  },

  remove(id, callback) {
    httpClient.post(`/project/remove/${id}`, {}, callback)
  }
}
