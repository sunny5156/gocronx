<template>
  <el-aside width="180px">
    <el-menu
      :default-active="currentRoute"
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/host">任务节点</el-menu-item>
      <el-menu-item index="/host/other">其他</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'host-sidebar',
  data () {
    return {}
  },
  computed: {
    currentRoute () {
      if (this.$route.path === '/host/other') {
        return '/host/other'
      }
      return '/host'
    }
  }
}
</script>
