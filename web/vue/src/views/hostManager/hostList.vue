<template>
  <div>
    <div class="header-box">
      <el-form ref="listQuery" :inline="true" :model="listQuery" class="advt-form-inline" size="mini">
        <el-form-item label="节点ID" prop="id">
          <el-input v-model.trim="listQuery.id" clearable placeholder="请输入节点ID"></el-input>
        </el-form-item>
        <el-form-item label="主机名" prop="name">
          <el-input v-model.trim="listQuery.name" clearable placeholder="请输入主机名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button data-type="search" type="primary" v-debounce:listQuery="handleFilter">搜索</el-button>
          <el-button data-type="clear" v-debounce:listQuery="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>
      <el-row class="right-row">
        <el-button type="primary" size="mini" @click="openHostDialog('add',{})">新增</el-button>
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
        <el-table-column prop="id" width="100" label="节点ID">
        </el-table-column>
        <el-table-column prop="alias" label="节点名称"></el-table-column>
        <el-table-column prop="name" label="主机名"></el-table-column>
        <el-table-column prop="port" width="100" label="端口"></el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column label="操作" v-if="isAdmin">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openHostDialog('edit',scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="toTasks(scope.row.id)">查看任务</el-button>
            <el-button size="mini" type="info" @click="testLink(scope.row.id)">测试连接</el-button>
            <el-button size="mini" type="danger" @click="removeHost(scope.row)">删除</el-button>
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
    <add-host v-bind.sync="addHostOptions" @reload="renderList"></add-host>
  </div>
</template>

<script>
import { getHostList, deleteHost, testHostLink } from '@/api/host'
import { filterQueryParams } from '@/utils/help'
import addHost from '@/views/hostManager/components/addHost'
export default {
  name: 'HostList',
  components: { addHost },
  data() {
    return {
      newDate: new Date().getTime(),
      listData: [],
      listLoading: false,
      isAdmin: JSON.parse(localStorage.getItem('userInfo')).is_admin,
      hosts: [],
      total: 0,
      listQuery: {
        page_size: 20,
        page: 1,
        id: '',
        name: '',
        alias: ''
      },
      addHostOptions: {
        open: false,
        type: 'add',
        formData: {}
      }
    }
  },
  created() {
    this.renderList()
  },
  mounted() {},
  methods: {
    toTasks(id) {
      this.$router.push(`/task/manager/timing-tasks?host_id=${id}`)
    },
    testLink(id) {
      testHostLink(id).then(res => {
        this.$message.success(res.message)
      })
    },
    removeHost(row) {
      this.$confirm('确认要删除任务节点吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteHost(row.id).then(() => {
          this.renderList()
        })
      }).catch(() => {
      })
    },
    openHostDialog(type,formData) {
      this.addHostOptions = {
        open: true,
        type,
        formData
      }
    },
    renderList() {
      this.listLoading = true
      const queryParams = filterQueryParams(this.listQuery)
      getHostList(queryParams).then(response => {
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
