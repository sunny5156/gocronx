<template>
  <el-container>
    <project-sidebar></project-sidebar>
    <el-main>
      <el-form ref="form" size="mini" :model="form" :rules="formRules" label-width="100px" style="width: 500px;">
        <el-form-item>
          <el-input v-model="form.id" type="hidden"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="5"
            size="medium"
            width="100"
            v-model="form.remark">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import projectSidebar from './sidebar'
  import projectService from '../../api/project'

  export default {
    name: 'edit',
    components: { projectSidebar },
    data: function () {
      return {
        form: {
          id: '',
          name: '',
          remark: ''
        },
        formRules: {
          name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请输入项目备注', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      const id = this.$route.params.id
      if (!id) {
        return
      }
      projectService.detail(id, (data) => {
        if (!data) {
          this.$message.error('数据不存在')
          this.cancel()
          return
        }
        this.form.id = data.id
        this.form.name = data.name
        this.form.remark = data.remark
      })
    },
    methods: {
      submit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false
          }
          this.save()
        })
      },
      save() {
        projectService.update(this.form, () => {
          this.$router.push('/project')
        })
      },
      cancel() {
        this.$router.push('/project')
      }
    }
  }
</script>
