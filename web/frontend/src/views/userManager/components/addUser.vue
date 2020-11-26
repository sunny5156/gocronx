<template>
  <el-dialog
    :title="`${title}用户`"
    :visible="open"
    class="task-log"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
    v-drag-move
  >
    <template>
      <el-form ref="form" :model="form" size="mini" :rules="formRules" label-width="100px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <template v-if="!form.id">
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_password">
            <el-input v-model="form.confirm_password" type="password"></el-input>
          </el-form-item>
        </template>
        <el-form-item label="角色" prop="is_admin">
          <el-radio-group v-model="form.is_admin">
            <el-radio :label="0">普通用户</el-radio>
            <el-radio :label="1">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addUser } from '@/api/user'

export default {
  name: 'AddUser',
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    },
    type: {
      required: true,
      default: 'add',
      type: String
    },
    formData: {
      required: true,
      default: () => {},
      type: Object
    },
  },
  data() {
    return {
      title: '新增',
      form: {
        id: '',
        account: '',
        name: '',
        email: '',
        is_admin: 0,
        password: '',
        confirm_password: '',
        status: 1
      },
      formRules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '请输入有效邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addUser(this.form).then(() => {
            this.$emit('reload')
            this.onClose()
          })
        }
      })
    },
    onClose() {
      this.form = {
        id: '',
          account: '',
          name: '',
          email: '',
          is_admin: 0,
          password: '',
          confirm_password: '',
          status: 1
      }
      this.$refs['form'].resetFields()
      this.$emit('update:open', false)
    }
  },
  filters: {},
  watch: {
    open(val) {
      if (val) {
        if (this.type === 'edit') {
          this.title = '编辑'
          this.form.id = this.formData.id
          this.form.account = this.formData.account
          this.form.name = this.formData.name
          this.form.email = this.formData.email
          this.form.is_admin = this.formData.is_admin
          this.form.status = this.formData.status
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
