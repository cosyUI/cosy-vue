import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CosyUI from '../packages'
import '../packages/styles/index.less'

Vue.use(CosyUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
