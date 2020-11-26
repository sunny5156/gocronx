/**
 * Created by yuxang on 18/05/20.
 */
import Vue from 'vue'
import { MessageBox } from 'element-ui'
import moment from 'moment'

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * 转换空的查询参数
 */
export const filterQueryParams = (params) => Vue._.mapValues(params, (v) => v || undefined)

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

/**
 * 时间转换
 */
export function fattCreateTime(time, str) {
  if (str === 'd') {
    return moment(time).format('YYYY-MM-DD')
  } else {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
  }
}

/**
 * addClass
 */
export function addClass(el, className) {
  el.classList.add(className)
}

/**
 * removeClass
 */
export function removeClass(el, className) {
  el.classList.remove(className)
}

/**
 * toBoolean
 */
export const toBoolean = (v) => Boolean(parseInt(v))

/* 从数组1的值（name+id）去除那么的合集数组 */
export function getArrayIdList(arr1) {
  const arr = []
  for (const a of arr1) {
    arr.push(a.id)
  }
  return arr
}

/* 获取一个当前日期的前七天的数组 */
export function getSevenDayArray() {
  const myDate = new Date()
  myDate.setDate(myDate.getDate() - 6)
  const dateArray = []
  const flag = 1
  let dateTemp
  // const  weekday =["周日","周一","周二","周三","周四","周五","周六"]
  for (let i = 0; i < 7; i++) {
    dateTemp = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() // + '(' + weekday[myDate.getDay()] + ')'
    dateArray.push(dateTemp)
    myDate.setDate(myDate.getDate() + flag)
  }
  return dateArray
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/* 去除文本域字符串的空行*/
export function replaceBlank(str) {
  const reg = /\n(\n)*( )*(\n)*\n/g
  return str.replace(reg, '\n')
}

/**
 * 数字小于10前补0
 * num 为 整数
 */

export function fromatNum(num) {
  return num > 9 ? num : '0' + num
}

export function resultAlert(res, nextFun) {
  const msg = { text: '', status: false }
  const list = res.length ? res : res.data
  Vue._.forEach(list, item => {
    if (item.status) {
      msg.text += `<i class="el-icon-success" style="color:#67c23a"></i>`
      msg.status = true
    } else {
      msg.text += `<i class="el-icon-error" style="color:#f56c6c"></i>`
    }
    msg.text += `<span style="padding-left:10px">${item.message}</span><br/>`
  })
  MessageBox.alert(msg.text, '执行结果', {
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true,
    callback: action => {
      if (nextFun) {
        nextFun(msg.status)
      }
      document.body.classList.remove('el-popup-parent--hidden')
    }
  })
}
