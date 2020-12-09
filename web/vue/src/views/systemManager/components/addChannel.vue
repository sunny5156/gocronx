<template>
  <el-dialog
    title="新增channel"
    :visible="open"
    class="task-log"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
    v-drag-move
  >
    <template>
      <el-form ref="form" :model="form" size="mini" :rules="formRules" label-width="120px">
        <el-form-item label="Channel名称" prop="channel">
          <el-input v-model.trim="form.channel"></el-input>
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
import { addChannel } from '@/api/system'

export default {
  name: 'AddChannel',
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      form: {
        channel: ''
      },
      formRules: {
        channel: [
          { required: true, message: '请输入channel', trigger: 'blur' }
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
          addChannel(this.form).then(() => {
            this.$emit('reload')
            this.onClose()
          })
        }
      })
    },
    onClose() {
      this.form = {
        channel: ''
      }
      this.$refs['form'].resetFields()
      this.$emit('update:open', false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
