<template>
    <div class="container" id="pokemon" :class="[pokemonSpecies.color.name]" :style="{'background-color': pokemonSpecies.color.name}">
        <div class="row">
            <div class="col">
                <div class="container" >
                    <div class="row">
                        <pokemon-details 
                            :ability=ability
                            :pokemonDetails=pokemonDetails
                            :genera=genera
                            :type=type
                            :flavourText=flavourText
                            :pokemonStats=pokemonStats
                            :pokemonStatsLabel=pokemonStatsLabel
                            @get-type=getType
                            @get-ability=getAbility
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <router-link to="/" class="back"><span class="sr-only">Back</span>
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="#000000" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                    </svg>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import PokemonDetails from '@/components/PokemonDetails.vue';
import axios from 'axios';
import db from '@/database';
export default{
    name: 'Pokemon',
    props: ['id'],
    components:{
        PokemonDetails
    },
    data(){
        return{
            type: '',
            activeTypeUrl: '',
            activeAbilityUrl: '',
            ability: ''
        }
    },
    computed: {
        pokemonDetails(){
            return JSON.parse(this.$store.getters.getPokemonDetails);
        },
        pokemonSpecies(){
            return JSON.parse(this.$store.getters.getPokemonSpecies);
        },
        genera(){
            const genera = this.pokemonSpecies.genera;
            const filteredGenera = genera.filter(text => text.language.name === 'en')
            return filteredGenera[0];
        },
        flavourText(){
            const flavourText = this.pokemonSpecies.flavor_text_entries;
            const englishFlavorText = flavourText.filter(text=> text.language.name === 'en')
            const rand = Math.floor(Math.random() * Math.floor(englishFlavorText.length));
            return englishFlavorText[rand];

        },
        pokemonStats(){
            const stats = this.pokemonDetails.stats.slice();
            return stats.map(stat => stat.base_stat).reverse();
        },
        pokemonStatsLabel(){
            const stats = this.pokemonDetails.stats.slice();
            return stats.map(label => label.stat.name).reverse();
        }
    },
    methods:{
        getType(url){
            if(url !== this.activeTypeUrl){
                this.activeTypeUrl = url;
                (async()=>{
                    const savedData = await db.type.get({url: `${url}`});
                    let data = savedData;
                    if(savedData === undefined){
                        data = await axios.get(url);
                        db.type.put({url: `${url}`, data: data.data})
                    }
                    const name = data.data.name;
                    const damageRelations = data.data.damage_relations;
                    const doubleDamageFrom = damageRelations.double_damage_from.map(x=>x.name);
                    const doubleDamageTo = damageRelations.double_damage_to.map(x=>x.name);
                    const halfDamageFrom = damageRelations.half_damage_from.map(x=>x.name);
                    const halfDamageTo = damageRelations.half_damage_to.map(x=>x.name);
                    const imuneTo = damageRelations.no_damage_from.map(x=>x.name);
                    let text = `<p>${name.toUpperCase()}.</p>`;
          
                    if(doubleDamageFrom.length > 0){
                        text += `<p>Weak against ${doubleDamageFrom.join(', ')}.</p>`;
                    }
                    if(doubleDamageTo.length > 0){
                        text += `<p>Strong against ${doubleDamageTo.join(', ')}.</p>`;
                    }
                    if(halfDamageFrom.length > 0){
                        text += `<p>Takes half damage from ${halfDamageFrom.join(', ')}.</p>`;
                    }
                    if(halfDamageTo.length > 0){
                        text += `<p>Does half damage to ${halfDamageTo.join(', ')}.</p>`;
                    }
                    if(imuneTo.length > 0){
                        text += `<p>Is immune to ${imuneTo.join(', ')}.</p>`;
                    }
                    
                    this.type = text;
                })();
            }else{
                this.activeTypeUrl = '';
                this.type = '';
            }
        },
        getAbility(url){
            if(url !== this.activeAbilityUrl){
                this.activeAbilityUrl = url;
                (async()=>{
                    const savedData = await db.ability.get({url: `${url}`});
                    let data = savedData;
                    if(savedData === undefined){
                        data = await axios.get(url);
                        db.ability.put({url: `${url}`, data: data.data})
                    }
                    const name = data.data.name;
                    const effect = data.data.effect_entries[0].effect
                    let text = `<p>${name.toUpperCase()}.</p> <p>${effect}</p>`;
                    this.ability = text;
                })();
            }else{
                this.activeAbilityUrl = '';
                this.ability = '';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#pokemon{
    color: #FFF;
    text-align: left;
    padding-top: 18px;
    padding-bottom: 18px;
    border-radius: 15px;
    margin-top: 18px;
    margin-bottom: 18px;
    -webkit-box-shadow: 8px 10px 2px -6px rgba(0,0,0,0.5);
    -moz-box-shadow: 8px 10px 2px -6px rgba(0,0,0,0.5);
    box-shadow: 8px 10px 2px -6px rgba(0,0,0,0.5);

    &.white{
        color: #000;
        border: 1px solid #000;
        .typeText, .flavourText{
            border: 1px solid black;
        }
    }
    &.yellow{
        color: #000;
    }
    table{
        width: 100%;
        text-align: center;
        text-transform: uppercase;
    }
}
.name{
    text-transform: uppercase;
}
.back{
    margin: 18px auto;
    display: block;
    text-align: center;
    z-index: 9;
}
.typeText, .flavourText{
    background-color: #FFF;
    color: #000;
    padding: 1rem;
    border-radius: 15px;
    margin-bottom: 18px;
}
</style>