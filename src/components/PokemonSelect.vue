<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <label for="pokemonSelect">Select Pokemon</label>
                <v-select v-model="url" id="pokemonSelect" :options="pokemon" v-if="pokemon.length > 0">
                </v-select>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import vSelect from 'vue-select';
export default {
  name: 'pokemon-select',
  props: ['pokedexResult'],
  components: {
    vSelect
  },
  data() {
    return {
      url: '',
      pokemon: []
    };
  },
  methods: {
    getPokemon() {
      let results = this.pokedexResult;   
      results.map(x => {
        let poke = { value: x.pokemon_species.url, label: this.capitalize(x.pokemon_species.name) };
        this.pokemon.push(poke);
      });
    },
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  watch: {
    url() {
      this.$emit('select-pokemon', this.url.value);
    },
    pokedexResult(){
        this.pokemon = [];
        this.getPokemon();
    }
  },
  beforeMount() {
      this.getPokemon();
}
};
</script>