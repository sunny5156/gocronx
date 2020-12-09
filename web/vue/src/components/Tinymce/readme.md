组件功能：富文本编辑器（保留原有标签属性）
组件结构：tinymce文件 + static/tinymce(源码)
组件传参：
  id: { // tinymce id
    type: String,
    default: function() {
      return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
    }
  },
  toolbar: { // 工具栏 ，默认为toolbar.js 
    type: Array,
    required: false,
  },
  menubar: { // 菜单栏
    type: String,
    default: 'file edit insert view format table'
  },
  height: { // tinymce 高
    type: [Number, String],
    required: false,
    default: 360
  },
  width: {// tinymce 宽
    type: [Number, String],
    required: false,
    default: 'auto'
  }
组件使用用例：
<template>
  <div>
    <tinymce v-model="description"  :height="400" />
  </div>
</template>
<script>
  import Tinymce from '@/components/Tinymce'
  export default {
    components: { Tinymce },
    data() {
      return {
        description: ''
      }
    }
  }
</script>