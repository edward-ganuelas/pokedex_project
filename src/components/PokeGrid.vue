<template>
<div class="container pokemonGrid">
    <div class="row">
        <div class="col-12 search">
            <label for="search" class="sr-only">Search</label>
            <input id="search" name="search" type="text" v-model="search" placeholder="Search"/>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4" v-for="pokemon in slicedPokemonEntries" :key="pokemon.entry_number">
            <Transition name="fadeLeftBig">
                <poke-grid-item :pokeData="pokemon" />
            </Transition>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <button @click="loadMore" class="btn btn-primary loadMore" v-if="pokemonEntries.length > 0 && search === ''" >Load More ({{this.filteredPokemonEntry.length - this.entries}})</button>
        </div>
    </div>
</div>
</template>

<script>
import { NATIONALDEX } from '@/const/pokeapi.js';
import PokeGridItem from './PokeGridItem.vue';
import axios from 'axios';
import db from '@/database.js';
import { cloneDeep } from 'lodash-es';

export default {
    name: 'PokeGrid',
    components:{
        PokeGridItem
    },
    data(){
        return{
            url : NATIONALDEX,
            pokemonEntries: [],
            entries: 12,
            search: ''
        }
    },
    methods:{
        async getPokemon(){
            const storedData = await db.pokedex.get({url: `${this.url}`})
            if(storedData !== undefined){
                return Promise.resolve(this.pokemonEntries = storedData.data);
            }
            try{
                const data = await axios.get(this.url);
                this.pokemonEntries = data.data.pokemon_entries;
                db.pokedex.put({url: `${this.url}`, data: this.pokemonEntries})
            } catch(e) {
                throw new Error(e.message);
            }
        },
        loadMore(){
            this.entries += 12;
        }
    },
    computed:{
        filteredPokemonEntry() {
            if(this.search === ''){
                return this.pokemonEntries;
            }
            const pokemonEntries = cloneDeep(this.pokemonEntries);
            return pokemonEntries.filter((entry) => {
                return entry.pokemon_species.name.toUpperCase().indexOf(this.search.toUpperCase()) !== -1;
            })
        },
        slicedPokemonEntries(){
            return this.search !== '' ? this.filteredPokemonEntry : this.filteredPokemonEntry.slice(0, this.entries);
        }
    },
    async beforeMount(){
        await this.getPokemon();
    }
};
</script>

<style lang="scss" scoped>
.pokemonGrid{
    margin-top: 26px;
    margin-bottom: 26px;
}
label{
    margin-right: 18px;
    display: inline-block
}
input[type="text"]{
    width: 100%;
    border-radius: 15px;
    padding-left: 10px;
}
.search{
    margin: 18px auto 32px auto;
}
.loadMore{
    margin-top: 18px;
    margin-bottom: 18px;
    &:hover{
        -webkit-box-shadow: 8px 10px 2px -6px rgba(0,0,0,0.5);
    -moz-box-shadow: 8px 10px 2px -6px rgba(0,0,0,0.5);
    box-shadow: 8px 10px 2px -6px rgba(0,0,0,0.5);
    }
}

</style>