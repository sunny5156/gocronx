<template>
  <el-dialog
    :title="`${title}任务`"
    :visible="open"
    class="task-log dialog-limit-height-has-btn"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="1500px"
    v-drag-move
  >
    <template>
      <el-form ref="form" :model="form" size="mini" :rules="formRules" label-width="180px">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input v-model.trim="form.tag" placeholder="通过标签将任务分组"></el-input>
        </el-form-item>
        <el-form-item label="所属项目" prop="project_id">
          <el-select v-model="form.project_id" filterable placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in project"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务类型">
          <el-select v-model.trim="form.level" :disabled="form.id !== '' " style="width:100%;">
            <el-option
              v-for="item in levelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <p>主任务可以配置多个子任务, 当主任务执行完成后，自动执行子任务任务类型新增后不能变更</p>
        </el-form-item>
        <el-form-item label="依赖关系">
          <el-select v-model.trim="form.dependency_status" style="width:100%;">
            <el-option
              v-for="item in dependencyStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <p>强依赖: 主任务执行成功，才会运行子任务</p>
          <p>弱依赖: 无论主任务执行是否成功，都会运行子任务</p>
        </el-form-item>
        <el-form-item label="子任务ID" v-if="form.level === 1" prop="dependency_task_id">
          <el-input v-model.trim="form.dependency_task_id" placeholder="多个ID逗号分隔"></el-input>
        </el-form-item>
        <el-form-item label="crontab表达式" prop="spec">
          <el-input v-model="form.spec" placeholder="秒 分 时 天 月 周"></el-input>
          <p>crontab表达式格式: 秒 分 时 天 月 周</p>
        </el-form-item>
        <el-form-item label="执行方式">
          <el-select v-model.trim="form.protocol" style="width:30%;">
            <el-option
              v-for="item in protocolList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求方法"
                      v-if="form.protocol === 1"
                      prop="http_method"
        >
          <el-select key="http-method" v-model.trim="form.http_method" style="width:30%;">
            <el-option
              v-for="item in httpMethods"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.protocol === 2"
                      label="任务节点"
                      prop="selectedHosts"
        >
          <el-select key="shell" v-model="form.selectedHosts" filterable multiple placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in hosts"
              :key="item.id"
              :label="item.alias + ' - ' + item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="命令" prop="command">
          <el-input
            type="textarea"
            :rows="5"
            size="medium"
            width="100"
            :placeholder="commandPlaceholder"
            v-model="form.command"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="任务超时时间" prop="timeout">
          <el-input v-model.number.trim="form.timeout"></el-input>
          <p>任务执行超时强制结束, 取值0-86400(秒), 默认0, 不限制</p>
        </el-form-item>
        <el-form-item label="单实例运行">
          <el-select v-model.trim="form.multi" style="width: 100%;">
            <el-option
              v-for="item in runStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <p>单实例运行, 前次任务未执行完成，下次任务调度时间到了是否要执行, 即是否允许多进程执行同一任务</p>
        </el-form-item>
        <el-form-item label="任务失败重试次数" prop="retry_times">
          <el-input v-model.number.trim="form.retry_times" placeholder="0 - 10, 默认0，不重试"></el-input>
        </el-form-item>
        <el-form-item label="任务失败重试间隔时间" prop="retry_interval">
          <el-input v-model.number.trim="form.retry_interval" placeholder="0 - 3600 (秒), 默认0，执行系统默认策略"></el-input>
        </el-form-item>
        <el-form-item label="任务通知">
          <el-select v-model.trim="form.notify_status" style="width: 100%;">
            <el-option
              v-for="item in notifyStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知类型" v-if="form.notify_status !== 1">
          <el-select v-model.trim="form.notify_type" style="width: 100%;">
            <el-option
              v-for="item in notifyTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.notify_status !== 1 && form.notify_type === 2" label="接收用户">
          <el-select key="notify-mail" v-model="selectedMailNotifyIds" filterable multiple placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in mailUsers"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.notify_status !== 1 && form.notify_type === 3" label="发送Channel">
          <el-select key="notify-slack" v-model="selectedSlackNotifyIds" filterable multiple placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in slackChannels"
              :key="item.id"
              :label="item.name"
              selected="true"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.notify_status === 4" label="任务执行输出关键字" prop="notify_keyword">
          <el-input v-model.trim="form.notify_keyword" placeholder="任务执行输出中包含此关键字将触发通知"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="3"
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

import { editTimingTask } from '@/api/task'

export default {
  name: 'AddTask',
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    },
    taskData: {
      type: Object,
      required: true,
      default: () => {
      }
    },
    type: {
      type: String,
      required: true,
      default: 'add'
    },
    selectOptions: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  },
  data() {
    return {
      title: '添加',
      form: {
        id: '',
        name: '',
        tag: '',
        level: 1,
        dependency_status: 1,
        dependency_task_id: '',
        spec: '',
        protocol: 2,
        http_method: 1,
        command: '',
        host_id: '',
        timeout: 0,
        multi: 2,
        notify_status: 1,
        notify_type: 2,
        notify_receiver_id: '',
        notify_keyword: '',
        retry_times: 0,
        retry_interval: 0,
        remark: '',
        selectedHosts: [],
        project_id: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        spec: [
          { required: true, message: '请输入crontab表达式', trigger: 'blur' }
        ],
        command: [
          { required: true, message: '请输入命令', trigger: 'blur' }
        ],
        timeout: [
          { type: 'number', required: true, message: '请输入有效的任务超时时间', trigger: 'blur' }
        ],
        retry_times: [
          { type: 'number', required: true, message: '请输入有效的任务执行失败重试次数', trigger: 'blur' }
        ],
        retry_interval: [
          { type: 'number', required: true, message: '请输入有效的任务执行失败，重试间隔时间', trigger: 'blur' }
        ],
        notify_keyword: [
          { required: true, message: '请输入要匹配的任务执行输出关键字', trigger: 'blur' }
        ],
        selectedHosts: [
          { required: true, message: '请选择任务节点', trigger: 'change' }
        ],
        project_id: [
          { required: true, message: '请选择所属项目', trigger: 'change' }
        ],
        http_method: [
          { required: true, message: '请选择请求方法', trigger: 'change' }
        ]
      },
      httpMethods: [
        {
          value: 1,
          label: 'get'
        },
        {
          value: 2,
          label: 'post'
        }
      ],
      protocolList: [
        {
          value: 1,
          label: 'http'
        },
        {
          value: 2,
          label: 'shell'
        }
      ],
      levelList: [
        {
          value: 1,
          label: '主任务'
        },
        {
          value: 2,
          label: '子任务'
        }
      ],
      dependencyStatusList: [
        {
          value: 1,
          label: '强依赖'
        },
        {
          value: 2,
          label: '弱依赖'
        }
      ],
      runStatusList: [
        {
          value: 2,
          label: '是'
        },
        {
          value: 1,
          label: '否'
        }
      ],
      notifyStatusList: [
        {
          value: 1,
          label: '不通知'
        },
        {
          value: 2,
          label: '失败通知'
        },
        {
          value: 3,
          label: '总是通知'
        },
        {
          value: 4,
          label: '关键字匹配通知'
        }
      ],
      notifyTypes: [
        {
          value: 2,
          label: '邮件'
        },
        {
          value: 3,
          label: 'Slack'
        },
        {
          value: 4,
          label: 'WebHook'
        }
      ],
      hosts: [],
      mailUsers: [],
      slackChannels: [],
      selectedMailNotifyIds: [],
      selectedSlackNotifyIds: [],
      project: [],
      project_id: ''
    }
  },
  created() {
  },
  computed: {
    commandPlaceholder() {
      if (this.form.protocol === 1) {
        return '请输入URL地址'
      }

      return '请输入shell命令'
    }
  },
  mounted() {
  },
  methods: {
    submit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.form.protocol === 2 && this.form.selectedHosts.length === 0) {
          this.$message.error('请选择任务节点')
          return false
        }
        if (this.form.protocol === 2 && this.form.project_id === '') {
          this.$message.error('请选择所属项目')
          return false
        }
        if (this.form.notify_status > 1) {
          if (this.form.notify_type === 2 && this.selectedMailNotifyIds.length === 0) {
            this.$message.error('请选择邮件接收用户')
            return false
          }
          if (this.form.notify_type === 3 && this.selectedSlackNotifyIds.length === 0) {
            this.$message.error('请选择Slack Channel')
            return false
          }
        }

        this.save()
      })
    },
    save() {
      if (this.form.protocol === 2 && this.form.selectedHosts.length > 0) {
        this.form.host_id = this.form.selectedHosts.join(',')
      }
      // if (this.form.protocol === 2 && this.form.selectedProject === '') {
      //   this.form.project_id = this.form.selectedProject
      // }
      if (this.form.notify_status > 1 && this.form.notify_type === 2) {
        this.form.notify_receiver_id = this.selectedMailNotifyIds.join(',')
      }
      if (this.form.notify_status > 1 && this.form.notify_type === 3) {
        this.form.notify_receiver_id = this.selectedSlackNotifyIds.join(',')
      }
      editTimingTask(this.form).then(res => {
        if (this.type !== 'fromProject') {
          this.$emit('reload')
        }
        this.onClose()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onClose() {
      this.form = {
        id: '',
        name: '',
        tag: '',
        level: 1,
        dependency_status: 1,
        dependency_task_id: '',
        spec: '',
        protocol: 2,
        http_method: 1,
        command: '',
        host_id: '',
        timeout: 0,
        multi: 2,
        notify_status: 1,
        notify_type: 2,
        notify_receiver_id: '',
        notify_keyword: '',
        retry_times: 0,
        retry_interval: 0,
        remark: '',
        selectedHosts: [],
        project_id: ''
      }
      this.$refs['form'].resetFields()
      this.$emit('update:open', false)
    }
  },
  filters: {},
  watch: {
    open(val) {
      if (val) {
        this.project = this.selectOptions.project
        this.hosts = this.selectOptions.hosts
        if (this.type === 'edit') {
          this.title = '编辑'
          this.form.id = this.taskData.id
          this.form.name = this.taskData.name
          this.form.tag = this.taskData.tag
          this.form.level = this.taskData.level
          if (this.taskData.dependency_status) {
            this.form.dependency_status = this.taskData.dependency_status
          }
          this.form.dependency_task_id = this.taskData.dependency_task_id
          this.form.spec = this.taskData.spec
          this.form.protocol = this.taskData.protocol
          if (this.taskData.http_method) {
            this.form.http_method = this.taskData.http_method
          }
          this.form.command = this.taskData.command
          this.form.timeout = this.taskData.timeout
          this.form.multi = this.taskData.multi ? 1 : 2
          this.form.notify_keyword = this.taskData.notify_keyword
          this.form.notify_status = this.taskData.notify_status + 1
          this.form.notify_receiver_id = this.taskData.notify_receiver_id
          if (this.taskData.notify_type) {
            this.form.notify_type = this.taskData.notify_type + 1
          }
          this.form.retry_times = this.taskData.retry_times
          this.form.retry_interval = this.taskData.retry_interval
          this.form.remark = this.taskData.remark
          this.form.project_id = this.taskData.project_id
          this.taskData.hosts = this.taskData.hosts || []
          if (this.form.protocol === 2) {
            this.taskData.hosts.forEach((v) => {
              this.form.selectedHosts.push(v.host_id)
            })
          }

          if (this.form.notify_status > 1) {
            const notifyReceiverIds = this.form.notify_receiver_id.split(',')
            if (this.form.notify_type === 2) {
              notifyReceiverIds.forEach((v) => {
                this.selectedMailNotifyIds.push(parseInt(v))
              })
            } else if (this.form.notify_type === 3) {
              notifyReceiverIds.forEach((v) => {
                this.selectedSlackNotifyIds.push(parseInt(v))
              })
            }
          }
        }
        if (this.type === 'fromProject') {
          this.form.project_id = this.taskData.id
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.task-log {
  .el-dialog .el-dialog__body {
    max-height: 800px;
    overflow: auto;
  }
}

.el-form-item {
  p {
    margin: 0;
    color: #F56C6C;
    font-size: 12px;
  }
}
</style>
