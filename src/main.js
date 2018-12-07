import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify';
// require('../node_modules/vuetify/dist/vuetify.min.css');
require('vue2-animate/dist/vue2-animate.min.css')

Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
