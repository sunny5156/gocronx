<template>
  <el-dialog
    :title="data.title"
    :visible="open"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="740px"
  >
    <template>
      <el-form ref="form" :model="form"  label-width="100px" size="small" @submit.native.prevent>
         <el-input v-model="form.projectId" prop="projectId" type="hidden"></el-input>
        <el-form-item label="选择用户"
                      prop="selectUserIds">
          <el-select  v-model="form.selectUserIds" filterable multiple placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.account"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="addProductUser('formData')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import userService from '../../api/user'
import projectService from '../../api/project'
import projectUserService from '../../api/projectUser'
export default {
  data () {
    return {
      users: [],
      project: [],
      form: {
        projectId: 0,
        selectUserIds: []
      },
      rules: {
        // username: { required: true, message: '请输入用户名', trigger: 'change' }
      }
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.form.projectId = (this.data.id)
    userService.search(null, (users) => {
      this.users = users.data
    })
    projectService.detail(this.data.id, (project) => {
      this.project = project
    })
  },
  watch: {
    open: {
      deep: true,
      immediate: true,
      handler (val) {
        if (val) {
          this.form.projectId = this.data.id
        }
      }
    }
  },
  methods: {
    addProductUser (formName) {
      const projecUserData = {'projectId': this.form.projectId, 'userIds': this.form.selectUserIds.join(',')}
      projectUserService.update(projecUserData, (project) => {
        this.closeClearForm()
        this.$emit('reload')
      })

      // this.$refs[formName].validate((valid) => {
      //  if (valid) {
      // this.closeClearForm()
      // this.$emit('reload')
      //  }
      // })
    },
    onCancel () {
      this.closeClearForm()
    },
    onClose () {
      this.closeClearForm()
    },
    closeClearForm () {
      this.$refs['form'].resetFields()
      this.$emit('update:data', {})
      this.$emit('update:open', false)
    }
  }
}
</script>
