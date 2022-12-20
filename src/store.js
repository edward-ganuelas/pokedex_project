import { createStore as _createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default new _createStore({
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
