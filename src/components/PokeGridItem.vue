<template>
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4">
            <img :src="pokemon.sprites.front_default" :alt="pokeData.pokemon_species.name"/>
            <p>{{pokeData.pokemon_species.name}}</p>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { POKEDEX, POKEMON } from "../const/pokeapi.js";
export default {
    name: 'PokeItem',
    props: {
        pokeData: Object
    },
    data(){
        return{
            pokemon: '',
            pokemonSpecies: ''
        }
    },
    methods:{
        async getPokemonSpecies(){
            let data = await axios.get(`${this.pokeData.pokemon_species.url}`);
            this.pokemonSpecies = data.data;
            // console.log(this.pokeData.entry_number)
            // console.log(data);
        },
        async getPokemon(){
            let data = await axios.get(`${POKEMON}${this.pokeData.entry_number}`);
            this.pokemon = data.data;
        }
    },

    mounted(){
        this.getPokemon();
    }
};
</script>

<style lang="scss" scoped>

</style>