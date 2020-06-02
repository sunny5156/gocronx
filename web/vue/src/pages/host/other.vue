<template>
  <el-container>
    <host-sidebar></host-sidebar>
    <el-main>我是一个新页面</el-main>
  </el-container>
</template>

<script>
  import hostSidebar from './sidebar'

  export default {
    name: 'log',
    components: { hostSidebar },
    data() {
      return {}
    },
    created() {
    },
    mounted() {
    },
    methods: {},
    filters: {},
    watch: {}
  }
</script>
