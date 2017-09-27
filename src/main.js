import Vue from 'vue';
import App from './components/App.vue';

var pokeDexVue = new Vue({
    el: "#pokedex",
    render: h=> h(App),
    data: {
        // pokemon: "",
        // pokemon_description: "",
        // pokemon_genus: "",
        ajax_call: false //Controls if the ajax gif is shown or not
    },
    methods: {
        
    }
    
});
