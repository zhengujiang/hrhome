webpackJsonp([7],{"8Fi2":function(t,e,s){t.exports=s.p+"static/img/logo.fb43314.png"},K31e:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("mvHQ"),i=s.n(a),n=s("oVO8"),o={data:function(){return{userName:"",passWord:"",img:"",imgHost:""}},mounted:function(){this.imgHost=n.a,this.init(),document.addEventListener("keyup",this.enter)},beforeDestroy:function(){document.removeEventListener("keyup",this.enter)},methods:{init:function(){var t=this;this.$http.get(n.a+"/api/Login/getCoverUrl").then(function(e){200==e.data.code?t.img=t.imgHost+"/"+e.data.data:t.$alert(e.data.error,"温馨提示",{confirmButtonText:"确定",callback:function(){}})})},enter:function(t){13!=t.keyCode&&13!=t.which||setTimeout(this.submit,100)},submit:function(){var t=this;return this.userName?this.passWord?void this.$http.post(n.a+"/api/login/login",{email:this.userName,password:this.passWord}).then(function(e){var s=e.data.data;if(200==e.data.code){sessionStorage.setItem("menu",i()(s)),sessionStorage.setItem("token",s.token),t.$store.commit("setToken",s.token);var a=s.menu[0].child[0].name;t.$router.push("/admin/"+a),1==e.data.data.isPrompt&&t.$notify({title:"温馨提示",message:"当前账户为原始密码，请及时修改",type:"warning"})}else t.$alert(e.data.error,"温馨提示",{confirmButtonText:"确定",callback:function(){}})}):(this.$alert("请输入密码","温馨提示",{confirmButtonText:"确定",callback:function(){}}),!1):(this.$alert("请输入用户名","温馨提示",{confirmButtonText:"确定",callback:function(){}}),!1)}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),t._v(" "),s("div",{staticClass:"login clearfix"},[s("div",{staticClass:"photo fl"},[s("img",{attrs:{src:t.img,alt:""}})]),t._v(" "),s("div",{staticClass:"info fr"},[s("div",{staticClass:"userName"},[s("span",[t._v("用户名：")]),t._v(" "),s("el-input",{staticClass:"limit",attrs:{placeholder:"请输入用户名"},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1),t._v(" "),s("div",{staticClass:"passWord"},[s("span",[t._v("密   码：")]),t._v(" "),s("el-input",{staticClass:"limit",attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.passWord,callback:function(e){t.passWord=e},expression:"passWord"}})],1),t._v(" "),s("el-button",{staticClass:"submit",attrs:{type:"primary"},on:{click:t.submit}},[t._v("登录")])],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"clearfix"},[e("div",{staticClass:"logo fl"},[e("img",{attrs:{src:s("8Fi2"),alt:"logo"}})])])}]};var c=s("VU/8")(o,r,!1,function(t){s("dKLv")},"data-v-6b057cea",null);e.default=c.exports},dKLv:function(t,e){}});
//# sourceMappingURL=7.3cc936172e16b99efbd9.js.map