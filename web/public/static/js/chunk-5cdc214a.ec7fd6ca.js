(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5cdc214a"],{"163b":function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("7f7f"),a("ac6a");var r=a("2b0e"),n=function(t){return r["default"]._.mapValues(t,(function(t){return t||void 0}))}},"24d2":function(t,e,a){"use strict";a.d(e,"e",(function(){return n})),a.d(e,"d",(function(){return o})),a.d(e,"f",(function(){return i})),a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return c})),a.d(e,"g",(function(){return l})),a.d(e,"a",(function(){return u}));var r=a("b775");function n(t){return Object(r["a"])({url:"/project",method:"get",params:t})}function o(t){return Object(r["a"])({url:"/project/".concat(t),method:"get"})}function i(t){return Object(r["a"])({url:"project/user/list/".concat(t.project_id),method:"get",params:t})}function s(t){return Object(r["a"])({url:"/project/store",method:"post",data:t})}function c(t){return Object(r["a"])({url:"/user/search",method:"post",data:t})}function l(t){return Object(r["a"])({url:"/project/user/remove/".concat(t),method:"post"})}function u(t){return Object(r["a"])({url:"/project/user/store",method:"post",data:t})}},"7a80":function(t,e,a){var r=a("a17d");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var n=a("2fb2").default;n("523f0efd",r,!0,{})},8866:function(t,e,a){"use strict";a.r(e);a("ac6a"),a("7f7f");var r=a("24d2"),n=a("163b"),o={name:"AddProjectManager",props:{open:{type:Boolean,required:!0,default:!1},projectData:{type:Object,required:!0,default:function(){}},users:{type:Array,required:!0,default:function(){return[]}}},data:function(){return{form:{projectId:0,selectUserIds:[]}}},created:function(){},mounted:function(){},methods:{addProductUser:function(){var t=this,e={projectId:this.form.projectId,userIds:this.form.selectUserIds.join(",")};Object(r["a"])(e).then((function(e){t.onCancel(),t.$emit("reload")}))},onCancel:function(){this.$refs["form"].resetFields(),this.$emit("update:projectData",{}),this.$emit("update:open",!1)}},filters:{},watch:{open:function(t){t&&(this.form.projectId=this.projectData.id)}}},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{directives:[{name:"drag-move",rawName:"v-drag-move"}],staticClass:"task-log",attrs:{title:"添加用户",visible:t.open,"before-close":t.onCancel,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"600px"}},[[a("el-form",{ref:"form",attrs:{model:t.form,size:"mini","label-width":"100px"}},[a("el-form-item",{attrs:{label:"选择用户",prop:"selectUserIds"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",multiple:"",placeholder:"请选择"},model:{value:t.form.selectUserIds,callback:function(e){t.$set(t.form,"selectUserIds",e)},expression:"form.selectUserIds"}},t._l(t.users,(function(t){return a("el-option",{key:t.id,attrs:{label:t.account,value:t.id}})})),1)],1)],1)],t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.onCancel}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addProductUser("formData")}}},[t._v("确 定")])],1)],2)},s=[],c=a("2455");function l(t){a("8f1f")}var u=!1,d=l,f="data-v-5f1257dc",p=null,m=Object(c["a"])(o,i,s,u,d,f,p),h=m.exports,b={name:"UserList",components:{addProjectManager:h},data:function(){return{newDate:(new Date).getTime(),listData:[],listLoading:!1,listQuery:{page_size:10,page:1,project_id:""},isAdmin:JSON.parse(localStorage.getItem("userInfo")).is_admin,total:0,projectData:{},userList:[],addManagerOptions:{open:!1,users:[],projectData:{}}}},created:function(){this.listQuery.project_id=this.$route.params.id,this.getUserList(),this.renderList()},mounted:function(){},methods:{formatRole:function(t,e){return 1===t[e.property]?"管理员":"普通用户"},handleAddManager:function(){this.addManagerOptions={open:!0,users:this.userList,projectData:this.projectData}},getUserList:function(){var t=this;Object(r["c"])({not_show_message:!0}).then((function(e){t.userList=e.data.data}))},removeProjectManager:function(t){var e=this;this.$confirm("确认要删除吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(r["g"])(t).then((function(){e.renderList()}))})).catch((function(){}))},renderList:function(){var t=this;this.listLoading=!0;var e=Object(n["a"])(this.listQuery);Object(r["d"])(this.$route.params.id).then((function(a){t.projectData=a.data;var n=a.data.name,o=a.data.account;Object(r["f"])(e).then((function(e){var a=e.data.data;a.forEach((function(t){t.project_name=n,t.belong_to=o})),t.total=e.data.total;var r=t._.cloneDeep(a);t.listData=[],t.listData=r,document.querySelector(".el-table__body-wrapper").scrollTop=0,t.listLoading=!1,t.$refs["table"].doLayout()})).catch((function(){t.listLoading=!1}))}))},handleFilter:function(){this.newDate=(new Date).getTime(),this.listQuery.page=1,this.renderList()},handleSizeChange:function(t){this.listQuery.page=1,this.listQuery.page_size=t,this.renderList()},handleCurrentChange:function(t){this.listQuery.page=t,this.renderList()},clearSearch:function(){this.$refs.listQuery.resetFields(),this.newDate=(new Date).getTime(),this.renderList()}},filters:{},watch:{}},g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"header-box"},[a("el-row",{staticClass:"right-row"},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleAddManager}},[t._v("新增")])],1)],1),t._v(" "),a("div",{staticClass:"content-box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.lock",value:t.listLoading,expression:"listLoading",modifiers:{lock:!0}}],key:t.newDate,ref:"table",staticStyle:{width:"100%"},attrs:{data:t.listData,"element-loading-text":"努力加载中",border:""}},[a("el-table-column",{attrs:{prop:"id",label:"id"}}),t._v(" "),a("el-table-column",{attrs:{prop:"project_name",label:"项目名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"belong_to",label:"项目所属人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"account",label:"用户名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),t._v(" "),a("el-table-column",{attrs:{prop:"is_admin",formatter:t.formatRole,label:"角色"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"danger",disabled:1===e.row.is_manager},on:{click:function(a){return t.removeProjectManager(e.row.id)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",small:"","current-page":t.listQuery.page,"page-sizes":[20,50,100,200],"page-size":t.listQuery.page_size,total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),a("add-project-manager",t._b({on:{reload:t.renderList}},"add-project-manager",t.addManagerOptions,!1,!0))],1)},v=[];function j(t){a("7a80")}var _=!1,y=j,w="data-v-3d47f63e",D=null,L=Object(c["a"])(b,g,v,_,y,w,D);e["default"]=L.exports},"8f1f":function(t,e,a){var r=a("ebb1");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var n=a("2fb2").default;n("60ac3b09",r,!0,{})},a17d:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,"",""])},ebb1:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,"",""])}}]);