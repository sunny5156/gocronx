<template>
  <el-container>
    <project-user-sidebar></project-user-sidebar>
    <el-main>
      <el-row>
        <el-col>
          项目名称:{{ project.name }}
        </el-col>
        <el-col>
          项目所属人:{{ project.account }}
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-button size="mini" type="primary" @click="toAdd(projectId)">新增</el-button>
        <el-button size="mini" type="warning" @click="refresh">刷新</el-button>
        <el-button size="mini" type="info" @click="goback">返回</el-button>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :total="userTotal"
        :page-size="20"
        @size-change="changePageSize"
        @current-change="changePage"
        @prev-click="changePage"
        @next-click="changePage">
      </el-pagination>
      <el-table
        :data="users"
        tooltip-effect="dark"
        border
        style="width: 100%; margin-top:10px;">
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="account"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="is_admin"
          :formatter="formatRole"
          label="角色">
        </el-table-column>
        <el-table-column label="操作" width="300" >
          <template slot-scope="scope">
            <el-button size="mini" type="danger" :disabled="scope.row.is_manager === 1" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <add-template-dialog v-bind.sync="addDialogOption" @reload="search"></add-template-dialog>
  </el-container>
</template>

<script>
import projectUserSidebar from './sidebar'
import projectUserService from '../../api/projectuser'
import projectService from '../../api/project'
import addTemplateDialog from './add'

export default {
  name: 'project-user-list',
  components: { projectUserSidebar, addTemplateDialog },
  data () {
    return {
      users: [],
      userTotal: 0,
      project: [],
      projectId: this.$route.query.project_id,
      searchParams: {
        project_id: this.$route.query.project_id,
        page_size: 20,
        page: 1
      },
      addDialogOption: {
        open: false,
        data: {}
      }
    }
  },
  created () {
    this.search()
  },
  methods: {
    changeStatus (item) {
      if (item.status) {
        projectUserService.enable(item.id)
      } else {
        projectUserService.disable(item.id)
      }
    },
    formatRole (row, col) {
      if (row[col.property] === 1) {
        return '管理员'
      }
      return '普通用户'
    },
    changePage (page) {
      this.searchParams.page = page
      this.search()
    },
    changePageSize (pageSize) {
      this.searchParams.page_size = pageSize
      this.search()
    },
    search (e, callback = null) {
      const projectId = this.$route.query.project_id
      projectService.detail(projectId, (project) => {
        this.project = project
      })
      projectUserService.list(projectId, this.searchParams, (data) => {
        this.users = data.data
        this.userTotal = data.total
        this.$message.success('列表更新成功')
        if (callback) {
          callback()
        }
      })
    },
    remove (item) {
      this.$appConfirm(() => {
        projectUserService.remove(item.id, () => {
          this.refresh()
        })
      })
    },
    toAdd (projectId) {
      this.addDialogOption = {
        open: true,
        data: {
          title: '添加用户',
          id: projectId
        }
      }
    },
    refresh (e) {
      this.search(e, () => {
        this.$message.success('刷新成功')
      })
    },
    goback (e) {
      this.$router.push('/project')
    }
  }
}
</script>
