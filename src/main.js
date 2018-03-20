// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/assets/reset.css'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue'
Vue.use(AlloyFingerPlugin, {
  AlloyFinger
})
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
