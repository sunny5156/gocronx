<template>
  <el-container>
    <el-header>
      <!--<app-header></app-header>-->
      <app-nav-menu></app-nav-menu>
    </el-header>
    <el-main>
      <div id="main-container" v-cloak>
        <router-view/>
      </div>
    </el-main>
    <!--<el-footer>
      <app-footer></app-footer>
    </el-footer>-->
  </el-container>
</template>

<script>
  import installService from './api/install'
  import appHeader from './components/common/header.vue'
  import appNavMenu from './components/common/navMenu.vue'
  import appFooter from './components/common/footer.vue'

  export default {
    name: 'App',
    data() {
      return {}
    },
    created() {
      installService.status((data) => {
        if (!data) {
          this.$router.push('/install')
        }
      })
    },
    components: {
      appHeader,
      appNavMenu,
      appFooter
    }
  }
</script>
<style>
  [v-cloak] {
    display: none !important;
  }

  html {
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
  }

  .el-header {
    padding: 0;
    margin: 0;
    height: 60px;
  }

  .el-container {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  .el-main {
    padding: 0;
    margin: 0;
    height: calc(100% - 60px);
  }

  #main-container {
    height: 100%;
  }

  #main-container .el-main {
    margin: 20px 0 20px 20px;
  }

  .el-aside .el-menu {
    height: 100%;
  }

  .el-menu-item, .el-submenu__title {
    height: 59px !important;
    line-height: 59px !important;
    padding: 0 30px !important;
  }
</style>
