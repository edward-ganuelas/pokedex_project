<template>
<div class="container">
    <div class="row">
        <div class="col-12 search">
            <label for="search">Search</label>
            <input id="search" name="search" type="search" v-model="search"/>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4" v-for="pokemon in slicedPokemonEntries" :key="pokemon.entry_number">
            <poke-grid-item :pokeData="pokemon" />
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <button @click="loadMore" class="btn btn-primary" v-if="pokemonEntries.length > 0 && search === ''" >Load More ({{this.filteredPokemonEntry.length - this.entries}})</button>
        </div>
    </div>
</div>
</template>

<script>
import Dexie from 'dexie';
import { NATIONALDEX } from "../const/pokeapi.js";
import PokeGridItem from './PokeGridItem';
import axios from 'axios';
import db from '../database.js';

export default {
    name: 'PokeGrid',
    components:{
        PokeGridItem
    },
    data(){
        return{
            url : NATIONALDEX,
            pokemonEntries: [],
            entries: 9,
            search: ''
        }
    },
    methods:{
        async getPokemon(){
            const storedData = await db.pokedex.get({url: `${this.url}`})
            if(storedData === undefined){
                try{
                    const data = await axios.get(this.url);
                    this.pokemonEntries = data.data.pokemon_entries;
                    // localStorage.setItem(`${this.url}`, JSON.stringify(this.pokemonEntries));
                    db.pokedex.put({url: `${this.url}`, data: this.pokemonEntries})
                }catch(e){
                    console.log(e);
                }
            }else{
                this.pokemonEntries = storedData.data;
            }
        },
        loadMore(){
            this.entries += 9;
        }
    },
    computed:{
        filteredPokemonEntry(){
            if(this.search === ''){
                return this.pokemonEntries;
            }
            const pokemonEntries = this.pokemonEntries.slice();
            return pokemonEntries.filter(x=>{

                if(x.pokemon_species.name.toUpperCase().indexOf(this.search.toUpperCase()) !== -1){
                    return x;
                }
            })
        },
        slicedPokemonEntries(){
            if(this.search !== ''){
                return this.filteredPokemonEntry
            }
            return this.filteredPokemonEntry.slice(0, this.entries);
        }
    },
    mounted(){
        this.getPokemon();
    }
};
</script>

<style lang="scss" scoped>
label{
    margin-right: 18px;
    display: inline-block
}
input[type="search"]{
    width: 90%;
}
.search{
    margin: 18px auto 18px auto;
}

</style>