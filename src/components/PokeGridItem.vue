<template>
  <div class="container-fluid pokemonGridItem" v-if="pokemon && pokemonSpecies" :class="[pokemonSpecies.color.name]" :style="{'background-color': pokemonSpecies.color.name}" @click="pokemonDetails">
    <div class="row">
      <div class="col">
        <img :src="pokemon.sprites.front_default" :alt="pokeData.pokemon_species.name">
        <p class="name">{{pokeData.pokemon_species.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { POKEMON } from "../const/pokeapi.js";
import db from '../database.js';
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
                try{
                    let data = await axios.get(`${this.pokeData.pokemon_species.url}`);
                    this.pokemonSpecies = data.data;
                    
                }catch(e){
                    console.log(e)
                }         
        },
        async getPokemon(){
                try{
                let data = await axios.get(`${POKEMON}${this.pokeData.entry_number}`);
                this.pokemon = data.data;
             
                }catch(e){
                    console.log(e)
                }
        },
        pokemonDetails(){
            this.$store.commit('setPokemonSpecies', JSON.stringify(this.pokemonSpecies));
            this.$store.commit('setPokemonDetails', JSON.stringify(this.pokemon));
            this.$router.push({name: 'pokemon', query: {id: this.pokeData.entry_number}});
        }
    },

    mounted(){
        (async()=>{
            const savedData = await db.pokemon.get({id: `${this.pokeData.entry_number}`});
            if(savedData === undefined){
                await this.getPokemon()
                await this.getPokemonSpecies()
                const pokemonSavedData = {
                    pokemonDetails: this.pokemon,
                    pokemonSpecies: this.pokemonSpecies
                };
                db.pokemon.put({id: `${this.pokeData.entry_number}`, data: pokemonSavedData})
            }else{
                const pokemonSavedData = savedData.data;
                this.pokemon = pokemonSavedData.pokemonDetails;
                this.pokemonSpecies = pokemonSavedData.pokemonSpecies;
            }
        })();
        
       

    }
};
</script>

<style lang="scss" scoped>
.pokemonGridItem{
    border: solid 1px gray;
    border-radius: 15px;
    margin-bottom: 8px;
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
</style>