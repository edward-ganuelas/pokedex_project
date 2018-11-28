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
            if(localStorage.getItem(`${this.pokeData.pokemon_species.url}`) === null){
                try{
                    let data = await axios.get(`${this.pokeData.pokemon_species.url}`);
                    this.pokemonSpecies = data.data;
                    localStorage.setItem(`${this.pokeData.pokemon_species.url}`, JSON.stringify(data.data));
                }catch(e){
                    console.log(e)
                }
            }else{
                this.pokemonSpecies = JSON.parse(localStorage.getItem(`${this.pokeData.pokemon_species.url}`))
            }
        },
        async getPokemon(){
            if(localStorage.getItem(`${POKEMON}${this.pokeData.entry_number}`) === null){
                try{
                let data = await axios.get(`${POKEMON}${this.pokeData.entry_number}`);
                this.pokemon = data.data;
                localStorage.setItem(`${POKEMON}${this.pokeData.entry_number}`, JSON.stringify(data.data));
                }catch(e){
                    console.log(e)
                }
            }else{
                this.pokemon = JSON.parse(localStorage.getItem(`${POKEMON}${this.pokeData.entry_number}`))
            }
        },
        pokemonDetails(){
            this.$store.commit('setPokemonSpecies', JSON.stringify(this.pokemonSpecies));
            this.$store.commit('setPokemonDetails', JSON.stringify(this.pokemon));
            this.$router.push({name: 'pokemon', query: {id: this.pokeData.entry_number}});
        }
    },

    mounted(){
        this.getPokemon().then(()=>{
            this.getPokemonSpecies();
        });

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
}
</style>