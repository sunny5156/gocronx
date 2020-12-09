<template>
  <div>
    <div class="content-box">
      <el-table ref=" table"
                :key="newDate"
                :data="listData"
                v-loading.lock="listLoading"
                element-loading-text="努力加载中"
                border
                style="width: 100%"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="account" label="用户名"></el-table-column>
        <el-table-column prop="ip" label="登录IP"></el-table-column>
        <el-table-column label="登录时间">
          <template slot-scope="scope">
            {{ scope.row.created | formatTime }}
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
  </div>
</template>

<script>
import { filterQueryParams } from '@/utils/help'
import { getLoginLogs } from '@/api/system'

export default {
  name: 'Logs',
  data() {
    return {
      newDate: new Date().getTime(),
      listData: [],
      listLoading: false,
      listQuery: {
        page: 1,
        page_size: 20
      },
      total: 0
    }
  },
  created() {
    this.renderList()
  },
  mounted() {
  },
  methods: {
    renderList() {
      this.listLoading = true
      getLoginLogs(this.listQuery).then(response => {
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
  watch: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
