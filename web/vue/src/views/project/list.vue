<template>
  <div>
    <div class="header-box">
      <el-form ref="listQuery" :inline="true" :model="listQuery" class="advt-form-inline" size="mini">
        <el-form-item label="项目ID" prop="id">
          <el-input v-model.trim="listQuery.id" placeholder="请输入项目ID"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input v-model.trim="listQuery.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button data-type="search" type="primary" v-debounce:listQuery="handleFilter">搜索</el-button>
          <el-button data-type="clear" v-debounce:listQuery="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>
      <el-row class="right-row">
        <el-button size="mini" type="primary" v-if="isAdmin" @click="handleAddProject('add',{})">新增</el-button>
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
        <el-table-column prop="id" width="100" label="项目ID"></el-table-column>
        <el-table-column prop="name" label="项目名称"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="account" label="创建者"></el-table-column>
        <el-table-column label="操作" width="300" v-if="isAdmin">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleConfigManager(scope.row.id)">人员管理</el-button>
            <el-button size="mini" type="text" @click="handleAddTask('fromProject',scope.row)">添加任务</el-button>
            <el-button size="mini" type="text" @click="handleTaskList(scope.row)">任务列表</el-button>
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
    <add-project v-bind.sync="addProjectOption" @reload="renderList"></add-project>
    <add-task v-bind.sync="addTaskOption"></add-task>
  </div>
</template>

<script>
import { getProjectList } from '@/api/project'
import { filterQueryParams } from '@/utils/help'
import addProject from '@/views/project/components/addProject'
import addTask from '@/views/taskManager/components/addTask'
import { getTaskHost, getTaskProject } from '@/api/task'

export default {
  name: 'List',
  components: { addProject, addTask },
  data() {
    return {
      newDate: new Date().getTime(),
      listData: [],
      listLoading: false,
      users: [],
      userTotal: 0,
      listQuery: {
        page_size: 20,
        page: 1,
        id: '',
        name: ''
      },
      isAdmin: JSON.parse(localStorage.getItem('userInfo')).is_admin,
      total: 0,
      addProjectOption: {
        open: false,
        formData: {},
        type: 'add'
      },
      addTaskOption: {
        open: false,
        taskData: {},
        type: 'fromProject',
        selectOptions: {}
      },
      project: [],
      hosts: []
    }
  },
  created() {
    this.getProjectOptions()
    this.getHostOptions()
    this.renderList()
  },
  mounted() {
  },
  methods: {
    handleConfigManager(id) {
      this.$router.push(`/project/list/user/${ id }`)
    },
    handleTaskList (item) {
      this.$router.push(`/task/manager/timing-tasks?project_id=${item.id}`)
    },
    getProjectOptions() {
      getTaskProject().then(res => {
        this.project = res.data || []
      })
    },
    getHostOptions() {
      getTaskHost().then(res => {
        this.hosts = res.data || []
      })
    },
    handleAddTask(type,taskData) {
      this.addTaskOption = {
        open: true,
        type,
        taskData,
        selectOptions: {
          hosts: this.hosts,
          project: this.project
        }
      }
    },
    handleAddProject(type,formData) {
      this.addProjectOption = {
        open: true,
        type,
        formData
      }
    },
    renderList() {
      this.listLoading = true
      const queryParams = filterQueryParams(this.listQuery)
      getProjectList(queryParams).then(response => {
        const listData = response.data.data
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
