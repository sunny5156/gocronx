(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-547738fd"],{"163b":function(t,e,o){"use strict";o.d(e,"a",(function(){return a}));o("7f7f"),o("ac6a");var r=o("2b0e"),a=function(t){return r["default"]._.mapValues(t,(function(t){return t||void 0}))}},4100:function(t,e,o){"use strict";o.r(e);o("c5f6"),o("ac6a");var r=o("b199"),a=o("163b"),l=o("d732"),i={name:"TimingTasks",components:{addTask:l["a"]},data:function(){return{expand:!1,newDate:(new Date).getTime(),listData:[],listLoading:!1,tableLoading:!0,tasks:[],hosts:[],project:[],taskTotal:0,listQuery:{page_size:20,page:1,id:"",protocol:"",name:"",tag:"",host_id:"",status:"",account:"",project_id:this.$route.query.project_id},isAdmin:JSON.parse(localStorage.getItem("userInfo")).is_admin,protocolList:[{value:"1",label:"http"},{value:"2",label:"shell"}],statusList:[{value:"2",label:"激活"},{value:"1",label:"停止"}],total:0,multipleSelection:[],addTaskOption:{open:!1,taskData:{},type:"add",selectOptions:{}}}},created:function(){this.getProjectOptions(),this.getHostOptions(),this.renderList()},mounted:function(){},methods:{handleExpand:function(t){"expand"===t.type&&(this.expand=!this.expand,this.newDate=(new Date).getTime())},jumpToLog:function(t){this.$router.push("/task/manager/task-logs?id=".concat(t.id))},filterList:function(t,e){this.listQuery[t]=e,this.renderList("search")},openTaskDialog:function(t,e){this.addTaskOption={open:!0,type:t,taskData:e,selectOptions:{hosts:this.hosts,project:this.project}}},handleSelectionChange:function(t){this.multipleSelection=t},enableMoreTask:function(){this.multipleSelection.forEach((function(t){t.status||Object(r["e"])({not_show_message:!0},t.id).then((function(){t.status=1}))}))},disableMoreTask:function(){this.multipleSelection.forEach((function(t){t.status&&Object(r["c"])({not_show_message:!0},t.id).then((function(){t.status=0}))}))},removeTask:function(t){var e=this;this.$confirm("确认要删除定时任务吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(r["b"])(t.id).then((function(){e.renderList()}))})).catch((function(){}))},runTask:function(t){var e=this;this.$confirm("确认要手动执行吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(r["j"])(t.id).then((function(t){e.$message.success(t.message)}))})).catch((function(){}))},changeStatus:function(t){t.status?Object(r["e"])({not_show_message:!0},t.id):Object(r["c"])({not_show_message:!0},t.id)},formatProtocol:function(t,e){return 2===t[e.property]?"shell":1===t.http_method?"http-get":"http-post"},renderList:function(t){var e=this;t&&(this.listQuery.page=1),this.listLoading=!0;var o=Object(a["a"])(this.listQuery);Object(r["i"])(o).then((function(t){var o=t.data.data;e.total=t.data.total;var r=e._.cloneDeep(o);e.listData=[],e.listData=r,document.querySelector(".el-table__body-wrapper").scrollTop=0,e.listLoading=!1,e.$refs["table"].doLayout(),e.multipleTable=[]})).catch((function(){e.listLoading=!1}))},getProjectOptions:function(){var t=this;Object(r["h"])().then((function(e){t.project=e.data||[]}))},getHostOptions:function(){var t=this;Object(r["f"])().then((function(e){t.hosts=e.data||[]}))},handleFilter:function(){this.listQuery.page=1,this.renderList("search")},handleSizeChange:function(t){this.listQuery.page=1,this.listQuery.page_size=t,this.renderList()},handleCurrentChange:function(t){this.listQuery.page=t,this.renderList()},clearSearch:function(){this.$refs.listQuery.resetFields(),this.listQuery.project_id=void 0,this.listQuery.host_id=void 0,this.renderList()}},filters:{formatTime:function(t){var e=function(t){return t>=10?t:"0"+t},o=new Date(t),r=o.getFullYear()+"-"+e(o.getMonth()+1)+"-"+e(o.getDate())+" "+e(o.getHours())+":"+e(o.getMinutes())+":"+e(o.getSeconds());return 0!==r.indexOf("20")?"":r},formatLevel:function(t){return 1===t?"主任务":"子任务"},formatTimeout:function(t){return t>0?t+"秒":"不限制"},formatRetryTimesInterval:function(t){return t>0?t+"秒":"系统默认"},formatMulti:function(t){return t>0?"否":"是"}},watch:{expand:{immediate:!0,handler:function(t){this.$nextTick((function(){document.querySelector(".el-table th>.cell > svg")&&(document.querySelector(".el-table th>.cell > svg").style.transform=t?"rotate(90deg)":"rotate(0deg)")}))}},$route:{deep:!0,immediate:!0,handler:function(){this.$route.query.project_id&&(this.listQuery.project_id=Number(this.$route.query.project_id),this.listQuery.host_id=void 0),this.$route.query.host_id&&(this.listQuery.host_id=Number(this.$route.query.host_id),this.listQuery.project_id=void 0),this.handleFilter()}}}},s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{ref:"headerBox",staticClass:"header-box"},[o("el-form",{ref:"listQuery",staticClass:"advt-form-inline",attrs:{inline:!0,model:t.listQuery,size:"mini"}},[o("el-form-item",{attrs:{prop:"project_id",label:"所属项目"}},[o("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.listQuery.project_id,callback:function(e){t.$set(t.listQuery,"project_id","string"===typeof e?e.trim():e)},expression:"listQuery.project_id"}},t._l(t.project,(function(t){return o("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),t._v(" "),o("el-form-item",{attrs:{prop:"id",label:"任务ID"}},[o("el-input",{attrs:{clearable:"",placeholder:"请输入任务ID"},model:{value:t.listQuery.id,callback:function(e){t.$set(t.listQuery,"id","string"===typeof e?e.trim():e)},expression:"listQuery.id"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"name",label:"任务名称"}},[o("el-input",{attrs:{clearable:"",placeholder:"请输入任务名称"},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name","string"===typeof e?e.trim():e)},expression:"listQuery.name"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"account",label:"创建者"}},[o("el-input",{attrs:{clearable:"",placeholder:"请输入创建者"},model:{value:t.listQuery.account,callback:function(e){t.$set(t.listQuery,"account","string"===typeof e?e.trim():e)},expression:"listQuery.account"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"tag",label:"标签"}},[o("el-input",{attrs:{placeholder:"请输入标签",clearable:""},model:{value:t.listQuery.tag,callback:function(e){t.$set(t.listQuery,"tag","string"===typeof e?e.trim():e)},expression:"listQuery.tag"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"status",label:"状态"}},[o("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.listQuery.status,callback:function(e){t.$set(t.listQuery,"status","string"===typeof e?e.trim():e)},expression:"listQuery.status"}},t._l(t.statusList,(function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),t._v(" "),o("el-form-item",{attrs:{prop:"host_id",label:"任务节点"}},[o("el-select",{staticStyle:{width:"350px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:t.listQuery.host_id,callback:function(e){t.$set(t.listQuery,"host_id","string"===typeof e?e.trim():e)},expression:"listQuery.host_id"}},t._l(t.hosts,(function(t){return o("el-option",{key:t.id,attrs:{label:t.alias+" - "+t.name+":"+t.port,value:t.id}})})),1)],1),t._v(" "),o("el-form-item",[o("el-button",{attrs:{"data-type":"search",type:"primary"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),o("el-button",{attrs:{"data-type":"clear"},on:{click:t.clearSearch}},[t._v("清空")])],1)],1),t._v(" "),o("el-row",{staticClass:"right-row"},[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.openTaskDialog("add",{})}}},[t._v("新增")]),t._v(" "),o("el-button",{attrs:{type:"success",disabled:!t.multipleSelection.length,size:"mini"},on:{click:t.enableMoreTask}},[t._v("批量状态开")]),t._v(" "),o("el-button",{attrs:{type:"danger",disabled:!t.multipleSelection.length,size:"mini"},on:{click:t.disableMoreTask}},[t._v("批量状态关")])],1)],1),t._v(" "),o("div",{staticClass:"content-box"},[o("el-table",{directives:[{name:"loading",rawName:"v-loading.lock",value:t.listLoading,expression:"listLoading",modifiers:{lock:!0}}],key:t.newDate,ref:"table",staticStyle:{width:"100%"},attrs:{data:t.listData,"default-expand-all":t.expand,"element-loading-text":"努力加载中",border:""},on:{"selection-change":t.handleSelectionChange,"header-click":t.handleExpand}},[o("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),o("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[o("el-form-item",{attrs:{label:"任务创建时间:"}},[t._v("\n              "+t._s(t._f("formatTime")(e.row.created))+" "),o("br")]),t._v(" "),o("el-form-item",{attrs:{label:"任务类型:"}},[t._v("\n              "+t._s(t._f("formatLevel")(e.row.level))+" "),o("br")]),t._v(" "),o("el-form-item",{attrs:{label:"单实例运行:"}},[t._v("\n              "+t._s(t._f("formatMulti")(e.row.multi))+" "),o("br")]),t._v(" "),o("el-form-item",{attrs:{label:"超时时间:"}},[t._v("\n              "+t._s(t._f("formatTimeout")(e.row.timeout))+" "),o("br")]),t._v(" "),o("el-form-item",{attrs:{label:"重试次数:"}},[t._v("\n              "+t._s(e.row.retry_times)+" "),o("br")]),t._v(" "),o("el-form-item",{attrs:{label:"重试间隔:"}},[t._v("\n              "+t._s(t._f("formatRetryTimesInterval")(e.row.retry_interval))+"\n            ")]),t._v(" "),o("br"),t._v(" "),o("el-form-item",{attrs:{label:"任务节点"}},t._l(e.row.hosts,(function(e){return o("div",{key:e.host_id},[t._v("\n                "+t._s(e.alias)+" - "+t._s(e.name)+":"+t._s(e.port)+" "),o("br")])})),0),t._v(" "),o("br"),t._v(" "),o("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"命令:"}},[t._v("\n              "+t._s(e.row.command)+"\n            ")]),t._v(" "),o("br"),t._v(" "),o("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"备注"}},[t._v("\n              "+t._s(e.row.remark)+"\n            ")])],1)]}}])},[o("template",{slot:"header"},[o("svg-icon",{attrs:{"icon-class":"right"}})],1)],2),t._v(" "),o("el-table-column",{attrs:{prop:"id",width:"100",label:"任务ID"}}),t._v(" "),o("el-table-column",{attrs:{prop:"name",label:"任务名称","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"project_name",label:"所属项目"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"text",title:"点击可筛选当前所属项目"},on:{click:function(o){return t.filterList("project_id",e.row.project_id)}}},[t._v("\n            "+t._s(e.row.project_name)+"\n          ")])]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"account",label:"创建者"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"text",title:"点击可筛选当前创建者"},on:{click:function(o){return t.filterList("account",e.row.account)}}},[t._v(t._s(e.row.account))])]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"tag",label:"标签"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"text",title:"点击可筛选当前标签"},on:{click:function(o){return t.filterList("tag",e.row.tag)}}},[t._v(t._s(e.row.tag))])]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"spec",label:"cron表达式",width:"140"}}),t._v(" "),o("el-table-column",{attrs:{label:"下次执行时间",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("formatTime")(e.row.next_run_time))+"\n        ")]}}])}),t._v(" "),this.isAdmin?o("el-table-column",{attrs:{label:"状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.level?o("el-switch",{attrs:{"active-value":1,"inactive-vlaue":0,"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(o){return t.changeStatus(e.row)}},model:{value:e.row.status,callback:function(o){t.$set(e.row,"status",o)},expression:"scope.row.status"}}):t._e()]}}],null,!1,4096041554)}):o("el-table-column",{attrs:{label:"状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.level?o("el-switch",{attrs:{"active-value":1,"inactive-vlaue":0,"active-color":"#13ce66",disabled:!0,"inactive-color":"#ff4949"},model:{value:e.row.status,callback:function(o){t.$set(e.row,"status",o)},expression:"scope.row.status"}}):t._e()]}}])}),t._v(" "),this.isAdmin?o("el-table-column",{attrs:{label:"操作",width:"340"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){return t.openTaskDialog("edit",e.row)}}},[t._v("编辑")]),t._v(" "),o("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(o){return t.runTask(e.row)}}},[t._v("手动执行")]),t._v(" "),o("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(o){return t.jumpToLog(e.row)}}},[t._v("查看日志")]),t._v(" "),o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){return t.removeTask(e.row)}}},[t._v("删除")])]}}],null,!1,2729304590)}):t._e()],1),t._v(" "),o("div",{staticClass:"pagination-container"},[o("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",small:"","current-page":t.listQuery.page,"page-sizes":[20,50,100,200],"page-size":t.listQuery.page_size,total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),o("add-task",t._b({on:{reload:t.renderList}},"add-task",t.addTaskOption,!1,!0))],1)},n=[],c=o("2455");function u(t){o("6b25")}var f=!1,m=u,d="data-v-0ecf5b44",p=null,h=Object(c["a"])(i,s,n,f,m,d,p);e["default"]=h.exports},"4726b":function(t,e,o){var r=o("bdae");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var a=o("2fb2").default;a("debb8d92",r,!0,{})},"653f":function(t,e,o){e=t.exports=o("2350")(!1),e.push([t.i,".el-table th>.cell>svg[data-v-0ecf5b44]{color:#fff;-webkit-transition:.5s linear;transition:.5s linear;cursor:pointer}",""])},"6b25":function(t,e,o){var r=o("653f");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var a=o("2fb2").default;a("7e67660b",r,!0,{})},b199:function(t,e,o){"use strict";o.d(e,"h",(function(){return a})),o.d(e,"f",(function(){return l})),o.d(e,"i",(function(){return i})),o.d(e,"e",(function(){return s})),o.d(e,"c",(function(){return n})),o.d(e,"j",(function(){return c})),o.d(e,"b",(function(){return u})),o.d(e,"g",(function(){return f})),o.d(e,"d",(function(){return m})),o.d(e,"a",(function(){return d})),o.d(e,"k",(function(){return p}));var r=o("b775");function a(){return Object(r["a"])({url:"/project/all",method:"get"})}function l(){return Object(r["a"])({url:"/host/all",method:"get"})}function i(t){return Object(r["a"])({url:"/task",method:"get",params:t})}function s(t,e){return Object(r["a"])({url:"/task/enable/".concat(e),method:"post",data:t})}function n(t,e){return Object(r["a"])({url:"/task/disable/".concat(e),method:"post",data:t})}function c(t){return Object(r["a"])({url:"/task/run/".concat(t),method:"get"})}function u(t){return Object(r["a"])({url:"/task/remove/".concat(t),method:"post"})}function f(t){return Object(r["a"])({url:"task/log",method:"get",params:t})}function m(t){return Object(r["a"])({url:"/task/store",method:"post",data:t})}function d(){return Object(r["a"])({url:"/task/log/clear",method:"post"})}function p(t){return Object(r["a"])({url:"/task/log/stop",method:"post",data:t})}},bdae:function(t,e,o){e=t.exports=o("2350")(!1),e.push([t.i,".task-log .el-dialog .el-dialog__body[data-v-deec6096]{max-height:800px;overflow:auto}.el-form-item p[data-v-deec6096]{margin:0;color:#f56c6c;font-size:12px}",""])},d732:function(t,e,o){"use strict";o("28a5"),o("ac6a"),o("7f7f");var r=o("b199"),a={name:"AddTask",props:{open:{type:Boolean,required:!0,default:!1},taskData:{type:Object,required:!0,default:function(){}},type:{type:String,required:!0,default:"add"},selectOptions:{type:Object,required:!0,default:function(){}}},data:function(){return{title:"添加",form:{id:"",name:"",tag:"",level:1,dependency_status:1,dependency_task_id:"",spec:"",protocol:2,http_method:1,command:"",host_id:"",timeout:0,multi:2,notify_status:1,notify_type:2,notify_receiver_id:"",notify_keyword:"",retry_times:0,retry_interval:0,remark:"",selectedHosts:[],project_id:""},formRules:{name:[{required:!0,message:"请输入任务名称",trigger:"blur"}],spec:[{required:!0,message:"请输入crontab表达式",trigger:"blur"}],command:[{required:!0,message:"请输入命令",trigger:"blur"}],timeout:[{type:"number",required:!0,message:"请输入有效的任务超时时间",trigger:"blur"}],retry_times:[{type:"number",required:!0,message:"请输入有效的任务执行失败重试次数",trigger:"blur"}],retry_interval:[{type:"number",required:!0,message:"请输入有效的任务执行失败，重试间隔时间",trigger:"blur"}],notify_keyword:[{required:!0,message:"请输入要匹配的任务执行输出关键字",trigger:"blur"}],selectedHosts:[{required:!0,message:"请选择任务节点",trigger:"change"}],project_id:[{required:!0,message:"请选择所属项目",trigger:"change"}],http_method:[{required:!0,message:"请选择请求方法",trigger:"change"}]},httpMethods:[{value:1,label:"get"},{value:2,label:"post"}],protocolList:[{value:1,label:"http"},{value:2,label:"shell"}],levelList:[{value:1,label:"主任务"},{value:2,label:"子任务"}],dependencyStatusList:[{value:1,label:"强依赖"},{value:2,label:"弱依赖"}],runStatusList:[{value:2,label:"是"},{value:1,label:"否"}],notifyStatusList:[{value:1,label:"不通知"},{value:2,label:"失败通知"},{value:3,label:"总是通知"},{value:4,label:"关键字匹配通知"}],notifyTypes:[{value:2,label:"邮件"},{value:3,label:"Slack"},{value:4,label:"WebHook"}],hosts:[],mailUsers:[],slackChannels:[],selectedMailNotifyIds:[],selectedSlackNotifyIds:[],project:[],project_id:""}},created:function(){},computed:{commandPlaceholder:function(){return 1===this.form.protocol?"请输入URL地址":"请输入shell命令"}},mounted:function(){},methods:{submit:function(){var t=this;this.$refs["form"].validate((function(e){if(!e)return!1;if(2===t.form.protocol&&0===t.form.selectedHosts.length)return t.$message.error("请选择任务节点"),!1;if(2===t.form.protocol&&""===t.form.project_id)return t.$message.error("请选择所属项目"),!1;if(t.form.notify_status>1){if(2===t.form.notify_type&&0===t.selectedMailNotifyIds.length)return t.$message.error("请选择邮件接收用户"),!1;if(3===t.form.notify_type&&0===t.selectedSlackNotifyIds.length)return t.$message.error("请选择Slack Channel"),!1}t.save()}))},save:function(){var t=this;2===this.form.protocol&&this.form.selectedHosts.length>0&&(this.form.host_id=this.form.selectedHosts.join(",")),this.form.notify_status>1&&2===this.form.notify_type&&(this.form.notify_receiver_id=this.selectedMailNotifyIds.join(",")),this.form.notify_status>1&&3===this.form.notify_type&&(this.form.notify_receiver_id=this.selectedSlackNotifyIds.join(",")),Object(r["d"])(this.form).then((function(e){"fromProject"!==t.type&&t.$emit("reload"),t.onClose()})).catch((function(e){t.$message.error(e)}))},onClose:function(){this.form={id:"",name:"",tag:"",level:1,dependency_status:1,dependency_task_id:"",spec:"",protocol:2,http_method:1,command:"",host_id:"",timeout:0,multi:2,notify_status:1,notify_type:2,notify_receiver_id:"",notify_keyword:"",retry_times:0,retry_interval:0,remark:"",selectedHosts:[],project_id:""},this.$refs["form"].resetFields(),this.$emit("update:open",!1)}},filters:{},watch:{open:function(t){var e=this;if(t){if(this.project=this.selectOptions.project,this.hosts=this.selectOptions.hosts,"edit"===this.type&&(this.title="编辑",this.form.id=this.taskData.id,this.form.name=this.taskData.name,this.form.tag=this.taskData.tag,this.form.level=this.taskData.level,this.taskData.dependency_status&&(this.form.dependency_status=this.taskData.dependency_status),this.form.dependency_task_id=this.taskData.dependency_task_id,this.form.spec=this.taskData.spec,this.form.protocol=this.taskData.protocol,this.taskData.http_method&&(this.form.http_method=this.taskData.http_method),this.form.command=this.taskData.command,this.form.timeout=this.taskData.timeout,this.form.multi=this.taskData.multi?1:2,this.form.notify_keyword=this.taskData.notify_keyword,this.form.notify_status=this.taskData.notify_status+1,this.form.notify_receiver_id=this.taskData.notify_receiver_id,this.taskData.notify_type&&(this.form.notify_type=this.taskData.notify_type+1),this.form.retry_times=this.taskData.retry_times,this.form.retry_interval=this.taskData.retry_interval,this.form.remark=this.taskData.remark,this.form.project_id=this.taskData.project_id,this.taskData.hosts=this.taskData.hosts||[],2===this.form.protocol&&this.taskData.hosts.forEach((function(t){e.form.selectedHosts.push(t.host_id)})),this.form.notify_status>1)){var o=this.form.notify_receiver_id.split(",");2===this.form.notify_type?o.forEach((function(t){e.selectedMailNotifyIds.push(parseInt(t))})):3===this.form.notify_type&&o.forEach((function(t){e.selectedSlackNotifyIds.push(parseInt(t))}))}"fromProject"===this.type&&(this.form.project_id=this.taskData.id)}}}},l=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{directives:[{name:"drag-move",rawName:"v-drag-move"}],staticClass:"task-log dialog-limit-height-has-btn",attrs:{title:t.title+"任务",visible:t.open,"before-close":t.onClose,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"1500px"}},[[o("el-form",{ref:"form",attrs:{model:t.form,size:"mini",rules:t.formRules,"label-width":"180px"}},[o("el-form-item",{attrs:{label:"任务名称",prop:"name"}},[o("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name","string"===typeof e?e.trim():e)},expression:"form.name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"标签",prop:"tag"}},[o("el-input",{attrs:{placeholder:"通过标签将任务分组"},model:{value:t.form.tag,callback:function(e){t.$set(t.form,"tag","string"===typeof e?e.trim():e)},expression:"form.tag"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"所属项目",prop:"project_id"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",placeholder:"请选择"},model:{value:t.form.project_id,callback:function(e){t.$set(t.form,"project_id",e)},expression:"form.project_id"}},t._l(t.project,(function(t){return o("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),t._v(" "),o("el-form-item",{attrs:{label:"任务类型"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{disabled:""!==t.form.id},model:{value:t.form.level,callback:function(e){t.$set(t.form,"level","string"===typeof e?e.trim():e)},expression:"form.level"}},t._l(t.levelList,(function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),t._v(" "),o("p",[t._v("主任务可以配置多个子任务, 当主任务执行完成后，自动执行子任务任务类型新增后不能变更")])],1),t._v(" "),o("el-form-item",{attrs:{label:"依赖关系"}},[o("el-select",{staticStyle:{width:"100%"},model:{value:t.form.dependency_status,callback:function(e){t.$set(t.form,"dependency_status","string"===typeof e?e.trim():e)},expression:"form.dependency_status"}},t._l(t.dependencyStatusList,(function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),t._v(" "),o("p",[t._v("强依赖: 主任务执行成功，才会运行子任务")]),t._v(" "),o("p",[t._v("弱依赖: 无论主任务执行是否成功，都会运行子任务")])],1),t._v(" "),1===t.form.level?o("el-form-item",{attrs:{label:"子任务ID",prop:"dependency_task_id"}},[o("el-input",{attrs:{placeholder:"多个ID逗号分隔"},model:{value:t.form.dependency_task_id,callback:function(e){t.$set(t.form,"dependency_task_id","string"===typeof e?e.trim():e)},expression:"form.dependency_task_id"}})],1):t._e(),t._v(" "),o("el-form-item",{attrs:{label:"crontab表达式",prop:"spec"}},[o("el-input",{attrs:{placeholder:"秒 分 时 天 月 周"},model:{value:t.form.spec,callback:function(e){t.$set(t.form,"spec",e)},expression:"form.spec"}}),t._v(" "),o("p",[t._v("crontab表达式格式: 秒 分 时 天 月 周")])],1),t._v(" "),o("el-form-item",{attrs:{label:"执行方式"}},[o("el-select",{staticStyle:{width:"30%"},model:{value:t.form.protocol,callback:function(e){t.$set(t.form,"protocol","string"===typeof e?e.trim():e)},expression:"form.protocol"}},t._l(t.protocolList,(function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),t._v(" "),1===t.form.protocol?o("el-form-item",{attrs:{label:"请求方法",prop:"http_method"}},[o("el-select",{key:"http-method",staticStyle:{width:"30%"},model:{value:t.form.http_method,callback:function(e){t.$set(t.form,"http_method","string"===typeof e?e.trim():e)},expression:"form.http_method"}},t._l(t.httpMethods,(function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1):t._e(),t._v(" "),2===t.form.protocol?o("el-form-item",{attrs:{label:"任务节点",prop:"selectedHosts"}},[o("el-select",{key:"shell",staticStyle:{width:"100%"},attrs:{filterable:"",multiple:"",placeholder:"请选择"},model:{value:t.form.selectedHosts,callback:function(e){t.$set(t.form,"selectedHosts",e)},expression:"form.selectedHosts"}},t._l(t.hosts,(function(t){return o("el-option",{key:t.id,attrs:{label:t.alias+" - "+t.name,value:t.id}})})),1)],1):t._e(),t._v(" "),o("el-form-item",{attrs:{label:"命令",prop:"command"}},[o("el-input",{attrs:{type:"textarea",rows:5,size:"medium",width:"100",placeholder:t.commandPlaceholder},model:{value:t.form.command,callback:function(e){t.$set(t.form,"command",e)},expression:"form.command"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"任务超时时间",prop:"timeout"}},[o("el-input",{model:{value:t.form.timeout,callback:function(e){t.$set(t.form,"timeout",t._n("string"===typeof e?e.trim():e))},expression:"form.timeout"}}),t._v(" "),o("p",[t._v("任务执行超时强制结束, 取值0-86400(秒), 默认0, 不限制")])],1),t._v(" "),o("el-form-item",{attrs:{label:"单实例运行"}},[o("el-select",{staticStyle:{width:"100%"},model:{value:t.form.multi,callback:function(e){t.$set(t.form,"multi","string"===typeof e?e.trim():e)},expression:"form.multi"}},t._l(t.runStatusList,(function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),t._v(" "),o("p",[t._v("单实例运行, 前次任务未执行完成，下次任务调度时间到了是否要执行, 即是否允许多进程执行同一任务")])],1),t._v(" "),o("el-form-item",{attrs:{label:"任务失败重试次数",prop:"retry_times"}},[o("el-input",{attrs:{placeholder:"0 - 10, 默认0，不重试"},model:{value:t.form.retry_times,callback:function(e){t.$set(t.form,"retry_times",t._n("string"===typeof e?e.trim():e))},expression:"form.retry_times"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"任务失败重试间隔时间",prop:"retry_interval"}},[o("el-input",{attrs:{placeholder:"0 - 3600 (秒), 默认0，执行系统默认策略"},model:{value:t.form.retry_interval,callback:function(e){t.$set(t.form,"retry_interval",t._n("string"===typeof e?e.trim():e))},expression:"form.retry_interval"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"任务通知"}},[o("el-select",{staticStyle:{width:"100%"},model:{value:t.form.notify_status,callback:function(e){t.$set(t.form,"notify_status","string"===typeof e?e.trim():e)},expression:"form.notify_status"}},t._l(t.notifyStatusList,(function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),t._v(" "),1!==t.form.notify_status?o("el-form-item",{attrs:{label:"通知类型"}},[o("el-select",{staticStyle:{width:"100%"},model:{value:t.form.notify_type,callback:function(e){t.$set(t.form,"notify_type","string"===typeof e?e.trim():e)},expression:"form.notify_type"}},t._l(t.notifyTypes,(function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1):t._e(),t._v(" "),1!==t.form.notify_status&&2===t.form.notify_type?o("el-form-item",{attrs:{label:"接收用户"}},[o("el-select",{key:"notify-mail",staticStyle:{width:"100%"},attrs:{filterable:"",multiple:"",placeholder:"请选择"},model:{value:t.selectedMailNotifyIds,callback:function(e){t.selectedMailNotifyIds=e},expression:"selectedMailNotifyIds"}},t._l(t.mailUsers,(function(t){return o("el-option",{key:t.id,attrs:{label:t.username,value:t.id}})})),1)],1):t._e(),t._v(" "),1!==t.form.notify_status&&3===t.form.notify_type?o("el-form-item",{attrs:{label:"发送Channel"}},[o("el-select",{key:"notify-slack",staticStyle:{width:"100%"},attrs:{filterable:"",multiple:"",placeholder:"请选择"},model:{value:t.selectedSlackNotifyIds,callback:function(e){t.selectedSlackNotifyIds=e},expression:"selectedSlackNotifyIds"}},t._l(t.slackChannels,(function(t){return o("el-option",{key:t.id,attrs:{label:t.name,selected:"true",value:t.id}})})),1)],1):t._e(),t._v(" "),4===t.form.notify_status?o("el-form-item",{attrs:{label:"任务执行输出关键字",prop:"notify_keyword"}},[o("el-input",{attrs:{placeholder:"任务执行输出中包含此关键字将触发通知"},model:{value:t.form.notify_keyword,callback:function(e){t.$set(t.form,"notify_keyword","string"===typeof e?e.trim():e)},expression:"form.notify_keyword"}})],1):t._e(),t._v(" "),o("el-form-item",{attrs:{label:"备注",prop:"remark"}},[o("el-input",{attrs:{type:"textarea",rows:3,size:"medium",width:"100"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1)],t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:t.onClose}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("确 定")])],1)],2)},i=[],s=o("2455");function n(t){o("4726b")}var c=!1,u=n,f="data-v-deec6096",m=null,d=Object(s["a"])(a,l,i,c,u,f,m);e["a"]=d.exports}}]);