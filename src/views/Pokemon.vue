<template>
    <div class="container" id="pokemon" :class="[pokemonSpecies.color.name]">
        <div class="row">
            <div class="col">
                <div class="container" >
                    <div class="row">
                        <div class="col col-lg-6 offset-lg-2">
                            <img :alt="pokemonDetails.name" :src="pokemonDetails.sprites.front_default" />
                            <h2 class="name">{{pokemonDetails.id}}. {{pokemonDetails.name}}</h2>
                            <h3>The {{genera.genus}}</h3>
                            <!-- <p>{{type}}</p> -->
                            <type-badge v-for="type in pokemonDetails.types" :key="type.type.name" :type="type.type.name" />
                            <p>{{flavourText.flavor_text}}</p>
                            <p>Abilities: {{abilities}}</p>
                            <p>Height: {{pokemonDetails.height}}</p>
                            <p>Weight: {{pokemonDetails.weight}}</p>
                            <chart :stats="pokemonStats" :labels="pokemonStatsLabel" />
                        </div>
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
import Chart from '../components/Chart';
import TypeBadge from '../components/TypeBadge';
export default{
    name: 'Pokemon',
    props: ['id'],
    components:{
        Chart,
        TypeBadge
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
            const filteredGenera = genera.filter(x=>{
                if(x.language.name=== 'en'){
                    return x;
                }
            })
            return filteredGenera[0];
        },
        flavourText(){
            const flavourText = this.pokemonSpecies.flavor_text_entries;
            const englishFlavorText = flavourText.filter(x=>{
                if(x.language.name==='en'){
                    return x;
                }
            })
            const rand = Math.floor(Math.random() * Math.floor(englishFlavorText.length));
            return englishFlavorText[rand];

        },
        abilities(){
            const abilities = this.pokemonDetails.abilities;
            const filteredAbilities = abilities.map(x=>{
                return x.ability.name.toUpperCase();
            });
            return filteredAbilities.join(', ');
        },
        // type(){
        //     const type = this.pokemonDetails.types;
        //     if(type.length > 1){

        //         return type.map(x=>x.type.name.toUpperCase()).join(', ');

        //     }else{
        //         return type[0].type.name.toUpperCase();
        //     }
        // },
        pokemonStats(){
            const stats = this.pokemonDetails.stats.slice();
            return stats.map(x=>{
                return x.base_stat;
            }).reverse();

        },
        pokemonStatsLabel(){
            const stats = this.pokemonDetails.stats.slice();
            return stats.map(x=>{
                return x.stat.name;
            }).reverse();
        }
    },
    mounted(){
        document.body.style.backgroundColor = this.pokemonSpecies.color.name;
    }
}
</script>

<style lang="scss" scoped>
#pokemon{
    color: #FFF;
    text-align: left;
    padding-top: 18px;
    padding-bottom: 18px;
    &.white{
        color: #000;
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
}
</style>