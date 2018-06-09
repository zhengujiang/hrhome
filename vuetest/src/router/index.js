import Vue from 'vue'
import Router from 'vue-router'
//登录
const login = () => import( /* webpackChunkName: "login" */ '@/components/login'); 
//主模块
const main = () => import( /* webpackChunkName: "main" */ '@/components/main');
//面包屑
const detailsHeader = () => import( /* webpackChunkName:"details_header" */ '@/components/details_header');
// const homePage = () => import( /* webpackChunkName: "home_page" */ '@/components/home_page');
// const project = () => import( /* webpackChunkName: "project" */ '@/components/project');
// const resume = () => import( /* webpackChunkName: "resume" */ '@/components/resume');
//账户管理
const user = () => import( /* webpackChunkName: "user" */ '@/components/user');
//权限设置
const rule = () => import( /* webpackChunkName:"rule" */ '@/components/rule');
//人才库
const talent = () => import( /* webpackChunkName:"talent" */ '@/components/talent');
//简历详情
const resume = () =>import ( /* webpackChunkName:"talent_detail" */ '@/components/talent_detail');
//客户列表
const customer = () => import( /* webpackChunkName:"customer" */ '@/components/customer');
//新增公司客户
const company = () => import ( /* webpackChunkName:"customer_detail" */ '@/components/customer_detail');
//新增职位
const job = () => import ( /* webpackChunkName:"job_detail" */ '@/components/job_detail');
//图片管理
const image = () => import ( /* webpackChunkName:"photo" */ '@/components/photo');



let details_header = {
  template: "<router-view name= 'details_header'/>"
}
let details_con = {
  template: "<router-view name= 'details_con' style = 'padding-bottom:20px;'/>"
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/admin',
      component: main,
      children: [{
        path: '',
        components: { 
          details_header: detailsHeader,
          details_con: details_con
        },
        children: [
          {
            path: 'user',
            name: 'user',
            components: {
              details_con: user
            }
          },
          {
            path: 'image',
            name: 'image',
            components: {
              details_con: image
            }
          },
          {
            path: 'rule',
            name: 'rule',
            components: {
              details_con: rule
            }
          },{
            path: 'talent',
            name: 'talent',
            components: {
              details_con: details_con
            },
            children: [
              {
                path: '',
                name: 'talent',
                components: {
                  details_con: talent
                }
              },
              {
                path: 'resume',
                name: 'resume',
                components: {
                  details_con: resume
                }
              }
            ]
          },{
            path: 'customer',
            name: 'customer',
            components: {
              details_con: details_con
            },
            children: [
              {
                path: '',
                name: 'customer',
                components: {
                  details_con: customer
                }
              },
              {
                path: 'company',
                name: 'company',
                components: {
                  details_con: company
                }
              },
              {
                path: 'job',
                name: 'job',
                components: {
                  details_con: job
                }
              }
            ]
          }
        ]
      }]
    }
  ]
})
