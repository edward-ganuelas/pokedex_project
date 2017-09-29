<template>
  <div class="container" id="pokedex">
    <region-select v-bind:region-result="pokedexRegions" v-on:select-region="getPokedex" v-if="pokedexRegions" />
    <pokemon-select v-bind:pokedex-result="pokemon_entries" v-if="pokemon_entries" v-on:select-pokemon="getPokemon" />
    <pokemon v-bind:pokemon-data="pokemon" v-if="pokemon" />
  </div>
</template>

<script>
import { POKEDEX } from '../const/pokeapi.js';
import RegionSelect from './RegionSelect.vue';
import PokemonSelect from './PokemonSelect.vue';
import Pokemon from './Pokemon.vue';
export default {
  name: 'app',
  components: {
     RegionSelect,
     PokemonSelect,
     Pokemon
  },
  data: function() {
    return {
      pokedexRegions: '',
      pokemon_entries: '',
      pokemon: ''
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
        let json_return = JSON.parse(sessionStorage.getItem(url));
        this.pokemon_entries = json_return.pokemon_entries;
      }
    },
    getPokemon: function(url) { //This method is called on #pokedexEntries onChange

      if (sessionStorage.getItem(url) === null) {
        let pokeDexPromise = this.getPromises(url);
        pokeDexPromise.then((message) => {
          this.pokemon = JSON.parse(message);
          sessionStorage.setItem(url, message);

        });
      } else {
        this.pokemon = JSON.parse(sessionStorage.getItem(url));
      }
    }
  },
  beforeMount: function() {
    this.getRegions();
  }
}
</script>

<style scoped>

</style>