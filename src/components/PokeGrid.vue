<template>
<div class="container">
    <div class="row">
        <div class="col" v-for="pokemon in slicedPokemonEntries" :key="pokemon.entry_number">
            <poke-grid-item :pokeData="pokemon" />
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <button @click="loadMore" class="btn">Load More</button>
        </div>
    </div>
</div>
</template>

<script>
import { NATIONALDEX } from "../const/pokeapi.js";
import PokeGridItem from './PokeGridItem';
import axios from 'axios';
export default {
    name: 'PokeGrid',
    components:{
        PokeGridItem
    },
    data(){
        return{
            url : NATIONALDEX,
            pokemonEntries: [],
            entries: 9
        }
    },
    methods:{
        async getPokemon(){
            if(localStorage.getItem(`${this.url}`) === null){
                try{
                    const data = await axios.get(this.url);
                    this.pokemonEntries = data.data.pokemon_entries;
                    localStorage.setItem(`${this.url}`, JSON.stringify(this.pokemonEntries));
                }catch(e){
                    console.log(e);
                }
            }else{
                this.pokemonEntries = JSON.parse(localStorage.getItem(`${this.url}`));
            }
        },
        loadMore(){
            this.entries += 9;
        }
    },
    computed:{
        slicedPokemonEntries(){
            return this.pokemonEntries.slice(0, this.entries);
        }
    },
    mounted(){
        this.getPokemon();
    }
};
</script>

<style lang="scss" scoped>

</style>