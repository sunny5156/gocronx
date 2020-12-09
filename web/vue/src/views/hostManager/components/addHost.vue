<template>
  <el-dialog
    :title="`${title}任务节点`"
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
        <el-form-item label="节点名称" prop="alias">
          <el-input v-model="form.alias"></el-input>
        </el-form-item>
        <el-form-item label="主机名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model.number="form.port"></el-input>
        </el-form-item>
        <el-form-item label="备注">
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
import { addHost } from '@/api/host'

export default {
  name: 'AddHost',
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
        port: 5921,
        alias: '',
        remark: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入主机名', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入端口', trigger: 'blur' },
          { type: 'number', message: '端口无效' }
        ],
        alias: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
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
          addHost(this.form).then(() => {
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
        port: 5921,
        alias: '',
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
          this.form.port = this.formData.port
          this.form.alias = this.formData.alias
          this.form.remark = this.formData.remark
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
