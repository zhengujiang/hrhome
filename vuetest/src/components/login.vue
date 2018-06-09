/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-14 18:18:52 
 * @Module: {登录} 
 */

<template>
    <div>
        <header class="clearfix">
            <div class="logo fl"><img src="../image/logo.png" alt="logo"></div>
        </header>
        <div class="login clearfix">
            <div class="photo fl">
              <img :src="img" alt="">
            </div>
            <div class="info fr">
                <div class="userName">
                    <span>用户名：</span>
                    <el-input v-model="userName" placeholder="请输入用户名" class="limit"></el-input>
                </div>
                <div class="passWord">
                    <span>密&nbsp;&nbsp;&nbsp;码：</span>
                    <el-input type="password" v-model="passWord" placeholder="请输入密码" class="limit"></el-input>
                </div>
                <el-button type="primary" class="submit" @click="submit">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
  import api from './http'
    export default {
      data () {
        return {
          userName: '',
          passWord: '',
          img: '',
          imgHost: ''
        }
      },
      mounted: function(){
        this.imgHost = api;
        this.init();
        document.addEventListener("keyup",this.enter)
      },
      beforeDestroy(){
          document.removeEventListener("keyup",this.enter)
      },
      methods: {
        init(){
          this.$http.get(api + '/api/Login/getCoverUrl')
            .then((res)=>{
                if(res.data.code == 200){
                    this.img = this.imgHost + '/' + res.data.data;
                }else{
                    this.$alert(res.data.error, '温馨提示', {
                        confirmButtonText: '确定',
                        callback: ()=>{}
                    });
                }
            })
        },
        enter: function(event) {
            if(event.keyCode == 13 || event.which == 13) {
                setTimeout(this.submit, 100);
            };
        },
        submit(){
          if(!this.userName){
            this.$alert("请输入用户名", '温馨提示', {
                confirmButtonText: '确定',
                callback: ()=>{}
              });
              return false
          }
          if(!this.passWord){
            this.$alert("请输入密码", '温馨提示', {
                confirmButtonText: '确定',
                callback: ()=>{}
              });
              return false
          }
          this.$http.post(api + "/api/login/login",{
            email: this.userName,
            password: this.passWord
          })
          .then((res)=>{
            let data = res.data.data;
            if(res.data.code == 200){
              sessionStorage.setItem('menu', JSON.stringify(data));
              sessionStorage.setItem('token', data.token);
              this.$store.commit('setToken',data.token);
              let path = data.menu[0].child[0].name;
              this.$router.push('/admin/' + path);
              if(res.data.data.isPrompt == 1){
                this.$notify({title: '温馨提示',message: '当前账户为原始密码，请及时修改',type: 'warning'});
              }
              
            }else{
              this.$alert(res.data.error, '温馨提示', {
                confirmButtonText: '确定',
                callback: ()=>{}
              });
            }
          })
          // .catch((error)=>{
          //   this.$alert(error, '温馨提示', {
          //       confirmButtonText: '确定',
          //       callback: ()=>{}
          //   });
          // })
        }
      }

    }

</script>

<style lang="less" scoped>
    header {
        padding: 0 20px;
        height: 100px;
        border-bottom: 2px solid #ccc;
        .logo {
            img{
                height: 100px;
            }
        }
    }
    .login{
      width: 1000px;
      margin: 0 auto;
      margin-top: 100px;
      .photo{
        width: 640px;
        height: 480px;
        border: 1px solid #ccc;
        display: inline-block;
        img{
          max-height: 100%;
          max-width: 100%;
        }
      }
      .info{
        width: 360px;
        display: inline-block;
        .userName{
          margin-top: 140px;
        }
        .passWord{
          margin-top: 10px;
        }
        .submit{
          margin-top: 30px;
          width: 260px;
        }
        .limit{
          width: 200px;
        }
      }
    }
</style>
