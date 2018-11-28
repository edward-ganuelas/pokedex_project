<template>
    <div class="container" id="pokemon" :style="{'background-color': pokemonSpecies.color.name}" :class="[pokemonSpecies.color.name]">
        <div class="row">
            <div class="col">
                <img :alt="pokemonDetails.name" :src="pokemonDetails.sprites.front_default" />
                <p class="name">{{pokemonDetails.name}}</p>
                <p>{{genera.genus}}</p>
                <p>{{flavourText.flavor_text}}</p>
                <p>Abilities: <span v-for="ability in pokemonDetails.abilities" :key="ability.ability.name">{{ability.ability.name}} </span></p>
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

        }
    }
}
</script>

<style lang="scss" scoped>
#pokemon{
    color: #FFF;
    .white{
        color: #000;
    }
}
.name{
    text-transform: uppercase;
}

</style>