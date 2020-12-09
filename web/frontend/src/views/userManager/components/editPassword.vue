<template>
  <el-dialog
    append-to-body
    title="修改密码"
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
        <el-form-item label="新密码" prop="new_password">
          <el-input v-model="form.new_password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirm_new_password">
          <el-input v-model="form.confirm_new_password" type="password"></el-input>
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
import { editPassword } from '@/api/user'

export default {
  name: 'EditPassword',
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    },
    formData: {
      required: true,
      default: () => {
      },
      type: Object
    }
  },
  data() {
    return {
      form: {
        id: '',
        new_password: '',
        confirm_new_password: ''
      },
      formRules: {
        new_password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirm_new_password: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' }
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
          editPassword(this.form.id,this.form).then(() => {
            this.$emit('reload')
            this.onClose()
          })
        }
      })
    },
    onClose() {
      this.form = {
        id: '',
        new_password: '',
        confirm_new_password: ''
      }
      this.$refs['form'].resetFields()
      this.$emit('update:open', false)
    }
  },
  filters: {},
  watch: {
    open(val) {
      if (val) {
        this.form.id = this.formData.id ? this.formData.id : this.$store.getters.userInfo.uid
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
