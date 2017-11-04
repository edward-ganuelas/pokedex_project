import Vue from 'vue';
import App from './components/App.vue';
import 'bootstrap/dist/js/bootstrap';
import Vuetify from 'vuetify';
require('../node_modules/vuetify/dist/vuetify.min.css');

Vue.use(Vuetify);

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
});

var pokeDexVue = new Vue({
    el: "#pokedex",
    render: h => h(App)
});
