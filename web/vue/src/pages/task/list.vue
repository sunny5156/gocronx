<template>
  <el-container>
    <task-sidebar></task-sidebar>
    <el-main>
      <el-form ref="searchParams" :inline="true" size="mini" :model="searchParams">
        <el-form-item label="任务ID">
          <el-input v-model.trim="searchParams.id"></el-input>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input v-model.trim="searchParams.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model.trim="searchParams.account"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model.trim="searchParams.tag"></el-input>
        </el-form-item>
        <el-form-item label="执行方式">
          <el-select v-model.trim="searchParams.protocol">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in protocolList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属项目">
          <el-select v-model.trim="searchParams.project_id">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in project"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务节点">
          <el-select v-model.trim="searchParams.host_id">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in hosts"
              :key="item.id"
              :label="item.alias + ' - ' + item.name + ':' + item.port "
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model.trim="searchParams.status">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearSearch('searchParams')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-button type="primary" size="mini" @click="toEdit(null)" v-if="this.$store.getters.user.isAdmin">新增</el-button>
        <el-button type="success" size="mini" @click="batchOpenStatus">批量状态开</el-button>
        <el-button type="danger" size="mini" @click="batchCloseStatus">批量状态关</el-button>
        <el-button type="warning" size="mini" @click="refresh">刷新</el-button>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :total="taskTotal"
        :page-size="20"
        @size-change="changePageSize"
        @current-change="changePage"
        @prev-click="changePage"
        @next-click="changePage">
      </el-pagination>
      <el-table
        :data="tasks"
        v-loading="tableLoading"
        tooltip-effect="dark"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="任务创建时间:">
                {{scope.row.created | formatTime}} <br>
              </el-form-item>
              <el-form-item label="任务类型:">
                {{scope.row.level | formatLevel}} <br>
              </el-form-item>
              <el-form-item label="单实例运行:">
                {{scope.row.multi | formatMulti}} <br>
              </el-form-item>
              <el-form-item label="超时时间:">
                {{scope.row.timeout | formatTimeout}} <br>
              </el-form-item>
              <el-form-item label="重试次数:">
                {{scope.row.retry_times}} <br>
              </el-form-item>
              <el-form-item label="重试间隔:">
                {{scope.row.retry_interval | formatRetryTimesInterval}}
              </el-form-item>
              <br>
              <el-form-item label="任务节点">
                <div v-for="item in scope.row.hosts" :key="item.host_id">
                  {{item.alias}} - {{item.name}}:{{item.port}} <br>
                </div>
              </el-form-item>
              <br>
              <el-form-item label="命令:" style="width: 100%">
                {{scope.row.command}}
              </el-form-item>
              <br>
              <el-form-item label="备注" style="width: 100%">
                {{scope.row.remark}}
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          width="100"
          label="任务ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="任务名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="project_name"
          label="所属项目">
          <template slot-scope="scope">
            <el-button type="text" title="点击可筛选当前创建者" @click="filtrateProject(scope.row.project_id)">{{ scope.row.project_name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="创建者">
          <template slot-scope="scope">
            <el-button type="text" title="点击可筛选当前创建者" @click="filtrateUser(scope.row.account)">{{ scope.row.account }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签">
          <template slot-scope="scope">
            <el-button type="text" title="点击可筛选当前标签" @click="filtrateTag(scope.row.tag)">{{ scope.row.tag }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="spec"
          label="cron表达式"
          width="140">
        </el-table-column>
        <el-table-column label="下次执行时间" width="180">
          <template slot-scope="scope">
            {{scope.row.next_run_time | formatTime}}
          </template>
        </el-table-column>
        <el-table-column width="100" prop="protocol" :formatter="formatProtocol" label="执行方式"></el-table-column>
        <el-table-column label="状态" v-if="this.isAdmin" width="100">
          <template slot-scope="scope">
            <el-switch
              v-if="scope.row.level === 1"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-vlaue="0"
              active-color="#13ce66"
              @change="changeStatus(scope.row)"
              inactive-color="#ff4949">
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
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="340" v-if="this.isAdmin">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="toEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="runTask(scope.row)">手动执行</el-button>
            <el-button size="mini" type="info" @click="jumpToLog(scope.row)">查看日志</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import taskSidebar from './sidebar'
import taskService from '../../api/task'

export default {
  name: 'task-list',
  data () {
    return {
      tableLoading: true,
      tasks: [],
      hosts: [],
      project: [],
      taskTotal: 0,
      searchParams: {
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
      isAdmin: this.$store.getters.user.isAdmin,
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
      multipleSelection: []
    }
  },
  components: { taskSidebar },
  created () {
    const hostId = this.$route.query.host_id
    const projectId = this.$route.query.project_id
    if (hostId) {
      this.searchParams.host_id = hostId
    }
    if (projectId) {
      this.searchParams.project_id = parseInt(projectId)
    }

    this.search()
  },
  filters: {
    formatLevel (value) {
      if (value === 1) {
        return '主任务'
      }
      return '子任务'
    },
    formatTimeout (value) {
      if (value > 0) {
        return value + '秒'
      }
      return '不限制'
    },
    formatRetryTimesInterval (value) {
      if (value > 0) {
        return value + '秒'
      }
      return '系统默认'
    },
    formatMulti (value) {
      if (value > 0) {
        return '否'
      }
      return '是'
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    batchOpenStatus () {
      this.multipleSelection.forEach((v) => {
        if (!v.status) {
          taskService.enable(v.id, () => {
            v.status = 1
          })
        }
      })
    },
    batchCloseStatus () {
      this.multipleSelection.forEach((v) => {
        if (v.status) {
          taskService.disable(v.id, () => {
            v.status = 0
          })
        }
      })
    },
    filtrateUser (account) {
      this.searchParams.account = account
      this.search()
    },
    filtrateProject (projectId) {
      this.searchParams.project_id = projectId
      this.search()
    },
    filtrateTag (tag) {
      this.searchParams.tag = tag
      this.search()
    },
    changeStatus (item) {
      if (item.status) {
        taskService.enable(item.id)
      } else {
        taskService.disable(item.id)
      }
    },
    formatProtocol (row, col) {
      if (row[col.property] === 2) {
        return 'shell'
      }
      if (row.http_method === 1) {
        return 'http-get'
      }
      return 'http-post'
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
      const that = this
      this.tableLoading = true
      taskService.list(that.searchParams, (tasks, hosts, project) => {
        // debugger
        that.tableLoading = false
        that.tasks = tasks.data
        that.taskTotal = tasks.total
        that.hosts = hosts
        that.project = project
        // this.$message.success('列表更新成功')
        if (callback) {
          callback()
        }
      })
    },
    clearSearch (formName) {
      this.$refs[formName].resetFields()
      this.searchParams = {
        page_size: 20,
        page: 1,
        id: '',
        protocol: '',
        name: '',
        tag: '',
        host_id: '',
        status: '',
        account: '',
        project_id: ''
      }
      this.search(event, () => {
        this.$message.success('重置成功')
      })
    },
    runTask (item) {
      this.$appConfirm(() => {
        taskService.run(item.id, () => {
          this.$message.success('任务已开始执行')
        })
      }, true)
    },
    remove (item) {
      this.$appConfirm(() => {
        taskService.remove(item.id, () => {
          this.refresh()
        })
      })
    },
    jumpToLog (item) {
      window.open(`/#/task/log?task_id=${item.id}`,'_blank')
    },
    refresh (event) {
      this.search(event, () => {
        this.$message.success('刷新成功')
      })
    },
    toEdit (item) {
      let path = ''
      if (item === null) {
        path = '/#/task/create'
      } else {
        path = `/#/task/edit/${item.id}`
      }
      window.open(path,'_blank')
    }
  }
}
</script>

<style scoped>
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

  .el-table {
    margin: 10px 0;
  }
</style>
