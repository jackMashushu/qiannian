import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//axios post请求传参/配合组件里的方法
import axios from 'axios';
import qs from 'qs';
Vue.prototype.$qs = qs;



Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
