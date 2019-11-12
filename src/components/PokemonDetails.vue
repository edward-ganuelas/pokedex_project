<template>
    <div class="col col-lg-6 offset-lg-2">
        <img :alt="pokemonDetails.name" :src="pokemonDetails.sprites.front_default" />
        <h2 class="name">{{pokemonDetails.id}}. {{pokemonDetails.name}}</h2>
        <h3>The {{genera.genus}}</h3>
        <type-badge v-for="type in pokemonDetails.types" :key="type.type.name" :type="type.type.name" @click="$emit('get-type',type.type.url)" />
        <transition name="slideDown" leave-active-class="dissapear">
            <div class="typeText" v-if="type.length > 0" v-html="type"></div>
        </transition>
        <h4>Abilities</h4>
        <abilities-badge v-for="ability in pokemonDetails.abilities" :key="ability.ability.name" :ability="ability.ability.name" @click="$emit('get-ability', ability.ability.url)" />
        <transition name="slideDown" leave-active-class="dissapear">
            <div class="typeText" v-if="ability" v-html="ability"></div>
        </transition>
        <h4>Flavour Text</h4>
        <p class="flavourText">{{flavourText.flavor_text}}</p>  
        <p class="typeText">Height: {{pokemonDetails.height}}. Weight: {{pokemonDetails.weight}}</p>
        <chart :stats="pokemonStats" :labels="pokemonStatsLabel" />
    </div>
</template>

<script>
import Chart from '@/components/Chart';
import TypeBadge from '@/components/TypeBadge';
import AbilitiesBadge from '@/components/AbilitiesBadge';
export default {
    name: 'PokemonDetails',
    props: {
        pokemonDetails: Object,
        genera: Object,
        type: String,
        ability: String,
        flavourText: Object,
        pokemonStats: Array,
        pokemonStatsLabel: Array
    },
    components: {
        Chart,
        TypeBadge,
        AbilitiesBadge
    }
    
}
</script>

<style scoped lang="scss">
</style>