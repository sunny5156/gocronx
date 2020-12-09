<template>
  <el-dialog
    title="添加用户"
    :visible="open"
    class="task-log"
    :before-close="onCancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
    v-drag-move
  >
    <template>
      <el-form ref="form" :model="form" size="mini" label-width="100px">
        <el-form-item label="选择用户" prop="selectUserIds">
          <el-select v-model="form.selectUserIds" filterable multiple placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.account"
              :value="item.id"
            >
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
import { addManager } from '@/api/project'
export default {
  name: 'AddProjectManager',
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    },
    projectData: {
      type: Object,
      required: true,
      default: () => {}
    },
    users: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        projectId: 0,
        selectUserIds: []
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    addProductUser() {
      const projectUserData = {'projectId': this.form.projectId, 'userIds': this.form.selectUserIds.join(',')}
      addManager(projectUserData).then(res => {
        this.onCancel()
        this.$emit('reload')
      })
    },
    onCancel() {
      this.$refs['form'].resetFields()
      this.$emit('update:projectData', {})
      this.$emit('update:open', false)
    }
  },
  filters: {},
  watch: {
    open(val) {
      if (val) {
        this.form.projectId = this.projectData.id
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
