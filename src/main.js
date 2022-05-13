import Vue from 'vue'
import App from './App.vue'
const cors = require('cors')



Vue.use(cors)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
