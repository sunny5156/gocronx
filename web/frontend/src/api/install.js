import request from '@/utils/request'

export function store(data, callback) {
  return request({
    url: '/install/store',
    method: 'post',
    data: {
      data
    },
    callback: callback 
  })
}

export function status(data, callback) {
  return request({
    url: '/install/store',
    method: 'post',
    data: {
      data
    },
    callback: callback 
  })
}