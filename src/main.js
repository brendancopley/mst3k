// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import ViewManager from './js/viewManager.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './css/style.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  ViewManager,
  components: { App },
  template: '<App/>'
})
