<template>
  <div class="container" id="pokedex">
    <region-select v-bind:region-result="pokedexRegions" v-on:select-region="getPokedex" v-if="pokedexRegions" />
    <pokemon-select v-bind:pokedex-result="pokemon_entries" v-if="pokemon_entries" v-on:select-pokemon="getPokemon" />
    <pokemon v-bind:pokemon-data="pokemon" v-bind:pokemon-details="pokemonDetails" v-bind:pokemon-hide="pokemonHide" v-if="pokemon && pokemonDetails" />
  </div>
</template>

<script>

import axios from 'axios';
import { POKEDEX, POKEMON } from '../const/pokeapi.js';
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
      pokemon: '',
      pokemonDetails: '',
      pokemonHide: false
    }
  },
  methods: {
    getPromises: function(URI) {
      return axios.get(URI);
    },
    getRegions: function() {
      if (sessionStorage.getItem("pokedexRegions") === null) {
        let pokeDexPromise = this.getPromises(POKEDEX);
        pokeDexPromise.then((message) => {
          this.pokedexRegions = message.data;
          sessionStorage.setItem("pokedexRegions", JSON.stringify(message.data));
        });
      } else {
        this.pokedexRegions = JSON.parse(sessionStorage.getItem("pokedexRegions"));
      }
    },
    getPokedex: function(url) {

      if (sessionStorage.getItem(url) === null) {
        let pokeDexPromise = this.getPromises(url);
        pokeDexPromise.then((message) => {
          let json_return = message.data;
          this.pokemon_entries = json_return.pokemon_entries;
          sessionStorage.setItem(url, JSON.stringify(message));
        });
      } else {
        let json_return = JSON.parse(sessionStorage.getItem(url));
        this.pokemon_entries = json_return.pokemon_entries;
      }
    },
    getPokemon: function(url) { //This method is called on #pokedexEntries onChange

      if (sessionStorage.getItem(url) === null) {
        let pokeDexPromise = this.getPromises(url);
        this.pokemonHide = true;
        pokeDexPromise.then((message) => {
          this.pokemon = message.data;
          sessionStorage.setItem(url, JSON.stringify(message));
          this.getPokemonDetail();
        });
      } else {
        this.pokemon = JSON.parse(sessionStorage.getItem(url));
        this.getPokemonDetail();
      }
    },
    getPokemonDetail: function() {
      let url = POKEMON + this.pokemon.id;
      if (sessionStorage.getItem(url) === null) {
        let pokemonPromise = this.getPromises(url);
        pokemonPromise.then((message) => {
          this.pokemonDetails = message.data;
          sessionStorage.setItem(url, JSON.stringify(message));
          this.pokemonHide = false;
        });
      } else {
        this.pokemonDetails = JSON.parse(sessionStorage.getItem(url));
        this.pokemonHide = false;
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