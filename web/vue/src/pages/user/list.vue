<template>
  <el-container>
    <user-sidebar></user-sidebar>
    <el-main>
      <el-row type="flex" justify="end">
        <el-button size="mini" type="primary" @click="toEdit(null)">新增</el-button>
        <el-button size="mini" type="info" @click="refresh">刷新</el-button>
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
          label="用户id">
        </el-table-column>
        <el-table-column
          prop="name"
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
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-vlaue="0"
              active-color="#13ce66"
              @change="changeStatus(scope.row)"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" v-if="this.isAdmin">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="toEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="editPassword(scope.row)">修改密码</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
  import userSidebar from './sidebar'
  import userService from '../../api/user'

  export default {
    name: 'user-list',
    components: { userSidebar },
    data() {
      return {
        users: [],
        userTotal: 0,
        searchParams: {
          page_size: 20,
          page: 1
        },
        isAdmin: this.$store.getters.user.isAdmin
      }
    },
    created() {
      this.search()
    },
    methods: {
      changeStatus(item) {
        if (item.status) {
          userService.enable(item.id)
        } else {
          userService.disable(item.id)
        }
      },
      formatRole(row, col) {
        if (row[col.property] === 1) {
          return '管理员'
        }
        return '普通用户'
      },
      changePage(page) {
        this.searchParams.page = page
        this.search()
      },
      changePageSize(pageSize) {
        this.searchParams.page_size = pageSize
        this.search()
      },
      search(e, callback = null) {
        userService.list(this.searchParams, (data) => {
          this.users = data.data
          this.userTotal = data.total
          this.$message.success('列表更新成功')
          if (callback) {
            callback()
          }
        })
      },
      remove(item) {
        this.$appConfirm(() => {
          userService.remove(item.id, () => {
            this.refresh()
          })
        })
      },
      toEdit(item) {
        let path = ''
        if (item === null) {
          path = '/user/create'
        } else {
          path = `/user/edit/${item.id}`
        }
        this.$router.push(path)
      },
      refresh(e) {
        this.search(e, () => {
          this.$message.success('刷新成功')
        })
      },
      editPassword(item) {
        this.$router.push(`/user/edit-password/${item.id}`)
      }
    }
  }
</script>
