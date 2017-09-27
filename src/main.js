import Vue from 'vue';
import App from './components/App.vue';

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
});

var pokeDexVue = new Vue({
    el: "#pokedex",
    render: h => h(App),
    data: {
        // pokemon: "",
        // pokemon_description: "",
        // pokemon_genus: "",
        ajax_call: false //Controls if the ajax gif is shown or not
    },
    methods: {

    }

});
