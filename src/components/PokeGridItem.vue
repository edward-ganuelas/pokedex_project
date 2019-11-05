<template>
  <div class="container-fluid pokemonGridItem" v-if="pokemon && pokemonSpecies" :class="[pokemonSpecies.color.name]" :style="{'background-color': pokemonSpecies.color.name}" @click="pokemonDetails">
    <div class="row" v-if="!showSpinner">
      <div class="col">
        <img :src="pokemon.sprites.front_default" :alt="pokeData.pokemon_species.name">
        <p class="name">{{pokeData.pokemon_species.name}}</p>
      </div>
    </div>
    <circle8 v-if="showSpinner" />
  </div>
</template>

<script>
import axios from 'axios';
import { POKEMON } from '@/const/pokeapi.js';
import {Circle8} from 'vue-loading-spinner';
import db from '@/database.js';
export default {
    name: 'PokeItem',
    props: {
        pokeData: Object
    },
    components:{
        Circle8
    },
    data(){
        return{
            pokemon: '',
            pokemonSpecies: '',
            showSpinner: false
        }
    },
    methods:{
        async getPokemonSpecies(){           
            try{
                let data = await axios.get(`${this.convertToHttps(this.pokeData.pokemon_species.url)}`);
                this.pokemonSpecies = data.data;
                    
            }catch(e){
                console.log(e)
            }         
        },
        async getPokemon(){
            try{
                let url = `${POKEMON}${this.pokeData.entry_number}`;
                url = `${this.convertToHttps(url)}/`;
                // console.log(url);
                let data = await axios.get(url);
                this.pokemon = data.data;
             
            }catch(e){
                console.log(e)
            }
        },
        pokemonDetails(){
            this.$store.commit('setPokemonSpecies', JSON.stringify(this.pokemonSpecies));
            this.$store.commit('setPokemonDetails', JSON.stringify(this.pokemon));
            this.$router.push({name: 'pokemon', query: {id: this.pokeData.entry_number}});
        },
        convertToHttps(url) {
            if(url.indexOf('https://') === -1){
                return url.replace('http://','https://');
            }
            return url;
        }
    },
    async beforeMount(){
        this.showSpinner = true;
        const savedData = await db.pokemon.get({id: `${this.pokeData.entry_number}`});
        if (savedData === undefined) {
            await this.getPokemon()
            await this.getPokemonSpecies()
            this.showSpinner = false
            const pokemonSavedData = {
                pokemonDetails: this.pokemon,
                pokemonSpecies: this.pokemonSpecies
            };
            db.pokemon.put({id: `${this.pokeData.entry_number}`, data: pokemonSavedData})
        } else {
            const pokemonSavedData = savedData.data;
            this.pokemon = pokemonSavedData.pokemonDetails;
            this.pokemonSpecies = pokemonSavedData.pokemonSpecies;
        }
        this.showSpinner = false
    }
};
</script>

<style lang="scss" scoped>
.pokemonGridItem{
    position: relative;
    border: solid 1px gray;
    border-radius: 15px;
    margin-bottom: 8px;
    &:hover{
    -webkit-box-shadow: 5px 10px 2px -6px rgba(0,0,0,0.5);
    -moz-box-shadow: 5px 10px 2px -6px rgba(0,0,0,0.5);
    box-shadow: 5px 10px 2px -6px rgba(0,0,0,0.5);
    }
    cursor: pointer;
    .name{
        color: #fff;
        text-transform: uppercase;
    }
    &.white{
        .name{
            color: #000;
        }
    }
    &.yellow{
        .name{
            color: #000;
        }
    }
}
.spinner{
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    margin: auto;
}
</style>