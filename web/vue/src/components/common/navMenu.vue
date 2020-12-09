<template>
  <div v-cloak>
    <div class="logo">
      gocronx 定时任务系统
    </div>
    <el-menu
      :default-active="currentRoute"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="padding-left: 180px;"
      router>
      <el-menu-item index="/project">项目管理</el-menu-item>
      <el-menu-item index="/task">任务管理</el-menu-item>
      <el-menu-item index="/host">任务节点</el-menu-item>
      <el-menu-item v-if="this.$store.getters.user.isAdmin" index="/user">用户管理</el-menu-item>
      <el-menu-item v-if="this.$store.getters.user.isAdmin" index="/system">系统管理</el-menu-item>
      <div style="float:right;">
        <el-submenu v-if="this.$store.getters.user.token" index="userStatus">
          <template slot="title"><i class="el-icon-service"></i>{{ this.$store.getters.user.account }}</template>
          <el-menu-item index="/user/edit-my-password">修改密码</el-menu-item>
          <el-menu-item @click="logout" index="/user/logout">退出</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'app-nav-menu',
  data () {
    return {}
  },
  computed: {
    currentRoute () {
      if (this.$route.path === '/') {
        return '/task'
      }
      const segments = this.$route.path.split('/')
      return `/${segments[1]}`
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .logo {
    position: absolute;
    top: 0;
    left: 10px;
    color: #fff;
    z-index: 999;
    line-height: 60px;
    font-size: 15px;
    font-weight: 600;
  }
</style>
