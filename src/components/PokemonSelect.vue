<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <label for="pokemonSelect">Select Pokemon</label>
                <v-select v-model="url" id="pokemonSelect" :options="pokemon" v-if="pokemon.length > 0">
                    <!-- <option v-for="pokemon in pokedexResult" v-bind:value="pokemon.pokemon_species.url" v-bind:key="pokemon.entry_number">
                        {{pokemon.pokemon_species.name | capitalize}}
                    </option> -->
                </v-select>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import vSelect from "vue-select";
export default {
  name: "pokemon-select",
  props: ["pokedexResult"],
  components: {
    vSelect
  },
  data: function() {
    return {
      url: "",
      pokemon: []
    };
  },
  methods: {
    getPokemon: function() {
      let results = this.pokedexResult;   
      results.map(x => {
        let poke = { value: x.pokemon_species.url, label: this.capitalize(x.pokemon_species.name) };
        this.pokemon.push(poke);
      });
    },
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  watch: {
    url: function(val) {
      this.$emit("select-pokemon", this.url.value);
    },
    pokedexResult: function(val){
        this.pokemon = [];
        this.getPokemon();
    }
  },
  beforeMount: function() {
      this.getPokemon();
  }
};
</script>