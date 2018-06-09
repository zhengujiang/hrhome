<template>
  <div class="hello">
    <header class="clearfix">
      <div class="logo fl"><img src="../image/logo.png" alt="logo"></div>
      <div class="user fr">
        <el-dropdown style="height:60px;cursor:pointer" :show-timeout='0'>
          <span class="el-dropdown-link">
            {{userName}}<i style="margin-left:25px;" class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i @click="editPass" style="display:inline-block;width:100%;height:100%">修改密码</i></el-dropdown-item>
            <el-dropdown-item><i @click="signOut" style="display:inline-block;width:100%;height:100%">退出</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <span>{{userName}}</span>
        <span @click="signOut" class="signOut">退出</span> -->
      </div>
    </header>
    <div class="content">
      <div class="menu">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              :default-active="path"
              class="el-menu-vertical-demo"
              :style="{'height': leftHeight + 'px'}"
              @select="selectMenu"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64">
              <el-submenu :index="item.title" v-for="(item,index) in menu" :key="index">
                <div slot="title" class="titleName">
                  <i class="el-icon-location"></i>
                  <span>{{item.title}}</span>
                </div>
                <el-menu-item :index="child.name" v-for="(child,i) in item.child" :key="i + 'a'">
                  <span slot="title">{{child.title}}</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="right" :style="{'height': leftHeight + 'px'}">
          <div>
            <router-view class="box" name="details_header"></router-view>
          </div>
          <router-view class="box details" name="details_con"></router-view>
        <edit v-if="showForm" :show="showForm" @close="close"></edit>
      </div>
    </div>
  </div>
</template>

<script>
import api from "./http.js"
import edit from "./password_win"
export default {
  data() {
    return {
      path: '',
      userName: '',
      login: true,
      leftHeight: 500,
      menu: [],
      token: '',
      showForm: 0,
    };
  },
  created(){
    const data = JSON.parse(sessionStorage.getItem('menu'));
    this.menu = data.menu;
    this.userName = data.name
    this.token = data.token
  },
  components: {
    edit
  },
  mounted(){
    this.leftHeight = document.documentElement.clientHeight - 100;
    window.addEventListener('resize', ()=>{
      this.leftHeight = document.documentElement.clientHeight - 100;
    })
    this.$nextTick(()=>{
      this.path = this.$route.path.substr(1).split('/')[1];
    })
    this.bread();
  },
  methods: {
    //面包屑
    bread(){
      let path = this.$route.path.substr(1).split('/');
      let name = '';
      for(let i = 0; i < this.menu.length; i++){
        for(let j = 0; j < this.menu[i].child.length; j++){
          if(path[1] == this.menu[i].child[j].name){
            name = this.menu[i].title + ',' +this.menu[i].child[j].title
          }
        }
      }
      this.$store.commit("setHeaderTil", {
        params: name.split(',')
      });
    },
    close(){
      this.showForm = false;
    },
    editPass(){
      this.showForm = true;
    },
    //退出
    signOut(){
      this.$router.push('/')
      sessionStorage.setItem('token', '');
      sessionStorage.setItem('menu', '');
      
    },
    selectMenu(index,indexPath){
      this.$router.push('/admin/' + index);
      let name = indexPath;
      for(let i = 0; i < this.menu.length; i++){
        for(let j = 0; j < this.menu[i].child.length; j++){
          if(index == this.menu[i].child[j].name){
            name[1] = this.menu[i].child[j].title;
          }
        }
      }
      this.$store.commit("setHeaderTil", {
        params: name
      });
    },
    handleOpen(index,indexPath){
      
    },
    handleClose(){

    }
  }
};
</script>

<style lang="less" scoped>
  .hello {
    header {
      padding: 0 20px;
      height: 100px;
      border-bottom: 2px solid #ccc;
      position: fixed;
      width: 100%;
      z-index: 1;
      background: #fff;
      .logo {
        img{
          height: 100px;
        }
      }
      .user{
        line-height: 100px;
        padding-right: 50px;
        .signOut{
          cursor: pointer;
        }
      }
    }
    .content{
      display: flex;
      width: 100%;
      overflow: hidden;
      padding-top: 100px;
      .menu{
        flex: 0 0 200px;
			  width: 200px;
      }
      .right{
        flex:1;
        overflow: auto;
        padding-left: 20px;
        padding-top: 10px;
        padding-right: 20px;
      }
      .tac{
        width: 200px;
        text-align: center;
      }
      .box{
        text-align: left;
      }
      .details{
        margin-top: 20px;
      }
    }
    .titleName{
      text-align: left;
    }
    
  }

</style>
