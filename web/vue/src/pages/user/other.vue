<template>
  <el-container>
    <user-sidebar></user-sidebar>
    <el-main>我是一个新页面</el-main>
  </el-container>
</template>

<script>
  import userSidebar from './sidebar'

  export default {
    name: 'log',
    components: { userSidebar },
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
