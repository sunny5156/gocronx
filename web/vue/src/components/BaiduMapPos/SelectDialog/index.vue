<template>
  <el-dialog
    title="请选择城市"
    v-if="open"
    :visible="true"
    class="user-dialog"
    :close-on-click-modal="false"
    :close-on-pres-sescape="false"
    :before-close="onClose"
    width="600px"
    height="500px"
    v-dragMove
  >
    <template>
      <el-row>
        <el-col
          :offset="2"
          :span="22"
        >
          <span
            class="letter-wrap hover-text"
            @click="jumpPage(item)"
            v-for="(item, index) in initials"
            :key="index"
            :a="1"
          >{{ item }}</span>
        </el-col>
      </el-row>
      <article class="user-main">
        <div class="user-wrap">
          <el-row
            v-for="(item, key, index) in cityList"
            :key="index"
          >
            <el-row>
              <span
                class="userCate"
                :ref="'user' + key"
              >{{ key }}</span>
            </el-row>
            <el-col
              :offset="2"
              :span="10"
              v-for="(v, k) in item"
              :key="k"
            >
              <span
                class="hover-text user-tag"
                @click="selectUser(cityList[key][k])"
              >{{ cityList[key][k] }}</span>
            </el-col>
          </el-row>
        </div>
      </article>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      open: {
        type: Boolean,
        default: false
      },
      cityList: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        initials: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
      }
    },
    methods: {
      onClose() {
        this.$emit('update:open', false)
      },
      // 根据首字母位置jump
      jumpPage(item) {
        const ref = this.$refs['user' + item]
        if (ref) {
          const el = this.$refs['user' + item][0]
          var actualTop = el.offsetTop
          var current = el.offsetParent
          while (current && current.className !== 'user-main') {
            actualTop += current.offsetTop
            current = current.offsetParent
          }
          document.querySelector('.user-main').scrollTop = actualTop - 10
        }
      },
      // 选择user
      selectUser(user) {
        this.$emit('selectOk', user)
        this.$emit('update:open', false)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user-dialog {
    line-height: 20px;
  }
  .user-main {
    position: relative;
    height: 440px;
    overflow-y: auto;
  }
  .letter-wrap {
    display: inline-block;
    margin-right: 7px;
    text-align: center;
    font-size: 16px;
    margin-top: -10px;
    user-select: none;
  }
  .hover-text {
    &:hover {
      text-decoration: underline;
      color: #ff6700;
      cursor: pointer;
    }
  }
  .user-title {
    display: block;
    margin: 15px 0;
    font-size: 14px;
    font-weight: bold;
  }
  .user-wrap {
    padding: 0 50px;
  }
  .userCate {
    display: block;
    font-size: 18px;
    margin: 10px 0;
    border-top: 1px dotted #cccccc;
    padding-top: 10px;
    font-weight: bold;
    padding-left: 10px;
  }
  .user-tag {
    display: inline-block;
    margin: 5px 0;
  }
  .dialog-select-id {
    .el-table {
      img {
        width: 39px;
        height: 39px;
      }
    }
  }
</style>
