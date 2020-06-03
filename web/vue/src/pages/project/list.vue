<template>
  <el-container>
    <project-sidebar></project-sidebar>
    <el-main>
      <el-form :inline="true" size="mini">
        <el-form-item label="项目ID">
          <el-input v-model.trim="searchParams.id"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model.trim="searchParams.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-button size="mini" type="primary" v-if="this.$store.getters.user.isAdmin" @click="toEdit(null)">新增</el-button>
        <el-button size="mini" type="warning" @click="refresh">刷新</el-button>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :total="projectTotal"
        :page-size="20"
        @size-change="changePageSize"
        @current-change="changePage"
        @prev-click="changePage"
        @next-click="changePage">
      </el-pagination>
      <el-table
        :data="projects"
        tooltip-effect="dark"
        border
        style="width: 100%; margin: 10px 0;">
        <el-table-column
          prop="id"
          width="100"
          label="项目ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="account"
          label="创建者">
        </el-table-column>
        <el-table-column label="操作" width="300" v-if="this.isAdmin">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="toManager(scope.row)">人员管理</el-button>
            <el-button size="mini" type="primary" @click="toAddTask(scope.row)">添加任务</el-button>
            <el-button size="mini" type="primary" @click="toTaskList(scope.row)">任务列表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import projectSidebar from './sidebar'
import projectService from '../../api/project'

export default {
  name: 'project-list',
  components: { projectSidebar },
  data () {
    return {
      projects: [],
      projectTotal: 0,
      searchParams: {
        page_size: 20,
        page: 1,
        id: '',
        name: ''
      },
      isAdmin: this.$store.getters.user.isAdmin
    }
  },
  created () {
    this.search()
  },
  methods: {
    changePage (page) {
      this.searchParams.page = page
      this.search()
    },
    changePageSize (pageSize) {
      this.searchParams.page_size = pageSize
      this.search()
    },
    search (e, callback = null) {
      projectService.list(this.searchParams, (data) => {
        this.projects = data.data
        this.projectTotal = data.total
        this.$message.success('列表更新成功')
        if (callback) {
          callback()
        }
      })
    },
    remove (item) {
      this.$appConfirm(() => {
        projectService.remove(item.id, () => this.refresh())
      })
    },
    toEdit (item) {
      console.log(item)
      let path = ''
      if (item === null) {
        path = '/project/create'
      } else {
        path = `/project/edit/${item.id}`
      }
      this.$router.push(path)
    },
    toManager (item) {
      let path = ''
      path = `/project/user/list?project_id=${item.id}`
      this.$router.push(path)
    },
    toAddTask (item) {
      let path = ''
      path = `/task/create?project_id=${item.id}`
      this.$router.push(path)
    },
    toTaskList (item) {
      let path = ''
      path = `/task?project_id=${item.id}`
      this.$router.push(path)
    },
    refresh (e) {
      this.search(e, () => {
        this.$message.success('刷新成功')
      })
    },
    toTasks (item) {
      this.$router.push(
        {
          path: '/project',
          query: {
            host_id: item.id
          }
        })
    }
  }
}
</script>
