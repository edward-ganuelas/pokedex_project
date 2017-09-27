import Vue from 'vue';
import App from './components/App.vue';

// var pokeAPI = "https://pokeapi.co/api/v2/";
// var pokeAPIPokeDex ="pokedex/";
// var pokeAPIPokemon = 'pokemon/';
// var pokeAPIPokemonSpecies ='pokemon-species/';


var pokeDexVue = new Vue({
    el: "#pokedex",
    render: h=> h(App),
    data: {
        pokemon: "",
        pokemon_description: "",
        pokemon_genus: "",
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
