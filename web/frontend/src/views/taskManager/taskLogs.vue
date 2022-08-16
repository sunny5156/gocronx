<template>
  <div>
    <!-- 搜索 -->
    <div class="header-box" ref="headerBox">
      <el-form ref="listQuery" :inline="true" :model="listQuery" class="advt-form-inline" size="mini">
        <el-form-item label="任务ID" prop="task_id">
          <el-input size="mini" v-model.trim="listQuery.task_id" clearable placeholder="请输入任务ID"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select size="mini" v-model.trim="listQuery.status" clearable placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
        <el-button type="danger" size="mini" @click="clearLogs">清空日志</el-button>
        <el-button size="mini" type="info" @click="renderList">刷新</el-button>
      </el-row>
    </div>
    <div class="content-box">
      <el-table ref="table"
                :key="newDate"
                :data="listData"
                v-loading.lock="listLoading"
                :default-expand-all="expand"
                element-loading-text="努力加载中"
                @header-click="handleExpand"
                border
                style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot="header">
            <svg-icon icon-class="right"/>
          </template>
          <template slot-scope="scope">
            <el-form label-position="left">
              <el-form-item>
                重试次数: {{ scope.row.retry_times }} <br>
                cron表达式: {{ scope.row.spec }} <br>
                命令: <pre style="margin: 0;">{{ scope.row.command }}</pre>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="task_id" label="任务ID">
        </el-table-column>
        <el-table-column prop="name" label="任务名称" width="300"></el-table-column>
        <el-table-column label="任务节点" width="300">
          <template slot-scope="scope">
            <div v-html="scope.row.hostname">{{ scope.row.hostname }}</div>
          </template>
        </el-table-column>
        <el-table-column label="执行时长" width="300">
          <template slot-scope="scope">
            执行时长: {{ scope.row.total_time > 0 ? scope.row.total_time : 1 }}秒<br>
            开始时间: {{ scope.row.start_time | formatTime }}<br>
            <span v-if="scope.row.status !== 1">结束时间: {{ scope.row.end_time | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span style="color:red" v-if="scope.row.status === 0">失败</span>
            <span style="color:green" v-else-if="scope.row.status === 1">执行中</span>
            <span v-else-if="scope.row.status === 2">成功</span>
            <span style="color:#4499EE" v-else-if="scope.row.status === 3">取消</span>
          </template>
        </el-table-column>
        <el-table-column label="执行结果" v-if="this.isAdmin">
          <template slot-scope="scope">
            <el-button type="success" size="mini"
                       v-if="scope.row.status === 2"
                       @click="showTaskResult(scope.row)"
            >
              查看结果
            </el-button>
            <el-button type="warning" size="mini"
                       v-if="scope.row.status === 0"
                       @click="showTaskResult(scope.row)"
            >
              查看结果
            </el-button>
            <el-button type="danger" size="mini"
                       v-if="scope.row.status === 1 && scope.row.protocol === 2"
                       @click="handleStopTask(scope.row)"
            >
              停止任务
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="执行结果" v-else>
          <template slot-scope="scope">
            <el-button type="success" size="mini"
                       v-if="scope.row.status === 2"
                       @click="showTaskResult(scope.row)"
            >
              查看结果
            </el-button>
            <el-button type="warning" size="mini"
                       v-if="scope.row.status === 0"
                       @click="showTaskResult(scope.row)"
            >
              查看结果
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <task-log-detail v-bind.sync="logsDetailOption"></task-log-detail>
  </div>
</template>

<script>
import { filterQueryParams } from '@/utils/help'
import { getTaskLogs, clearTaskLogs, stopTask } from '@/api/task'
import taskLogDetail from '@/views/taskManager/components/taskLogDetail'

export default {
  name: 'TaskLogs',
  components: { taskLogDetail },
  data() {
    return {
      expand: false,
      newDate: new Date().getTime(),
      listData: [],
      listLoading: false,
      tableLoading: true,
      logs: [],
      logTotal: 0,
      listQuery: {
        page_size: 20,
        page: 1,
        task_id: '',
        protocol: '',
        status: ''
      },
      isAdmin: JSON.parse(localStorage.getItem('userInfo')).is_admin,
      dialogVisible: false,
      currentTaskResult: {
        command: '',
        result: ''
      },
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
          value: '1',
          label: '失败'
        },
        {
          value: '2',
          label: '执行中'
        },
        {
          value: '3',
          label: '成功'
        },
        {
          value: '4',
          label: '取消'
        }
      ],
      total: 0,
      logsDetailOption: {
        open: false,
        detail: {}
      }
    }
  },
  created() {
    this.renderList()
  },
  mounted() {
  },
  methods: {
    handleStopTask(row) {
      stopTask({ id: row.id, task_id: row.task_id }).then(() => {
        this.renderList()
      })
    },
    handleExpand(column) {
      if (column.type === 'expand') {
        this.expand = !this.expand
        // 强制刷新DOM
        this.newDate = new Date().getTime()
      }
    },
    showTaskResult(row) {
      this.logsDetailOption = {
        open: true,
        detail: row
      }
    },
    renderList(search) {
      if (search) {
        this.listQuery.page = 1
      }
      this.listLoading = true
      const queryParams = filterQueryParams(this.listQuery)
      getTaskLogs(queryParams).then(response => {
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
    clearLogs() {
      clearTaskLogs().then(() => {
        this.listQuery.page = 1
        this.renderList()
      })
    },
    formatProtocol(row, col) {
      if (row[col.property] === 1) {
        return 'http'
      }
      return 'shell'
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
      this.listQuery.task_id = undefined
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
        this.listQuery.task_id = this.$route.query.id
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
</style>
