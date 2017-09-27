<template>
  <div class="container" id="pokedex">
    <region-select v-bind:region-result="pokedexRegions" v-on:select-region="getPokedex" v-if="pokedexRegions" />
    <pokemon-select v-bind:pokedex-result ="pokemon_entries" v-if="pokemon_entries" />
  </div>
</template>

<script>
import { POKEDEX } from '../const/pokeapi.js';
import RegionSelect from './RegionSelect.vue';
export default {
  name: 'app',
  components: {
    'region-select': RegionSelect
  },
  data: function() {
    return {
      pokedexRegions: '',
      pokemon_entries: '',
    }
  },
  methods: {
    getPromises: function(URI) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", URI);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      });
    },
    getRegions: function() {
      if (sessionStorage.getItem("pokedexRegions") === null) {
        let pokeDexPromise = this.getPromises(POKEDEX);
        pokeDexPromise.then((message) => {
          this.pokedexRegions = JSON.parse(message);
          sessionStorage.setItem("pokedexRegions", message);
        });
      } else {
        this.pokedexRegions = JSON.parse(sessionStorage.getItem("pokedexRegions"));
      }
    },
    getPokedex: function(url) {

      if (sessionStorage.getItem(url) === null) {
        let pokeDexPromise = this.getPromises(url);
        pokeDexPromise.then((message) => {
          let json_return = JSON.parse(message);
          this.pokemon_entries = json_return.pokemon_entries;
          sessionStorage.setItem(url, message);
        });
      } else {
        console.log("test get");
        let json_return = JSON.parse(sessionStorage.getItem(url));
        this.pokemon_entries = json_return.pokemon_entries;
      }

      // var pokemonThis = this;
      // var pokedexSelectValue = url;
      // console.log("url "+url);
      // pokemonThis.pokemon = '';
      // pokemonThis.pokemon_entries = '';
      // pokemonThis.pokemon_selected = '';

      // if (pokemonThis.region_select == "0") { return; } //Return if the default is selected
      // if (sessionStorage.getItem('pokemon_entries_' + pokedexSelectValue) == null) { //Check if the object is stored on a session storage
      //     var apiCall = pokeAPI + pokeAPIPokeDex + pokemonThis.region_select; //Build the URL
      //     pokemonThis.ajax_call = true;

      //     $.ajax({ url: apiCall }).success(function (e) { //AJAX call, jQuery 
      //         pokemonThis.ajax_call = false;
      //         pokemonThis.pokemon_entries = e.pokemon_entries; //I only want the pokemon entries. Set it to the pokemon_entries object of the pokeDexVue object.
      //         sessionStorage.setItem('pokemon_entries_' + pokedexSelectValue, JSON.stringify(e.pokemon_entries)); //Save the JSON object to a sessionStorage variable to avoid too much AJAX Calls. 
      //     }).error(function (e) {
      //         console.log(e);

      //         pokemonThis.ajax_call = false;
      //     });
      // } else { //If the sessionStorage item exist, set it to pokemon_entries
      //     pokemonThis.pokemon_entries = JSON.parse(sessionStorage.getItem('pokemon_entries_' + pokedexSelectValue));
      // }
    }
  },
  beforeMount: function() {
    this.getRegions();
  }
}
</script>

<style scoped>

</style>