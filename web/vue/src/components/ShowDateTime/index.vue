<template>
  <div>
    <span>{{ date }}</span>
  </div>
</template>
<script>
  export default {
    name: 'ShowTime',
    props: {
      // 时间戳
      time: {
        type: [String, Number, Object, Date],
        default: '1570261766'
      },
      // 返回类型
      type: {
        type: String,
        default: ''
      },
      // 显示内容，数组 'date'表示日期，'time'表示时间, 'week' 表示 日期
      show: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        date: ''
      }
    },
    created() {
      this.initTime()
    },
    methods: {
      initTime() {
        let date
        if (typeof this.time === 'object') {
          date = this.time
        } else if (this.time.length === 10) {
          date = new Date(parseInt(this.time) * 1000)
        } else {
          date = new Date(this.time)
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
        if (this.type === 'zh') {
          this.date = (this.show.indexOf('date') > -1 ? formatObj.y + '-' + formatObj.m + '-' + formatObj.d + ' ' : '') +
            (this.show.indexOf('time') > -1 ? formatObj.h + ':' + formatObj.i + ':' + formatObj.s + ' ' : '') +
            (this.show.indexOf('week') > -1 ? '星期' + ['日', '一', '二', '三', '四', '五', '六'][formatObj.a] : '')
        } else if (this.type === 'en') {
          this.date = (this.show.indexOf('date') > -1 ? formatObj.y + '-' + formatObj.m + '-' + formatObj.d + ' ' : '') +
            (this.show.indexOf('time') > -1 ? formatObj.h + ':' + formatObj.i + ':' + formatObj.s + ' ' : '') +
            (this.show.indexOf('week') > -1 ? ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.'][formatObj.a] : '')
        } else {
          this.date = (this.show.indexOf('date') > -1 ? formatObj.y + '年' + formatObj.m + '月' + formatObj.d + '日 ' : '') +
            (this.show.indexOf('time') > -1 ? formatObj.h + '时' + formatObj.i + '分' + formatObj.s + '秒 ' : '') +
            (this.show.indexOf('week') > -1 ? '星期' + ['日', '一', '二', '三', '四', '五', '六'][formatObj.a] : '')
        }
      }
    }
  }
</script>
