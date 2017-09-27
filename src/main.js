import Vue from 'vue';
import { POKEDEX } from './const/pokeapi.js';
import App from './components/App.vue';
import PokemonSelect from './components/PokemonSelect.vue';
import test from './components/test.vue';
// var pokeAPI = "https://pokeapi.co/api/v2/";
// var pokeAPIPokeDex ="pokedex/";
// var pokeAPIPokemon = 'pokemon/';
// var pokeAPIPokemonSpecies ='pokemon-species/';

Vue.component('pokemon-select', PokemonSelect);
Vue.component('test',test);

var pokeDexVue = new Vue({
    el: "#pokedex",
    render: h=> h(App),
    data: {
        pokemon_selected: '',
        pokemon: "",
        pokemon_description: "",
        pokemon_genus: "",
        url: '',
        ajax_call: false //Controls if the ajax gif is shown or not
    },
    methods: {
        
        getPokemon: function () { //This methos is called on #pokedexEntries onChange

            var apiCall = this.pokemon_selected;
            var pokemonThis = this;
            pokemonThis.pokemon = ''; //Unsets the variable and hides #entry.

            pokemonThis.ajax_call = true;
            $.ajax({ url: apiCall }).success(function (e) {
                pokemonThis.pokemon_description = e.flavor_text_entries;
                pokemonThis.pokemon_genus = e.genera;
                var pokemonId = e.id;
                $.ajax({ url: pokeAPI + pokeAPIPokemon + pokemonId }).success(function (e) {
                    pokemonThis.pokemon = e;
                    pokemonThis.ajax_call = false;
                }).error(function (e) {
                    console.log(e);
                    pokemonThis.ajax_call = true;
                });
            }).error(function (e) {
                console.log(e);
                pokemonThis.ajax_call = false;
            });

        }
    }
    
});
