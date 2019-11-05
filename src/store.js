import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    PokemonSpecies: '',
    PokemonDetails: '',
  },
  getters:{
    getPokemonSpecies: state => state.PokemonSpecies,
    getPokemonDetails: state => state.PokemonDetails
  },
  mutations: {
    setPokemonSpecies(state, data){
      state.PokemonSpecies = data;
    },
    setPokemonDetails(state, data){
      state.PokemonDetails = data;
    }
  },
  plugins: [createPersistedState()]
})
