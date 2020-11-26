// import Vue from 'vue'
function ObjectNull(obj) {
  const arr = []
  for (const k in obj) {
    if (obj[k] === '' || obj[k] === undefined || obj[k].length === 0) {
      arr.push(k)
    }
  }
  return arr
}
export default {
  inserted(el, binding, vnode) {
    const { arg, value } = binding
    if (value && arg) {
      sessionStorage.setItem(arg, JSON.stringify(vnode.context[arg]))
      sessionStorage.setItem('pre' + arg, ObjectNull(vnode.context[arg]))
    }
    el.addEventListener('click', _ => {
      if (value && arg) {
        const ret1 = sessionStorage.getItem('pre' + arg).split(',').find(item => { return vnode.context[arg][item] === '' || vnode.context[arg][item] === undefined || vnode.context[arg][item] === null || vnode.context[arg][item].length === 0 })
        const ret2 = sessionStorage.getItem('pre' + arg).split(',').every(item => { return vnode.context[arg][item] === '' || vnode.context[arg][item] === undefined || vnode.context[arg][item] === null || vnode.context[arg][item].length === 0 })
        const compareVar = JSON.stringify(vnode.context[arg]) !== sessionStorage.getItem(arg) /* 全相等 */||
          ret1 && el.getAttribute('data-type') === 'form' /* 针对form表单 */||
          el.getAttribute('data-type') === 'clear' && !ret2 /* 针对清空button */
        if (compareVar) {
          value()
          sessionStorage.setItem(arg, JSON.stringify(vnode.context[arg]))
        }
      } else {
        if (!el.disabled) {
          el.disabled = true
          setTimeout(() => {
            el.disabled = false
          }, binding.value || 1000)
        }
      }
    })
  },
  unbind(el, binding) {
    const { arg, value } = binding
    if (value && arg) {
      sessionStorage.removeItem(arg)
      sessionStorage.removeItem('pre' + arg)
    }
  }
}
