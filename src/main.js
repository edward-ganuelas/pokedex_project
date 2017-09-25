import Vue from 'vue';
import { POKEDEX } from './const/pokeapi.js';
import Test from './components/test.vue'
// var pokeAPI = "https://pokeapi.co/api/v2/";
// var pokeAPIPokeDex ="pokedex/";
// var pokeAPIPokemon = 'pokemon/';
// var pokeAPIPokemonSpecies ='pokemon-species/';

Vue.component('test', Test);

var pokeDexVue = new Vue({
    el: "#pokedex",
    data: {
        pokedexRegion: '',
        pokemon_entries: '',
        pokemon_selected: '',
        pokemon: "",
        pokemon_description: "",
        pokemon_genus: "",
        region_select: "0",
        ajax_call: false //Controls if the ajax gif is shown or not
    },
    methods: {
        getRegions: function () {
            if (sessionStorage.getItem("pokedexRegions") === null) {
                let pokeDexPromise = new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", POKEDEX);
                    xhr.onload = () => resolve(xhr.responseText);
                    xhr.onerror = () => reject(xhr.statusText);
                    xhr.send();
                });

                pokeDexPromise.then((message) => {
                    this.pokedexRegion = message;
                    sessionStorage.setItem("pokedexRegions", message);
                });
            }else{
                this.pokedexRegion = JSON.parse(sessionStorage.getItem("pokedexRegions"));
            }
        },
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

        },
        getPokedex: function () {
            var pokemonThis = this;
            var pokedexSelectValue = pokemonThis.region_select;
            pokemonThis.pokemon = '';
            pokemonThis.pokemon_entries = '';
            pokemonThis.pokemon_selected = '';

            if (pokemonThis.region_select == "0") { return; } //Return if the default is selected
            if (sessionStorage.getItem('pokemon_entries_' + pokedexSelectValue) == null) { //Check if the object is stored on a session storage
                var apiCall = pokeAPI + pokeAPIPokeDex + pokemonThis.region_select; //Build the URL
                pokemonThis.ajax_call = true;

                $.ajax({ url: apiCall }).success(function (e) { //AJAX call, jQuery 
                    pokemonThis.ajax_call = false;
                    pokemonThis.pokemon_entries = e.pokemon_entries; //I only want the pokemon entries. Set it to the pokemon_entries object of the pokeDexVue object.
                    sessionStorage.setItem('pokemon_entries_' + pokedexSelectValue, JSON.stringify(e.pokemon_entries)); //Save the JSON object to a sessionStorage variable to avoid too much AJAX Calls. 
                }).error(function (e) {
                    console.log(e);

                    pokemonThis.ajax_call = false;
                });
            } else { //If the sessionStorage item exist, set it to pokemon_entries
                pokemonThis.pokemon_entries = JSON.parse(sessionStorage.getItem('pokemon_entries_' + pokedexSelectValue));
            }
        }
    }
});
pokeDexVue.getRegions();
