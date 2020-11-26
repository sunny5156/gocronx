<template>
  <div>
    <div class="header-box">
      <el-row class="right-row">
        <el-button type="primary" size="mini" @click="openUserDialog('add',{})">新增</el-button>
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
        <el-table-column prop="id" label="用户id"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="is_admin" :formatter="formatRole" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
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
        <el-table-column label="操作" width="300" v-if="this.isAdmin">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openUserDialog('edit',scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="handleEditPassword(scope.row)">修改密码</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
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
    <!--    添加、编辑用户-->
    <add-user v-bind.sync="addUserOption" @reload="renderList"></add-user>
    <!--    修改密码-->
    <edit-password v-bind.sync="editPasswordOption" @reload="renderList"></edit-password>
  </div>
</template>

<script>
import { getUserList, enableUser, disableUser, deleteUser } from '@/api/user'
import { filterQueryParams } from '@/utils/help'
import addUser from '@/views/userManager/components/addUser'
import editPassword from '@/views/userManager/components/editPassword'

export default {
  name: 'List',
  components: { addUser, editPassword },
  data() {
    return {
      newDate: new Date().getTime(),
      listData: [],
      listLoading: false,
      users: [],
      userTotal: 0,
      listQuery: {
        page_size: 20,
        page: 1
      },
      isAdmin: JSON.parse(localStorage.getItem('userInfo')).is_admin,
      addUserOption: {
        open: false,
        formData: {},
        type: 'add'
      },
      editPasswordOption: {
        open: false,
        formData: {}
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
    handleEditPassword(formData) {
      this.editPasswordOption = {
        open: true,
        formData
      }
    },
    openUserDialog(type, formData) {
      this.addUserOption = {
        open: true,
        type,
        formData
      }
    },
    changeStatus(row) {
      if (row.status) {
        enableUser(row.id).then(() => {
          row.status = 1
        })
      } else {
        disableUser(row.id).then(() => {
          row.status = 0
        })
      }
    },
    formatRole(row, col) {
      if (row[col.property] === 1) {
        return '管理员'
      }
      return '普通用户'
    },
    renderList() {
      this.listLoading = true
      const queryParams = filterQueryParams(this.listQuery)
      getUserList(queryParams).then(response => {
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
    remove(row) {
      this.$confirm('确认要删除此用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row.id)
        this.renderList()
      }).catch(() => {
      })
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
  },
  filters: {},
  watch: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
