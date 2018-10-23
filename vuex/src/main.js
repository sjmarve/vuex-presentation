import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueWait from 'vue-wait'

Vue.use(VueWait)

 
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  wait: new VueWait({
  	useVuex: true,
  }),
  render: h => h(App)
}).$mount('#app')
