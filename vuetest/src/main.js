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

router.beforeEach((to, from, next) => {
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
