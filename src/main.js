import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vue.config.productionTip = false
// Vue.filter('capitalize', function (value) {
//     if (!value) return ''
//     value = value.toString()
//     return value.charAt(0).toUpperCase() + value.slice(1)
// });
const app = createApp(App);
app.use(store);
app.mount('#app')
