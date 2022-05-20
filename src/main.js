import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios';
import store from './store/store'

// axios.defaults.timeout = 20000;
Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
