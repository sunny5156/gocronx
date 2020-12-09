<template>
  <el-dialog
    :title="`${title}项目`"
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
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="5"
            size="medium"
            width="100"
            v-model="form.remark"
          >
          </el-input>
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
import { addProject } from '@/api/project'

export default {
  name: 'AddProject',
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
  },
  mounted() {
  },
  methods: {
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addProject(this.form).then(() => {
            this.$emit('reload')
            this.onClose()
          })
        }
      })
    },
    onClose() {
      this.form = {
        id: '',
        name: '',
        remark: ''
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
          this.form.name = this.formData.name
          this.form.remark = this.formData.remark

        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
