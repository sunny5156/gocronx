(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3711a0ad"],{"15f4":function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,".el-form-item p[data-v-5d0a1861]{margin:0;color:#f56c6c;font-size:12px}",""])},"1b1e":function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,".el-form-item p[data-v-28e6c582]{margin:0;color:#f56c6c;font-size:12px}",""])},"4dab":function(e,t,a){var o=a("a24e");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var r=a("2fb2").default;r("5d3ef3e9",o,!0,{})},8593:function(e,t,a){"use strict";a.d(t,"e",(function(){return r})),a.d(t,"g",(function(){return l})),a.d(t,"h",(function(){return n})),a.d(t,"b",(function(){return s})),a.d(t,"d",(function(){return i})),a.d(t,"a",(function(){return m})),a.d(t,"c",(function(){return c})),a.d(t,"i",(function(){return u})),a.d(t,"j",(function(){return p})),a.d(t,"k",(function(){return f})),a.d(t,"f",(function(){return d}));var o=a("b775");function r(){return Object(o["a"])({url:"/system/mail",method:"get"})}function l(){return Object(o["a"])({url:"/system/slack",method:"get"})}function n(){return Object(o["a"])({url:"/system/webhook",method:"get"})}function s(e){return Object(o["a"])({url:"/system/mail/user",method:"post",data:e})}function i(e){return Object(o["a"])({url:"/system/mail/user/remove/".concat(e),method:"post"})}function m(e){return Object(o["a"])({url:"/system/slack/channel",method:"post",data:e})}function c(e){return Object(o["a"])({url:"/system/slack/channel/remove/".concat(e),method:"post"})}function u(e){return Object(o["a"])({url:"/system/mail/update",method:"post",data:e})}function p(e){return Object(o["a"])({url:"/system/slack/update",method:"post",data:e})}function f(e){return Object(o["a"])({url:"/system/webhook/update",method:"post",data:e})}function d(e){return Object(o["a"])({url:"/system/login-log",method:"get",params:e})}},a24e:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,"",""])},a290:function(e,t,a){var o=a("1b1e");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var r=a("2fb2").default;r("6e1b3590",o,!0,{})},ca26:function(e,t,a){var o=a("15f4");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var r=a("2fb2").default;r("25e3c0c4",o,!0,{})},ffb7:function(e,t,a){"use strict";a.r(t);a("7f7f");var o=a("8593"),r={name:"AddEmailCustom",props:{open:{type:Boolean,default:!1,required:!0}},data:function(){return{form:{username:"",email:""},formRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"}]}}},created:function(){},mounted:function(){},methods:{submit:function(){var e=this;this.$refs["form"].validate((function(t){t&&Object(o["b"])(e.form).then((function(){e.$emit("reload"),e.onClose()}))}))},onClose:function(){this.form={id:"",new_password:"",confirm_new_password:""},this.$refs["form"].resetFields(),this.$emit("update:open",!1)}}},l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{directives:[{name:"drag-move",rawName:"v-drag-move"}],staticClass:"task-log",attrs:{title:"新增用户",visible:e.open,"before-close":e.onClose,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"600px"}},[[a("el-form",{ref:"form",attrs:{model:e.form,size:"mini",rules:e.formRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{model:{value:e.form.username,callback:function(t){e.$set(e.form,"username","string"===typeof t?t.trim():t)},expression:"form.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱地址",prop:"email"}},[a("el-input",{model:{value:e.form.email,callback:function(t){e.$set(e.form,"email","string"===typeof t?t.trim():t)},expression:"form.email"}})],1)],1)],e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.onClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],2)},n=[],s=a("2455");function i(e){a("a290")}var m=!1,c=i,u="data-v-28e6c582",p=null,f=Object(s["a"])(r,l,n,m,c,u,p),d=f.exports,b={name:"AddChannel",props:{open:{type:Boolean,default:!1,required:!0}},data:function(){return{form:{channel:""},formRules:{channel:[{required:!0,message:"请输入channel",trigger:"blur"}]}}},created:function(){},mounted:function(){},methods:{submit:function(){var e=this;this.$refs["form"].validate((function(t){t&&Object(o["a"])(e.form).then((function(){e.$emit("reload"),e.onClose()}))}))},onClose:function(){this.form={channel:""},this.$refs["form"].resetFields(),this.$emit("update:open",!1)}}},h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{directives:[{name:"drag-move",rawName:"v-drag-move"}],staticClass:"task-log",attrs:{title:"新增channel",visible:e.open,"before-close":e.onClose,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"600px"}},[[a("el-form",{ref:"form",attrs:{model:e.form,size:"mini",rules:e.formRules,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"Channel名称",prop:"channel"}},[a("el-input",{model:{value:e.form.channel,callback:function(t){e.$set(e.form,"channel","string"===typeof t?t.trim():t)},expression:"form.channel"}})],1)],1)],e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.onClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],2)},v=[];function k(e){a("4dab")}var g=!1,_=k,F="data-v-febfee2e",w=null,y=Object(s["a"])(b,h,v,g,_,F,w),x=y.exports,O={name:"Notice",components:{addEmailCustom:d,addChannel:x},data:function(){return{activeName:"email",emailForm:{host:"",port:465,user:"",password:"",template:""},emailFormRules:{host:[{required:!0,message:"请输入邮件服务器地址",trigger:"blur"}],port:[{type:"number",required:!0,message:"请输入有效的端口",trigger:"blur"}],user:[{required:!0,message:"请输入用户email",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],template:[{required:!0,message:"请输入通知模板内容",trigger:"blur"}]},emailReceivers:[],emailCustomOption:{open:!1},slackForm:{url:"",template:""},slackFormRules:{url:[{type:"url",required:!0,message:"请输入有效的通知URL",trigger:"blur"}],template:[{required:!0,message:"请输入通知模板",trigger:"blur"}]},channels:[],channelOption:{open:!1},webhookForm:{url:"",template:""},webhookFormRules:{url:[{type:"url",required:!0,message:"请输入有效的通知URL",trigger:"blur"}],template:[{required:!0,message:"请输入通知模板",trigger:"blur"}]}}},created:function(){this.getEmailData()},mounted:function(){},methods:{createEmailUser:function(){this.emailCustomOption={open:!0}},createChannel:function(){this.channelOption={open:!0}},emailFormSubmit:function(){var e=this;this.$refs["emailForm"].validate((function(t){t&&Object(o["i"])(Object.assign(e.emailForm)).then((function(){e.getEmailData()}))}))},slackSubmit:function(){var e=this;this.$refs["slackForm"].validate((function(t){t&&Object(o["j"])(Object.assign(e.slackForm,{not_show_message:!0})).then((function(){e.getSlackData()}))}))},webhookSubmit:function(){var e=this;this.$refs["webhookForm"].validate((function(t){t&&Object(o["k"])(Object.assign(e.webhookForm,{not_show_message:!0})).then((function(){e.getWebhookData()}))}))},delEmailUser:function(e){var t=this;Object(o["d"])(e).then((function(){t.getEmailData()}))},delChannel:function(e){var t=this;Object(o["c"])(e).then((function(){t.getSlackData()}))},getEmailData:function(){var e=this;Object(o["e"])().then((function(t){e.emailForm.host=t.data.host,t.data.port&&(e.emailForm.port=t.data.port),e.emailForm.user=t.data.user,e.emailForm.password=t.data.password,e.emailForm.template=t.data.template,e.emailReceivers=t.data.mail_users}))},getSlackData:function(){var e=this;Object(o["g"])().then((function(t){e.slackForm.url=t.data.url,e.slackForm.template=t.data.template,e.channels=t.data.channels}))},getWebhookData:function(){var e=this;Object(o["h"])().then((function(t){e.webhookForm.url=t.data.url,e.webhookForm.template=t.data.template}))},changeTab:function(e){switch(e.name){case"email":this.getEmailData();break;case"slack":this.getSlackData();break;case"webhook":this.getWebhookData();break;default:this.getEmailData()}}}},j=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),e._v(" "),a("div",{staticClass:"content-box"},[a("el-tabs",{on:{"tab-click":e.changeTab},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"邮件",name:"email"}},[a("el-form",{ref:"emailForm",attrs:{model:e.emailForm,rules:e.emailFormRules,"label-width":"150px",size:"mini"}},[a("h3",[e._v("邮件服务器配置")]),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"SMTP服务器",prop:"host"}},[a("el-input",{model:{value:e.emailForm.host,callback:function(t){e.$set(e.emailForm,"host",t)},expression:"emailForm.host"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"端口",prop:"port"}},[a("el-input",{model:{value:e.emailForm.port,callback:function(t){e.$set(e.emailForm,"port",e._n(t))},expression:"emailForm.port"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"用户名",prop:"user"}},[a("el-input",{model:{value:e.emailForm.user,callback:function(t){e.$set(e.emailForm,"user",t)},expression:"emailForm.user"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password"},model:{value:e.emailForm.password,callback:function(t){e.$set(e.emailForm,"password",t)},expression:"emailForm.password"}})],1)],1)],1),e._v(" "),a("br"),e._v(" "),a("el-form-item",{attrs:{label:"模板",prop:"template"}},[a("el-input",{attrs:{type:"textarea",rows:6,placeholder:""},model:{value:e.emailForm.template,callback:function(t){e.$set(e.emailForm,"template",t)},expression:"emailForm.template"}}),e._v(" "),a("p",[e._v("通知模板支持html")])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.emailFormSubmit}},[e._v("保存")])],1),e._v(" "),a("el-button",{attrs:{icon:"el-icon-plus",size:"mini",type:"primary"},on:{click:e.createEmailUser}},[e._v("新增用户")]),e._v(" "),a("br"),a("br"),e._v(" "),a("h3",[e._v("通知用户")]),e._v(" "),e._l(e.emailReceivers,(function(t){return a("el-tag",{key:t.email,attrs:{closable:""},on:{close:function(a){return e.delEmailUser(t.id)}}},[e._v("\n            "+e._s(t.username)+" - "+e._s(t.email)+"\n          ")])}))],2)],1),e._v(" "),a("el-tab-pane",{attrs:{label:"Slack",name:"slack"}},[a("el-form",{ref:"slackForm",attrs:{model:e.slackForm,rules:e.slackFormRules,"label-width":"180px",size:"mini"}},[a("el-form-item",{attrs:{label:"Slack Webhook URL",prop:"url"}},[a("el-input",{model:{value:e.slackForm.url,callback:function(t){e.$set(e.slackForm,"url",t)},expression:"slackForm.url"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"模板",prop:"template"}},[a("el-input",{attrs:{type:"textarea",rows:8,placeholder:"",size:"medium"},model:{value:e.slackForm.template,callback:function(t){e.$set(e.slackForm,"template",t)},expression:"slackForm.template"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.slackSubmit}},[e._v("保存")])],1),e._v(" "),a("h3",[e._v("Channel")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.createChannel}},[e._v("新增Channel")]),e._v(" "),a("br"),a("br"),e._v(" "),e._l(e.channels,(function(t){return a("el-tag",{key:t.id,attrs:{closable:""},on:{close:function(a){return e.delChannel(t.id)}}},[e._v("\n            "+e._s(t.name)+"\n          ")])}))],2)],1),e._v(" "),a("el-tab-pane",{attrs:{label:"Webhook",name:"webhook"}},[a("el-form",{ref:"webhookForm",attrs:{model:e.webhookForm,rules:e.webhookFormRules,"label-width":"100px",size:"mini"}},[a("el-form-item",{attrs:{label:"URL",prop:"url"}},[a("el-input",{model:{value:e.webhookForm.url,callback:function(t){e.$set(e.webhookForm,"url","string"===typeof t?t.trim():t)},expression:"webhookForm.url"}}),e._v(" "),a("p",[e._v("通知内容推送到指定URL, POST请求, 设置Header[ Content-Type: application/json]")])],1),e._v(" "),a("el-form-item",{attrs:{label:"模板",prop:"template"}},[a("el-input",{attrs:{type:"textarea",rows:8,placeholder:""},model:{value:e.webhookForm.template,callback:function(t){e.$set(e.webhookForm,"template","string"===typeof t?t.trim():t)},expression:"webhookForm.template"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.webhookSubmit}},[e._v("保存")])],1)],1)],1)],1)],1),e._v(" "),a("add-email-custom",e._b({on:{reload:e.getEmailData}},"add-email-custom",e.emailCustomOption,!1,!0)),e._v(" "),a("add-channel",e._b({on:{reload:e.getSlackData}},"add-channel",e.channelOption,!1,!0))],1)},C=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"header-box"},[a("pre",[a("code",{staticStyle:{color:"darkgray"}},[e._v("\n    通知模板支持的变量\n\n    TaskId 任务ID\n    TaskName 任务名称\n    Status 任务执行结果状态\n    Result 任务执行输出\n  ")])])])}];function $(e){a("ca26")}var R=!1,E=$,S="data-v-5d0a1861",D=null,q=Object(s["a"])(O,j,C,R,E,S,D);t["default"]=q.exports}}]);