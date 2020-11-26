<template>
  <el-dialog
    title="任务执行结果"
    :visible="open"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="740px"
    v-drag-move
  >
    <div style="margin-bottom:15px;background: #606266;color: #fff;padding:10px;">
      <pre>{{ detail.command }}</pre>
    </div>
    <div style="background: #606266;color: #fff;padding:10px;">
      <pre>{{ detail.result }}</pre>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'TaskLogDetail',
  props: {
    open: {
      required: true,
      type: Boolean
    },
    detail: {
      required: true,
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onClose() {
      this.$emit('update:open', false)
    }
  },
  filters: {},
  watch: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
