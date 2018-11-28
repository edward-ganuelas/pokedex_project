<template>
    <div class="container" id="pokemon" :style="{'background-color': pokemonSpecies.color.name}" :class="[pokemonSpecies.color.name]">
        <div class="row">
            <div class="col">
                <img :alt="pokemonDetails.name" :src="pokemonDetails.sprites.front_default" />
                <p class="name">{{pokemonDetails.id}}. {{pokemonDetails.name}}</p>
                <p>{{genera.genus}}</p>
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
    }
}
</script>

<style lang="scss" scoped>
#pokemon{
    color: #FFF;
    text-align: left;
    &.white{
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

</style>