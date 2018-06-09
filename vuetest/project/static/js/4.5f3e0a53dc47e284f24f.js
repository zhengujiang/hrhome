webpackJsonp([4],{"9Ua3":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("mvHQ"),n=a.n(i),o=a("oVO8"),s={data:function(){return{form:{id:"",manager_id:"",amount:"",signing_time:"",status:"",level:0},options:[{id:0,name:"待签约"},{id:1,name:"已签约"},{id:2,name:"已付首款"},{id:3,name:"已付尾款"}],managers:[],showForm:!1,statusName:"",managerName:""}},props:["dialogForm","editList"],mounted:function(){var t=this;for(var e in this.showForm=this.dialogForm,this.form)this.form[e]=this.editList[e],"signing_time"==e&&(this.form[e]=1e3*this.form[e],this.form[e]||(this.form[e]=(new Date).getTime()));for(var a=0;a<this.options.length;a++)this.options[a].id==this.form.status&&(this.statusName=this.options[a].name);this.$http.get(o.a+"/api/Customer/editPositionInfo").then(function(e){if(200==e.data.code){t.managers=e.data.data.list;for(var a=0;a<t.managers.length;a++)t.managers[a].id==t.form.manager_id&&(t.managerName=t.managers[a].name)}else t.$alert(e.data.error,"温馨提示",{confirmButtonText:"确定",callback:function(){}})})},methods:{cancel:function(){this.$emit("close","close")},submitForm:function(t){var e=this;return Number(this.managerName)&&(this.form.manager_id=this.managerName),Number(this.statusName)&&(this.form.status=this.statusName),this.form.manager_id?this.form.signing_time?void this.$http.post(o.a+"/api/Customer/editPositionInfo",{id:this.form.id,manager_id:this.form.manager_id,amount:this.form.amount,signing_time:new Date(this.form.signing_time).getTime()/1e3,level:this.form.level,status:this.form.status}).then(function(t){200==t.data.code?(e.$message({type:"success",message:"编辑成功！"}),e.$emit("close","ok")):e.$alert(t.data.error,"温馨提示",{confirmButtonText:"确定",callback:function(){}})}):(this.$alert("请选择签约时间","温馨提示",{confirmButtonText:"确定",callback:function(){}}),!1):(this.$alert("请选择项目经理","温馨提示",{confirmButtonText:"确定",callback:function(){}}),!1)},close:function(){this.$emit("close","close")}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"box",attrs:{title:"编辑",visible:t.showForm},on:{"update:visible":function(e){t.showForm=e},close:t.close}},[a("el-form",{ref:"form",staticClass:"ruleForm",attrs:{model:t.form,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"项目经理",prop:"name"}},[a("el-select",{staticStyle:{width:"300px"},attrs:{placeholder:"请选择项目经理"},model:{value:t.managerName,callback:function(e){t.managerName=e},expression:"managerName"}},t._l(t.managers,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id+""}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"佣金",prop:"amount"}},[a("el-input",{staticStyle:{width:"300px"},model:{value:t.form.amount,callback:function(e){t.$set(t.form,"amount",e)},expression:"form.amount"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"签约时间",prop:"signing_time"}},[a("el-date-picker",{staticStyle:{width:"300px"},attrs:{type:"date","value-format":"yyyy-mm-dd",editable:!1,placeholder:"选择日期"},model:{value:t.form.signing_time,callback:function(e){t.$set(t.form,"signing_time",e)},expression:"form.signing_time"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"当前节点",prop:"status"}},[a("el-select",{staticStyle:{width:"300px"},attrs:{placeholder:"请选择节点"},model:{value:t.statusName,callback:function(e){t.statusName=e},expression:"statusName"}},t._l(t.options,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id+""}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"客户等级",prop:"status"}},[a("el-rate",{staticStyle:{"line-height":"45px"},attrs:{"score-template":"{value}"},model:{value:t.form.level,callback:function(e){t.$set(t.form,"level",e)},expression:"form.level"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cancel}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("form")}}},[t._v("确 定")])],1)],1)},staticRenderFns:[]};var r=a("VU/8")(s,l,!1,function(t){a("fzE8")},"data-v-5fc0452f",null).exports,c=(a("zL8q"),{data:function(){return{searchTalent:"",tableData:[],loading:!0,allStatus:[{id:0,name:"待签约"},{id:1,name:"已签约"},{id:2,name:"已付首款"},{id:3,name:"已付尾款"}],dialogForm:!1,editList:"",dialogVisible:!1,failList:"",successList:"",options:[{id:"1",name:"公司名称"},{id:"2",name:"职位名称"}],searchType:"",total:1,page:"1",reBack:!1,token:""}},mounted:function(){document.addEventListener("keyup",this.enter);var t=JSON.parse(sessionStorage.getItem("customerInfo"));t&&t.searchTalent?(this.page=t.page,this.searchTalent=t.searchTalent,this.search()):this.init(),this.token=sessionStorage.getItem("token")},beforeDestroy:function(){document.removeEventListener("keyup",this.enter)},components:{edit:r},methods:{talentExport:function(){var t=this,e=sessionStorage.getItem("token");this.$http.get(o.a+"/api/Customer/export").then(function(a){if(a.data.error)t.$alert(a.data.error,"温馨提示",{confirmButtonText:"确定",callback:function(){}});else{var i=o.a+"/api/customer/export?access_token="+e,n=document.createElement("a");n.style.display="none",n.href=i,document.body.appendChild(n),n.click()}})},enter:function(t){13!=t.keyCode&&13!=t.which||setTimeout(this.search,100)},back:function(){this.reBack=!1,this.searchType="",this.searchTalent="",this.init()},toDate:function(t){var e=new Date(1e3*t),a=e.getFullYear(),i=e.getMonth()+1,n=e.getDate();return a+"-"+(i<10?"0"+i:i)+"-"+(n<10?"0"+n:n)},search:function(){var t=this;if(!this.searchTalent)return this.$alert("请输入名称","温馨提示",{confirmButtonText:"确定",callback:function(){}}),!1;this.loading=!0,this.page=1,this.$http.get(o.a+"/api/Customer/search?searchName="+this.searchTalent+"&page="+this.page+"&num=50").then(function(e){200==e.data.code?(t.tableData=e.data.data.list,t.total=e.data.data.total,t.loading=!1,t.reBack=!0):t.$alert(e.data.error,"温馨提示",{confirmButtonText:"确定",callback:function(){}})})},currentChange:function(t){this.page=t,this.init()},init:function(){var t=this;this.$http.get(o.a+"/api/Customer/getCustomerPositionList?page="+this.page+"&num=50").then(function(e){200==e.data.code?(t.tableData=e.data.data.list,t.total=e.data.data.total,t.loading=!1):(t.loading=!1,t.$alert(e.data.error,"温馨提示",{confirmButtonText:"确定",callback:function(){}}))})},addCustomer:function(){this.$router.push("/admin/customer/company")},addJob:function(){this.$router.push("/admin/customer/job")},showDetail:function(t){this.editList=t,this.dialogForm=!0},dialog:function(t){this.dialogForm=!1,"ok"==t&&(this.searchTalent?this.search():this.init())},uploadResume:function(t,e){var a=this;if(!e.position_id)return this.$alert("该客户下暂无职位，无法上传简历","温馨提示",{confirmButtonText:"确定",callback:function(){}}),!1;for(var i,n=new FormData,s=0;i=t.target.files[s];s++){n.append("file["+s+"]",i)}n.append("customerId",e.id),n.append("positionId",e.position_id),n.append("access_token",this.token);var l=this.$http.create({withCredentials:!0}),r=this.$loading({text:"正在上传..."});l.post(o.a+"/api/upload/upload",n,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){if(200==t.data.code){var e=t.data.data;a.failList=e.fail,a.successList=e.success,0===e.fail.length?(a.$nextTick(function(){r.close()}),a.$message({type:"success",message:"上传成功！"})):(a.$nextTick(function(){r.close()}),a.dialogVisible=!0)}else a.$nextTick(function(){r.close()}),a.$alert(t.data.error,"温馨提示",{confirmButtonText:"确定",callback:function(){}})})},openFullScreen:function(){var t=this;this.fullscreenLoading=!0,setTimeout(function(){t.fullscreenLoading=!1},2e3)},showCustomer:function(t){var e=this;this.$http.get(o.a+"/api/Customer/customerDetail?id="+t).then(function(t){if(200==t.data.code){sessionStorage.setItem("company",n()(t.data.data));var a={page:e.page,searchTalent:e.searchTalent};sessionStorage.setItem("customerInfo",n()(a)),e.$router.push("/admin/customer/company")}else e.$alert(t.data.error,"温馨提示",{confirmButtonText:"确定",callback:function(){}})})},showJob:function(t){var e=this;this.$http.get(o.a+"/api/Position/customerDetail?id="+t).then(function(t){if(200==t.data.code){e.$router.push("/admin/customer/job");var a={page:e.page,searchTalent:e.searchTalent};sessionStorage.setItem("customerInfo",n()(a)),sessionStorage.setItem("job",n()(t.data.data))}else e.$alert(t.data.error,"温馨提示",{confirmButtonText:"确定",callback:function(){}})})}}}),u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"customer"},[a("div",{staticStyle:{"margin-bottom":"20px"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"输入名称查询",classs:"el-icon-search"},model:{value:t.searchTalent,callback:function(e){t.searchTalent=e},expression:"searchTalent"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[a("i",{staticClass:"el-icon-search",staticStyle:{"margin-right":"5px"}}),t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addCustomer}},[a("i",{staticClass:"el-icon-plus",staticStyle:{"margin-right":"10px"}}),t._v("新增客户")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addJob}},[a("i",{staticClass:"el-icon-plus",staticStyle:{"margin-right":"10px"}}),t._v("新增职位")]),t._v(" "),a("el-button",{staticStyle:{width:"80px"},attrs:{type:"primary"},on:{click:t.talentExport}},[t._v("导出")]),t._v(" "),t.reBack?a("el-button",{staticStyle:{width:"100px","margin-bottom":"20px"},attrs:{type:"warning",plain:""},on:{click:t.back}},[t._v("返回")]):t._e()],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"list",attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{label:"等级",align:"center","min-width":"7%"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[a("span",{staticStyle:{display:"inline-block",width:"100%",height:"100%",position:"absolute",left:"0",top:"0","z-index":"10"}}),t._v(" "),a("el-rate",{attrs:{"text-color":"#ff9900"},model:{value:e.row.level,callback:function(a){t.$set(e.row,"level",a)},expression:"scope.row.level"}})],1)}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"enterprise_name",label:"公司名称",align:"center","min-width":"20%"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.showCustomer(e.row.id)}}},[t._v(t._s(e.row.enterprise_name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"10%"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{"vertical-align":"middle"},attrs:{type:"text",size:"small"},on:{click:function(a){t.showDetail(e.row)}}},[t._v("编辑")]),t._v(" "),a("div",{staticClass:"upload"},[a("input",{attrs:{multiple:"multiple",name:"file",type:"file"},on:{change:function(a){t.uploadResume(a,e.row)}}}),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"}},[t._v("上传简历")])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"position_title",label:"职位名称",align:"center","min-width":"10%"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.position_title?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.showJob(e.row.position_id)}}},[t._v(t._s(e.row.position_title))]):a("span",[t._v("--")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"项目经理",align:"center","min-width":"6%"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.name?a("span",[t._v(t._s(e.row.name))]):a("span",[t._v("--")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"recommended_total",label:"已推荐人数",align:"center","min-width":"5%"}}),t._v(" "),a("el-table-column",{attrs:{prop:"surface_total",label:"约面人数",align:"center","min-width":"4%"}}),t._v(" "),a("el-table-column",{attrs:{prop:"offer_total",label:"offer数",align:"center","min-width":"4%"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"佣金",align:"center","min-width":"7%"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"当前节点",align:"center","min-width":"5%"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(t.allStatus,function(i,n){return a("span",{key:n},[i.id==e.row.status?a("i",[t._v(t._s(i.name))]):t._e()])})}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"signing_time",label:"签约时间",align:"center","min-width":"7%"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.signing_time?a("span",[t._v(t._s(t.toDate(e.row.signing_time)))]):a("span",[t._v("--")])]}}])})],1),t._v(" "),t.total?a("el-pagination",{staticClass:"page",attrs:{background:"",layout:"prev, pager, next","page-size":50,total:t.total},on:{"current-change":t.currentChange}}):t._e(),t._v(" "),t.dialogForm?a("edit",{attrs:{editList:t.editList,dialogForm:t.dialogForm},on:{close:t.dialog}}):t._e(),t._v(" "),a("el-dialog",{attrs:{title:"温馨提示",visible:t.dialogVisible,width:"500px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[t.failList.length>0?a("div",[a("p",{staticStyle:{color:"#F56C6C","line-height":"20px"}},[t._v("上传失败:")]),t._v(" "),t._l(t.failList,function(e,i){return a("p",{key:i,staticStyle:{color:"#F56C6C","padding-left":"50px","line-height":"20px"}},[t._v(t._s(e))])})],2):t._e(),t._v(" "),t.successList.length>0?a("div",[a("p",{staticStyle:{color:"#67C23A","line-height":"20px"}},[t._v("上传成功:")]),t._v(" "),t._l(t.successList,function(e,i){return a("p",{key:i,staticStyle:{color:"#67C23A","padding-left":"50px","line-height":"20px"}},[t._v(t._s(e))])})],2):t._e(),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var m=a("VU/8")(c,u,!1,function(t){a("eiSo"),a("ZwqE")},"data-v-2c91fcca",null);e.default=m.exports},ZwqE:function(t,e){},eiSo:function(t,e){},fzE8:function(t,e){}});
//# sourceMappingURL=4.5f3e0a53dc47e284f24f.js.map