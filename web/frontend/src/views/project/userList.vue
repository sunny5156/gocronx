<template>
  <div>
    <div class="header-box">
      <el-row class="right-row">
        <el-button size="mini" type="primary" @click="handleAddManager">新增</el-button>
      </el-row>
    </div>
    <div class="content-box">
      <el-table ref="table"
                :key="newDate"
                :data="listData"
                v-loading.lock="listLoading"
                element-loading-text="努力加载中"
                border
                style="width: 100%"
      >
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="project_name" label="项目名称"></el-table-column>
        <el-table-column prop="belong_to" label="项目所属人"></el-table-column>
        <el-table-column prop="account" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="is_admin" :formatter="formatRole" label="角色"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" :disabled="scope.row.is_manager === 1" @click="removeProjectManager(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="pagination-container">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper" small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="listQuery.page_size"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <add-project-manager v-bind.sync="addManagerOptions" @reload="renderList"></add-project-manager>
  </div>
</template>

<script>
import { getProjectUserList, getProjectDetail, removeManager, getAllUser } from '@/api/project'
import { filterQueryParams } from '@/utils/help'
import addProjectManager from '@/views/project/components/addProjectManager'

export default {
  name: 'UserList',
  components: { addProjectManager },
  data() {
    return {
      newDate: new Date().getTime(),
      listData: [],
      listLoading: false,
      listQuery: {
        page_size: 10,
        page: 1,
        project_id: '',
      },
      isAdmin: JSON.parse(localStorage.getItem('userInfo')).is_admin,
      total: 0,
      projectData: {},
      userList: [],
      addManagerOptions: {
        open: false,
        users: [],
        projectData: {}
      }
    }
  },
  created() {
    this.listQuery.project_id = this.$route.params.id
    this.getUserList()
    this.renderList()
  },
  mounted() {
  },
  methods: {
    formatRole (row, col) {
      if (row[col.property] === 1) {
        return '管理员'
      }
      return '普通用户'
    },
    handleAddManager() {
      this.addManagerOptions = {
        open: true,
        users: this.userList,
        projectData: this.projectData
      }
    },
    getUserList () {
      getAllUser({ not_show_message: true }).then(res => {
        this.userList = res.data.data
      })
    },
    removeProjectManager(id) {
      this.$confirm('确认要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeManager(id).then(() => {
          this.renderList()
        })
      }).catch(() => {
      })
    },
    renderList() {
      this.listLoading = true
      const params = filterQueryParams(this.listQuery)
      getProjectDetail(this.$route.params.id).then(res => {
        this.projectData = res.data
        const project_name = res.data.name
        const belong_to = res.data.account
        getProjectUserList(params).then(response => {
          const listData = response.data.data
          listData.forEach(v => {
            v.project_name = project_name
            v.belong_to = belong_to
          })
          this.total = response.data.total
          const table = this._.cloneDeep(listData)
          this.listData = []
          this.listData = table
          document.querySelector('.el-table__body-wrapper').scrollTop = 0
          this.listLoading = false
          this.$refs['table'].doLayout()
        }).catch(() => {
          this.listLoading = false
        })
      })
    },
    handleFilter() {
      this.newDate = new Date().getTime()
      this.listQuery.page = 1
      this.renderList()
    },
    handleSizeChange(val) {
      this.listQuery.page = 1
      this.listQuery.page_size = val
      this.renderList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.renderList()
    },
    clearSearch() {
      this.$refs.listQuery.resetFields()
      this.newDate = new Date().getTime()
      this.renderList()
    }
  },
  filters: {},
  watch: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
