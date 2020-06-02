<template>
  <el-container>
    <project-user-sidebar></project-user-sidebar>
    <el-main>
      <el-form ref="form" :model="form" :rules="formRules" label-width="100px" size="mini" style="width: 500px;">
        <el-form-item>
          <el-input v-model="form.id" type="hidden"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()">保存</el-button>
          <el-button @click="cancel(projectId)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import projectUserSidebar from './sidebar'
import projectUserService from '../../api/projectuser'
import projectService from '../../api/project'

export default {
  name: 'project-user-edit',
  components: { projectUserSidebar },
  data: function () {
    return {
      projectId: this.$route.params.id,
      form: {
        id: '',
        account: '',
        email: '',
        is_admin: 0,
        password: '',
        confirm_password: '',
        status: 1
      },
      formRules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    console.log('param', this.$route.params)
    const id = this.$route.params.id
    if (!id) {
      return
    }
    projectService.detail(id, (data) => {
      if (!data) {
        this.$message.error('数据不存在')
        return
      }
      this.form.id = data.id
      this.form.account = data.account
      this.form.email = data.email
      this.form.is_admin = data.is_admin
      this.form.status = data.status
    })
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.save()
      })
    },
    save () {
      projectUserService.update(this.form, () => {
        this.$router.push('/user')
      })
    },
    cancel (projectId) {
      this.$router.push(`/project/user/list?project_id=${projectId}`)
    }
  }
}
</script>
