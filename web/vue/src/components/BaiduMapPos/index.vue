<template>
  <div class="pos-wrap">
    当前城市：{{ addressForm.city || '' }} &nbsp;
    <el-button
      type="text"
      @click="handleChangeCity"
    >
      [手动切换]
    </el-button>
    <el-button
      type="text"
      @click="getLocation"
    >
      [重新定位]
    </el-button>
    <select-dialog
      v-bind.sync="selectDialogOption"
      @selectOk="selectOk"
    />
  </div>
</template>

<script>
  import cityList from './city'
  import SelectDialog from './SelectDialog'

  export default {
    components: { SelectDialog },
    mounted() {
      this.loadScript()
    },
    data() {
      return {
        levelList: null,
        addressForm: {
          city: ''
        },
        selectDialogOption: {
          open: false,
          cityList
        }
      }
    },
    methods: {
      cloneDeep(form) {
        const obj = this._.cloneDeep(this[form])
        this[form] = {}
        this[form] = obj
      },
      handleChangeCity() {
        this.selectDialogOption.open = true
      },
      selectOk(city) {
        this.addressForm.city = city || ''
      },
      loadScript() {
        new Promise((resolve, reject) => {
          if (!window.BMap) {
            var script = document.createElement('script')
            script.src = `http://api.map.baidu.com/api?v=2.0&ak=15k5p2xwqmaIWkDeqkmSzAcLGLcKhF9C&callback=onBMapCallback`
            document.body.appendChild(script)
            window.onBMapCallback = () => {
              resolve()
            }
          } else {
            resolve()
          }
        }).then(() => {
          this.getLocation()
        }).catch(() => {})
      },
      getLocation() {
        /*eslint-disable */
      // 基于 ip 定位(不准，会出现北京与全国)
      // var myCity = new BMap.LocalCity()
      // myCity.get(result => {
      //   this.addressForm.city = result.name
      // })
      // 优先调用浏览器H5定位接口，如果失败会调用IP定位
      var geolocation = new BMap.Geolocation()
      const that = this
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          that.addressForm.city = r.address.city || ''
          // alert('您的位置：' + r.point.lng + ',' + r.point.lat)
        } else {
          that.addressForm.city = ''
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .pos-wrap {
    min-width: 150px;
  }
</style>
