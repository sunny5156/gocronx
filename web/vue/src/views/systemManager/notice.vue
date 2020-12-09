<template>
  <div>
    <div class="header-box">
      <pre><code style="color:darkgray">
      通知模板支持的变量

      TaskId 任务ID
      TaskName 任务名称
      Status 任务执行结果状态
      Result 任务执行输出
    </code></pre>
    </div>
    <div class="content-box">
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="邮件" name="email">
          <el-form ref="emailForm" :model="emailForm" :rules="emailFormRules" label-width="150px" size="mini">
            <h3>邮件服务器配置</h3>
            <el-row>
              <el-col :span="12">
                <el-form-item label="SMTP服务器" prop="host">
                  <el-input v-model="emailForm.host"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="端口" prop="port">
                  <el-input v-model.number="emailForm.port"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户名" prop="user">
                  <el-input v-model="emailForm.user"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密码" prop="password">
                  <el-input v-model="emailForm.password" type="password"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <el-form-item label="模板" prop="template">
              <el-input
                type="textarea"
                :rows="6"
                placeholder=""
                v-model="emailForm.template"
              >
              </el-input>
              <p>通知模板支持html</p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="emailFormSubmit">保存</el-button>
            </el-form-item>
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="createEmailUser">新增用户</el-button>
            <br><br>
            <h3>通知用户</h3>
            <el-tag
              v-for="item in emailReceivers"
              :key="item.email"
              closable
              @close="delEmailUser(item.id)"
            >
              {{ item.username }} - {{ item.email }}
            </el-tag>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Slack" name="slack">
          <el-form ref="slackForm" :model="slackForm" :rules="slackFormRules" label-width="180px" size="mini">
            <el-form-item label="Slack Webhook URL" prop="url">
              <el-input v-model="slackForm.url"></el-input>
            </el-form-item>
            <el-form-item label="模板" prop="template">
              <el-input
                type="textarea"
                :rows="8"
                placeholder=""
                size="medium"
                v-model="slackForm.template"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="slackSubmit">保存</el-button>
            </el-form-item>
            <h3>Channel</h3>
            <el-button size="mini" type="primary" @click="createChannel">新增Channel</el-button>
            <br><br>
            <el-tag
              v-for="item in channels"
              :key="item.id"
              closable
              @close="delChannel(item.id)"
            >
              {{ item.name }}
            </el-tag>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Webhook" name="webhook">
          <el-form ref="webhookForm" :model="webhookForm" :rules="webhookFormRules" label-width="100px" size="mini">
            <el-form-item label="URL" prop="url">
              <el-input v-model.trim="webhookForm.url"></el-input>
              <p>通知内容推送到指定URL, POST请求, 设置Header[ Content-Type: application/json]</p>
            </el-form-item>
            <el-form-item label="模板" prop="template">
              <el-input
                type="textarea"
                :rows="8"
                placeholder=""
                v-model.trim="webhookForm.template"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="webhookSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <add-email-custom v-bind.sync="emailCustomOption" @reload="getEmailData"></add-email-custom>
    <add-channel v-bind.sync="channelOption" @reload="getSlackData"></add-channel>
  </div>
</template>

<script>
import { getEmailInfo, getSlackInfo, getWebhookInfo, deleteEmailUser, deleteChannel, updateEmail, updateSlack, updateWebhook } from '@/api/system'
import addEmailCustom from '@/views/systemManager/components/addEmailCustom'
import addChannel from '@/views/systemManager/components/addChannel'

export default {
  name: 'Notice',
  components: { addEmailCustom, addChannel },
  data() {
    return {
      activeName: 'email',
      emailForm: {
        host: '',
        port: 465,
        user: '',
        password: '',
        template: ''
      },
      emailFormRules: {
        host: [
          { required: true, message: '请输入邮件服务器地址', trigger: 'blur' }
        ],
        port: [
          { type: 'number', required: true, message: '请输入有效的端口', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入用户email', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        template: [
          { required: true, message: '请输入通知模板内容', trigger: 'blur' }
        ]
      },
      emailReceivers: [],
      emailCustomOption: {
        open: false
      },
      slackForm: {
        url: '',
        template: ''
      },
      slackFormRules: {
        url: [
          { type: 'url', required: true, message: '请输入有效的通知URL', trigger: 'blur' }
        ],
        template: [
          { required: true, message: '请输入通知模板', trigger: 'blur' }
        ]
      },
      channels: [],
      channelOption: {
        open: false
      },
      webhookForm: {
        url: '',
        template: ''
      },
      webhookFormRules: {
        url: [
          { type: 'url', required: true, message: '请输入有效的通知URL', trigger: 'blur' }
        ],
        template: [
          { required: true, message: '请输入通知模板', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getEmailData()
  },
  mounted() {
  },
  methods: {
    createEmailUser() {
      this.emailCustomOption = {
        open: true
      }
    },
    createChannel() {
      this.channelOption = {
        open: true
      }
    },
    emailFormSubmit() {
      this.$refs['emailForm'].validate((valid) => {
        if (valid) {
          updateEmail(Object.assign(this.emailForm)).then(() => {
            this.getEmailData()
          })
        }
      })
    },
    slackSubmit() {
      this.$refs['slackForm'].validate((valid) => {
        if (valid) {
          updateSlack(Object.assign(this.slackForm, { not_show_message: true })).then(() => {
            this.getSlackData()
          })
        }
      })
    },
    webhookSubmit() {
      this.$refs['webhookForm'].validate((valid) => {
        if (valid) {
          updateWebhook(Object.assign(this.webhookForm, { not_show_message: true })).then(() => {
            this.getWebhookData()
          })
        }
      })
    },
    delEmailUser(id) {
      deleteEmailUser(id).then(() => {
        this.getEmailData()
      })
    },
    delChannel(id) {
      deleteChannel(id).then(() => {
        this.getSlackData()
      })
    },
    getEmailData() {
      getEmailInfo().then(res => {
        this.emailForm.host = res.data.host
        if (res.data.port) {
          this.emailForm.port = res.data.port
        }
        this.emailForm.user = res.data.user
        this.emailForm.password = res.data.password
        this.emailForm.template = res.data.template
        this.emailReceivers = res.data.mail_users
      })
    },
    getSlackData() {
      getSlackInfo().then(res => {
        this.slackForm.url = res.data.url
        this.slackForm.template = res.data.template
        this.channels = res.data.channels
      })
    },
    getWebhookData() {
      getWebhookInfo().then(res => {
        this.webhookForm.url = res.data.url
        this.webhookForm.template = res.data.template
      })
    },
    changeTab(val) {
      switch (val.name) {
        case 'email':
          this.getEmailData()
          break
        case 'slack':
          this.getSlackData()
          break
        case 'webhook':
          this.getWebhookData()
          break
        default:
          this.getEmailData()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item {
  p {
    margin: 0;
    color: #F56C6C;
    font-size: 12px;
  }
}
</style>
