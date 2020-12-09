import Vue from 'vue'

export const toBoolean = (v) => Boolean(parseInt(v))

/**
 * 转换空的查询参数
 */
export const filterQueryParams = (params) => Vue._.mapValues(params, (v) => v || undefined)

/**
 * 获取上传路径
 */
export const getUploadPath = () => {
  let BASE_API = ''
  if (process.env.NODE_ENV === 'production') {
    BASE_API = localStorage.getItem('BASE_API') // BASE_API = process.env.BASE_API
  } else {
    BASE_API = process.env.UPLOAD_PROXY
  }
  return BASE_API + 'manager/upload/file'
}

/**
 * 将树形结构数据转为list结构
 */
export const transformTreeToList = (treedata) => {
  const data = []
  const handleTreeSource = (treedata) => {
    Vue._.forEach(treedata, (value, key) => {
      data.push(value)
      if (!Vue._.isEmpty(value.children)) {
        handleTreeSource(value.children)
      }
    })
  }
  handleTreeSource(treedata)
  return data
}

/**
 * 转换为select options
 */
export const transformToOptions = (listdata) => {
  const data = []
  Vue._.forEach(listdata, (val, key) => {
    data.push({
      label: val.name,
      value: val.id
    })
  })
  return data
}
