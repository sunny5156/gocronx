<template>
  <div>
    <div
      id="tp-weather-widget"
      class="weather"
    />
  </div>
</template>

<script>
  export default {
    name: 'Weather',
    data() {
      return {
      }
    },
    created() {
      this.formatFunc(window, document, 'script', 'tpwidget', '//widget.seniverse.com/widget/chameleon.js')
      window.tpwidget('init', {
        'flavor': 'slim',
        'location': 'WX4FBXXFKE4F',
        'geolocation': 'enabled',
        'language': 'zh-chs',
        'unit': 'c',
        'theme': 'chameleon',
        'container': 'tp-weather-widget',
        'bubble': 'enabled',
        'alarmType': 'badge',
        'color': '#F47837',
        'uid': 'U8C5C5AE4E',
        'hash': 'dfc71b719ddf40f951953275ca232ede'
      })
      window.tpwidget('show')
    },
    methods: {
      formatFunc(T, h, i, n, k, P, a, g, e) {
        g = function() {
          P = h.createElement(i)
          a = h.getElementsByTagName(i)[0]
          P.src = k
          P.charset = 'utf-8'
          P.async = 1
          a.parentNode.insertBefore(P, a)
        }
        T['ThinkPageWeatherWidgetObject'] = n
        T[n] || (T[n] = function() {
          (T[n].q = T[n].q || []).push(arguments)
        })
        T[n].l = +new Date()
        if (T.attachEvent) {
          T.attachEvent('onload', g)
        } else {
          T.addEventListener('load', g, false)
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .weather {
    line-height: normal;
    margin: {
      top: 10px;
      bottom: 10px;
    }
    .tpwthwidt .container__sDy_v_ {
      display: none;
    }
  }
</style>
