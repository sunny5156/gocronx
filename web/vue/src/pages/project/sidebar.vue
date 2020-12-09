<template>
  <el-aside width="180px">
    <el-menu
      :default-active="currentRoute"
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/project">项目列表</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'project-sidebar',
  data () {
    return {}
  },
  computed: {
    currentRoute () {
      if (this.$route.path === '/project/log') {
        return '/project/log'
      }
      return '/project'
    }
  }
}
</script>
