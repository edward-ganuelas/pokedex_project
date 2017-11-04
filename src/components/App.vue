<template>
  <div id="pokedex">
    <v-app>
      <v-content v-bind:class="{'loading': pokemonHide | ajax_call}">
        <region-select v-bind:region-result="pokedexRegions" v-on:select-region="getPokedex" v-if="pokedexRegions" />
        <pokemon-select v-bind:pokedex-result="pokemon_entries" v-if="pokemon_entries" v-on:select-pokemon="getPokemon" />
        <pokemon v-bind:pokemon-data="pokemon" v-bind:pokemon-details="pokemonDetails" v-bind:pokemon-hide="pokemonHide" v-if="pokemon && pokemonDetails" />
      </v-content>
      <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="red" v-if="pokemonHide == true | ajax_call == true" id="loading-indicator"></v-progress-circular>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import { POKEDEX, POKEMON } from "../const/pokeapi.js";
import RegionSelect from "./RegionSelect.vue";
import PokemonSelect from "./PokemonSelect.vue";
import Pokemon from "./Pokemon.vue";
export default {
  name: "app",
  components: {
    RegionSelect,
    PokemonSelect,
    Pokemon
  },
  data: function() {
    return {
      pokedexRegions: "",
      pokemon_entries: "",
      pokemon: "",
      pokemonDetails: "",
      pokemonHide: false,
      ajax_call: false
    };
  },
  methods: {
    getPromises: function(URI) {
      return axios.get(URI);
    },
    getRegions: function() {
      this.ajax_call = true;
      if (sessionStorage.getItem("pokedexRegions") === null) {
        let pokeDexPromise = this.getPromises(POKEDEX);
        pokeDexPromise.then(message => {
          this.pokedexRegions = message.data;
          sessionStorage.setItem(
            "pokedexRegions",
            JSON.stringify(message.data)
          );
          this.ajax_call = false;
        });
      } else {
        this.pokedexRegions = JSON.parse(
          sessionStorage.getItem("pokedexRegions")
        );
        this.ajax_call = false;
      }
    },
    getPokedex: function(url) {
      this.ajax_call = true;
      if (sessionStorage.getItem(url) === null) {
        let pokeDexPromise = this.getPromises(url);
        pokeDexPromise.then(message => {
          let json_return = message.data;
          this.pokemon_entries = json_return.pokemon_entries;
          sessionStorage.setItem(url, JSON.stringify(message.data));
          this.ajax_call = false;
        });
      } else {
        let json_return = JSON.parse(sessionStorage.getItem(url));
        this.pokemon_entries = json_return.pokemon_entries;
        this.ajax_call = false;
      }
    },
    getPokemon: function(url) {
      //This method is called on #pokedexEntries onChange
      this.ajax_call = true;
      if (sessionStorage.getItem(url) === null) {
        let pokeDexPromise = this.getPromises(url);
        this.pokemonHide = true;
        pokeDexPromise.then(message => {
          this.pokemon = message.data;
          sessionStorage.setItem(url, JSON.stringify(message.data));
          this.getPokemonDetail();
        });
        this.ajax_call = false;
      } else {
        this.pokemon = JSON.parse(sessionStorage.getItem(url));
        this.getPokemonDetail();
        this.ajax_call = false;
      }
    },
    getPokemonDetail: function() {
      let url = POKEMON + this.pokemon.id;
      if (sessionStorage.getItem(url) === null) {
        let pokemonPromise = this.getPromises(url);
        pokemonPromise.then(message => {
          this.pokemonDetails = message.data;
          sessionStorage.setItem(url, JSON.stringify(message.data));
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
};
</script>

<style lang="scss">
html,body{height: 100%;}
select{width: 100%; margin-bottom: 1em;}
#entry{margin-bottom: 5em;}
#sprites {text-align: center;
.spritesWrap {
    display: inline-block; margin: 0 auto;
}
}
.hero-wrapper{
  background-color: #ee1515;
  .hero{
    height: 25vh;
    display: table;
    text-align: center;
    color: #222224;
    width: 100%;
    h1{
      display: table-cell;
      vertical-align: middle;
    }
  }
}
nav{
  margin: 30px 0;
  p{
    text-align: center;
  }
}
#pokedex .loading{
  opacity: 0.3;
}
#spriteImage {display: inline-block; text-align: center;}
#loading-indicator {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
[v-cloak] {
  display: none;
}
</style>