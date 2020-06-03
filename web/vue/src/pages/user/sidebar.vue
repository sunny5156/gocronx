<template>
  <el-aside width="180px">
    <el-menu
      :default-active="currentRoute"
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/user">用户管理</el-menu-item>
      <el-menu-item index="/user/other">其他</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'user-sidebar',
  data () {
    return {}
  },
  computed: {
    currentRoute () {
      if (this.$route.path === '/user/other') {
        return '/user/other'
      }
      return '/user'
    }
  }
}
</script>
