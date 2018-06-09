// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import qs from 'qs'
import store from "./store.js";
import 'element-ui/lib/theme-default/index.css'
import './css/iconfont.css'
import router from './router'
import "./css/layout.css";
import "./css/reset.css";
import axios from 'axios';

// Vue.prototype.$http = Axios
Vue.prototype.$http = axios;

Vue.use(ElementUI)

axios.interceptors.request.use(  
        config => {  
            var xtoken = sessionStorage.getItem('token');
            if(xtoken){
                if(config.method=='post'){ 
                    config.data = qs.stringify({
                        access_token: xtoken,
                        ...config.data
                    })
                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'  
                }else if(config.method=='get'){  
                    config.params = {  
                        access_token: xtoken,
                        ...config.params
                    }  
                }
            }else {
                if(config.method=='post'){ 
                    config.data = qs.stringify({
                        ...config.data
                    })
                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'  
                }else if(config.method=='get'){  
                    config.params = {  
                        access_token: xtoken,
                        ...config.params
                    }  
                }
            }
                 
                return config 
        },function(error){  
            return Promise.reject(error)  
        }  
    )  
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
} 

router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    if (to.name != 'company' && to.name != 'job' && to.name != 'customer' || (!from.name&&to.name=='customer')) {
        sessionStorage.removeItem('customerInfo');
    }
    if (to.name != 'talent' && to.name != 'resume' || (!from.name&&to.name=='talent')) {
        sessionStorage.removeItem('talentInfo');
    }
    const token = sessionStorage.getItem('token')
    if(token){
        next()
    }else{
        if(to.path === '/'){
            next()
        }else{
            next('/')
        }
    }
//   if (to.path === '/') {
//     if (token) {
//       next('/')
//     }
//     next()
//   } else {
//     if (token) {
//       next()
//     } else {
//       next('/')
//     }
//   }
})
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
