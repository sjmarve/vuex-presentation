import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueWait from 'vue-wait'

Vue.use(VueWait)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  wait: new VueWait(),
  render: h => h(App)
}).$mount('#app')
