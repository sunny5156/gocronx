<template>
  <div>
    <!-- 搜索 -->
    <div class="header-box" ref="headerBox">
      <el-form ref="listQuery" :inline="true" :model="listQuery" class="advt-form-inline" size="mini">
        <el-form-item prop="project_id" label="所属项目">
          <el-select v-model.trim="listQuery.project_id" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in project"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="id" label="任务ID">
          <el-input v-model.trim="listQuery.id" clearable placeholder="请输入任务ID"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="任务名称">
          <el-input v-model.trim="listQuery.name" clearable placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item prop="account" label="创建者">
          <el-input v-model.trim="listQuery.account" clearable placeholder="请输入创建者"></el-input>
        </el-form-item>
        <el-form-item prop="tag" label="标签">
          <el-input v-model.trim="listQuery.tag" placeholder="请输入标签" clearable></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model.trim="listQuery.status" clearable placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="host_id" label="任务节点">
          <el-select v-model.trim="listQuery.host_id" style="width:350px;" clearable placeholder="请选择">
            <el-option
              v-for="item in hosts"
              :key="item.id"
              :label="item.alias + ' - ' + item.name + ':' + item.port "
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button data-type="search" type="primary" @click="handleFilter">搜索</el-button>
          <el-button data-type="clear" @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>
      <el-row class="right-row">
        <el-button type="primary" size="mini" @click="openTaskDialog('add',{})">新增</el-button>
        <el-button type="success" :disabled="!multipleSelection.length" size="mini" @click="enableMoreTask">批量状态开</el-button>
        <el-button type="danger" :disabled="!multipleSelection.length" size="mini" @click="disableMoreTask">批量状态关</el-button>
      </el-row>
    </div>
    <div class="content-box">
      <el-table ref="table"
                :key="newDate"
                :data="listData"
                :default-expand-all="expand"
                v-loading.lock="listLoading"
                element-loading-text="努力加载中"
                @selection-change="handleSelectionChange"
                @header-click="handleExpand"
                border
                style="width: 100%"
      >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot="header">
            <svg-icon icon-class="right" />
          </template>
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="任务创建时间:">
                {{ scope.row.created | formatTime }} <br>
              </el-form-item>
              <el-form-item label="任务类型:">
                {{ scope.row.level | formatLevel }} <br>
              </el-form-item>
              <el-form-item label="单实例运行:">
                {{ scope.row.multi | formatMulti }} <br>
              </el-form-item>
              <el-form-item label="超时时间:">
                {{ scope.row.timeout | formatTimeout }} <br>
              </el-form-item>
              <el-form-item label="重试次数:">
                {{ scope.row.retry_times }} <br>
              </el-form-item>
              <el-form-item label="重试间隔:">
                {{ scope.row.retry_interval | formatRetryTimesInterval }}
              </el-form-item>
              <br>
              <el-form-item label="任务节点">
                <div v-for="item in scope.row.hosts" :key="item.host_id">
                  {{ item.alias }} - {{ item.name }}:{{ item.port }} <br>
                </div>
              </el-form-item>
              <br>
              <el-form-item label="命令:" style="width: 100%">
                <pre style="margin:0;">{{ scope.row.command }}</pre>
              </el-form-item>
              <br>
              <el-form-item label="备注" style="width: 100%">
                {{ scope.row.remark }}
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" width="100" label="任务ID" align="center"></el-table-column>
        <el-table-column prop="name" label="任务名称" align="center" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="project_name" label="所属项目" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              title="点击可筛选当前所属项目"
              @click="filterList('project_id',scope.row.project_id)"
            >
              {{ scope.row.project_name }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="创建者" align="center">
          <template slot-scope="scope">
            <el-button type="text" title="点击可筛选当前创建者" @click="filterList('account',scope.row.account)">{{ scope.row.account }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="tag" label="标签" align="center">
          <template slot-scope="scope">
            <el-button type="text" title="点击可筛选当前标签" @click="filterList('tag',scope.row.tag)">{{ scope.row.tag }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="spec" label="cron表达式" header-align="center" width="140"></el-table-column>
        <el-table-column label="下次执行时间" align="center" width="180">
          <template slot-scope="scope">
            {{ scope.row.next_run_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column label="状态" v-if="this.isAdmin" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              v-if="scope.row.level === 1"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-vlaue="0"
              active-color="#13ce66"
              @change="changeStatus(scope.row)"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="状态" v-else width="100">
          <template slot-scope="scope">
            <el-switch
              v-if="scope.row.level === 1"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-vlaue="0"
              active-color="#13ce66"
              :disabled="true"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="340" v-if="this.isAdmin" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openTaskDialog('edit',scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="runTask(scope.row)">手动执行</el-button>
            <el-button size="mini" type="info" @click="jumpToLog(scope.row)">查看日志</el-button>
            <el-button size="mini" type="danger" @click="removeTask(scope.row)">删除</el-button>
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
    <!--    新增任务-->
    <add-task v-bind.sync="addTaskOption" @reload="renderList"></add-task>
  </div>
</template>

<script>
import { getTaskProject, getTaskHost, getTimingTaskList, enableTimingTask, disableTimingTask, handleStartTimingTask, deleteTimingTask } from '@/api/task'
import { filterQueryParams } from '@/utils/help'
import addTask from '@/views/taskManager/components/addTask'

export default {
  name: 'TimingTasks',
  components: { addTask },
  data() {
    return {
      expand: false,
      newDate: new Date().getTime(),
      listData: [],
      listLoading: false,
      tableLoading: true,
      tasks: [],
      hosts: [],
      project: [],
      taskTotal: 0,
      listQuery: {
        page_size: 20,
        page: 1,
        id: '',
        protocol: '',
        name: '',
        tag: '',
        host_id: '',
        status: '',
        account: '',
        project_id: this.$route.query.project_id
      },
      isAdmin: JSON.parse(localStorage.getItem('userInfo')).is_admin,
      protocolList: [
        {
          value: '1',
          label: 'http'
        },
        {
          value: '2',
          label: 'shell'
        }
      ],
      statusList: [
        {
          value: '2',
          label: '激活'
        },
        {
          value: '1',
          label: '停止'
        }
      ],
      total: 0,
      multipleSelection: [],
      addTaskOption: {
        open: false,
        taskData: {},
        type: 'add',
        selectOptions: {}
      }
    }
  },
  created() {
    // if (this.$route.query.project_id) {
    //   this.listQuery.project_id = Number(this.$route.query.project_id)
    // }
    // if (this.$route.query.host_id) {
    //   this.listQuery.host_id = Number(this.$route.query.host_id)
    // }
    this.getProjectOptions()
    this.getHostOptions()
    this.renderList()
  },
  mounted() {
  },
  methods: {
    handleExpand(column) {
      if (column.type === 'expand') {
        this.expand = !this.expand
        // 强制刷新DOM
        this.newDate = new Date().getTime()
      }
    },
    jumpToLog(row) {
      this.$router.push(`/task/manager/task-logs?id=${ row.id }`)
    },
    filterList(type,val) {
      this.listQuery[type] = val
      this.renderList('search')
    },
    openTaskDialog(type,data) {
      this.addTaskOption = {
        open: true,
        type,
        taskData: data,
        selectOptions: {
          hosts: this.hosts,
          project: this.project
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    enableMoreTask() {
      this.multipleSelection.forEach((v) => {
        if (!v.status) {
          enableTimingTask({ not_show_message: true }, v.id).then(() => {
            v.status = 1
          })
        }
      })
    },
    disableMoreTask() {
      this.multipleSelection.forEach((v) => {
        if (v.status) {
          disableTimingTask({ not_show_message: true }, v.id).then(() => {
            v.status = 0
          })
        }
      })
    },
    removeTask(item) {
      this.$confirm('确认要删除定时任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTimingTask(item.id).then(() => {
          this.renderList()
        })
      }).catch(() => {
      })
    },
    runTask(item) {
      this.$confirm('确认要手动执行吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        handleStartTimingTask(item.id).then(res => {
          this.$message.success(res.message)
        })
      }).catch(() => {
      })
    },
    changeStatus(item) {
      if (item.status) {
        enableTimingTask({ not_show_message: true }, item.id)
      } else {
        disableTimingTask({ not_show_message: true }, item.id)
      }
    },
    formatProtocol(row, col) {
      if (row[col.property] === 2) {
        return 'shell'
      }
      if (row.http_method === 1) {
        return 'http-get'
      }
      return 'http-post'
    },
    renderList(search) {
      if(search) {
        this.listQuery.page = 1
      }
      this.listLoading = true
      // this.expand = false
      const queryParams = filterQueryParams(this.listQuery)
      getTimingTaskList(queryParams).then(response => {
        const listData = response.data.data
        this.total = response.data.total
        const table = this._.cloneDeep(listData)
        this.listData = []
        this.listData = table
        document.querySelector('.el-table__body-wrapper').scrollTop = 0
        this.listLoading = false
        this.$refs['table'].doLayout()
        this.multipleTable = []
      }).catch(() => {
        this.listLoading = false
      })
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
    handleFilter() {
      // this.newDate = new Date().getTime()
      this.listQuery.page = 1
      this.renderList('search')
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
      this.listQuery.project_id = undefined
      this.listQuery.host_id = undefined
      // this.newDate = new Date().getTime()
      this.renderList()
    }
  },
  filters: {
    formatTime(time) {
      const fillZero = function(num) {
        return num >= 10 ? num : '0' + num
      }
      const date = new Date(time)

      const result = date.getFullYear() + '-' +
        (fillZero(date.getMonth() + 1)) + '-' +
        fillZero(date.getDate()) + ' ' +
        fillZero(date.getHours()) + ':' +
        fillZero(date.getMinutes()) + ':' +
        fillZero(date.getSeconds())

      if (result.indexOf('20') !== 0) {
        return ''
      }

      return result
    },
    formatLevel(value) {
      if (value === 1) {
        return '主任务'
      }
      return '子任务'
    },
    formatTimeout(value) {
      if (value > 0) {
        return value + '秒'
      }
      return '不限制'
    },
    formatRetryTimesInterval(value) {
      if (value > 0) {
        return value + '秒'
      }
      return '系统默认'
    },
    formatMulti(value) {
      if (value > 0) {
        return '否'
      }
      return '是'
    }
  },
  watch: {
    expand: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          if (document.querySelector('.el-table th>.cell > svg')) {
            if (val) {
              document.querySelector('.el-table th>.cell > svg').style.transform = 'rotate(90deg)'
            } else {
              document.querySelector('.el-table th>.cell > svg').style.transform = 'rotate(0deg)'
            }
          }
        })
      }

    },
    $route: {
      deep: true,
      immediate: true,
      handler() {
        if (this.$route.query.project_id) {
          this.listQuery.project_id = Number(this.$route.query.project_id)
          this.listQuery.host_id = undefined
        }
        if (this.$route.query.host_id) {
          this.listQuery.host_id = Number(this.$route.query.host_id)
          this.listQuery.project_id = undefined
        }
        this.handleFilter()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-table th > .cell > svg {
  color: #fff;
  transition: linear .5s;
  cursor: pointer;
}
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>
