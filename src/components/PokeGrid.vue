<template>
<div class="container">
    <div class="row">
        <div class="col" v-for="pokemon in pokemonEntries" :key="pokemon.entry_number"><p>{{pokemon.pokemon_species.name}}</p></div>
    </div>
</div>
</template>

<script>
import { NATIONALDEX } from "../const/pokeapi.js";
import axios from 'axios';
export default {
    name: 'PokeGrid',
    data(){
        return{
            url : NATIONALDEX,
            pokemonEntries: null
        }
    },
    methods:{
        async getPokemon(){
            const data = await axios.get(this.url);
            console.log(data)
            this.pokemonEntries = data.data.pokemon_entries;
        }
    },

    mounted(){
        this.getPokemon();
    }
};
</script>

<style lang="scss" scoped>

</style>