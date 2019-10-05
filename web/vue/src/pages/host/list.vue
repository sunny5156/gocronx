<template>
  <el-container>
    <host-sidebar></host-sidebar>
    <el-main>
      <el-form :inline="true" size="mini">
        <el-form-item label="节点ID">
          <el-input v-model.trim="searchParams.id"></el-input>
        </el-form-item>
        <el-form-item label="主机名">
          <el-input v-model.trim="searchParams.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-button size="mini" type="primary" v-if="this.$store.getters.user.isAdmin" @click="toEdit(null)">新增</el-button>
        <el-button size="mini" type="info" @click="refresh">刷新</el-button>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :total="hostTotal"
        :page-size="20"
        @size-change="changePageSize"
        @current-change="changePage"
        @prev-click="changePage"
        @next-click="changePage">
      </el-pagination>
      <el-table
        :data="hosts"
        tooltip-effect="dark"
        border
        style="width: 100%; margin: 10px 0;">
        <el-table-column
          prop="id"
          width="100"
          label="节点ID">
        </el-table-column>
        <el-table-column
          prop="alias"
          label="节点名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="主机名">
        </el-table-column>
        <el-table-column
          prop="port" width="100"
          label="端口">
        </el-table-column>
        <el-table-column label="查看任务">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="toTasks(scope.row)">查看任务</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column label="操作" width="300" v-if="this.isAdmin">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="toEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="info" @click="ping(scope.row)">测试连接</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
  import hostSidebar from './sidebar'
  import hostService from '../../api/host'

  export default {
    name: 'host-list',
    components: { hostSidebar },
    data() {
      return {
        hosts: [],
        hostTotal: 0,
        searchParams: {
          page_size: 20,
          page: 1,
          id: '',
          name: '',
          alias: ''
        },
        isAdmin: this.$store.getters.user.isAdmin
      }
    },
    created() {
      this.search()
    },
    methods: {
      changePage(page) {
        this.searchParams.page = page
        this.search()
      },
      changePageSize(pageSize) {
        this.searchParams.page_size = pageSize
        this.search()
      },
      search(e, callback = null) {
        hostService.list(this.searchParams, (data) => {
          this.hosts = data.data
          this.hostTotal = data.total
          this.$message.success('列表更新成功')
          if (callback) {
            callback()
          }
        })
      },
      remove(item) {
        this.$appConfirm(() => {
          hostService.remove(item.id, () => this.refresh())
        })
      },
      ping(item) {
        hostService.ping(item.id, () => {
          this.$message.success('连接成功')
        })
      },
      toEdit(item) {
        let path = ''
        if (item === null) {
          path = '/host/create'
        } else {
          path = `/host/edit/${item.id}`
        }
        this.$router.push(path)
      },
      refresh(e) {
        this.search(e, () => {
          this.$message.success('刷新成功')
        })
      },
      toTasks(item) {
        this.$router.push(
          {
            path: '/task',
            query: {
              host_id: item.id
            }
          })
      }
    }
  }
</script>
