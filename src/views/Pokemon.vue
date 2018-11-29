<template>
    <div class="container" id="pokemon" :class="[pokemonSpecies.color.name]">
        <div class="row">
            <div class="col">
                <div class="container" >
                    <div class="row">
                        <div class="col col-lg-6 offset-lg-2">
                            <img :alt="pokemonDetails.name" :src="pokemonDetails.sprites.front_default" />
                            <h2 class="name">{{pokemonDetails.id}}. {{pokemonDetails.name}}</h2>
                            <h3>{{genera.genus}}</h3>
                            <p>{{type}}</p>
                            <p>{{flavourText.flavor_text}}</p>
                            <p>Abilities: {{abilities}}</p>
                            <p>Height: {{pokemonDetails.height}}</p>
                            <p>Weight: {{pokemonDetails.weight}}</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Base Stat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="stat in pokemonDetails.stats" :key="stat.stat.name">
                                        <td>{{stat.stat.name}}</td>
                                        <td>{{stat.base_stat}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'Pokemon',
    props: ['id'],
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
        type(){
            const type = this.pokemonDetails.types;
            if(type.length > 1){

                return type.map(x=>x.type.name.toUpperCase()).join(', ');

            }else{
                return type[0].type.name.toUpperCase();
            }
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
        color: green;
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

</style>