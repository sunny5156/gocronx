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
      <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" size="small" @submit.native.prevent>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="formData.username" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="addProduct('formData')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  data() {
    return {
      formData: {
        platform_id: '1',
        productIds: '',
        account_id: '',
        data: [],
        type: ''
      },
      rules: {
        username: { required: true, message: '请输入用户名', trigger: 'change' }
      }
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  created() {

  },
  methods: {
    addProduct(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        this.closeClearForm()
        this.$emit('reload')
        }
      })
    },
    onCancel() {
      this.closeClearForm()
    },
    onClose() {
      this.closeClearForm()
    },
    closeClearForm() {
      this.$refs['formData'].resetFields()
      this.$emit('update:data', {})
      this.$emit('update:open', false)
    }
  }
}
</script>
