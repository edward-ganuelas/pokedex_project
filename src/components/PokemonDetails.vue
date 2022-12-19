<template>
    <div class="col col-lg-6 offset-lg-2">
        <img :alt="pokemonDetails.name" :src="pokemonDetails.sprites.front_default" />
        <h2 class="name">{{pokemonDetails.id}}. {{pokemonDetails.name}}</h2>
        <h3>The {{genera.genus}}</h3>
        <type-badge v-for="type in pokemonDetails.types" :key="type.type.name" :type="type.type" :clickMethod="clickTypeBadge" />
        <Transition name="slideDown" leave-active-class="dissapear">
            <div class="typeText" v-if="type.length > 0" v-html="type"></div>
        </Transition>
        <h4>Abilities</h4>
        <abilities-badge v-for="ability in pokemonDetails.abilities" :key="ability.ability.name" :ability="ability.ability" :clickMethod="clickAbilitiesBadge" />
        <Transition name="slideDown" leave-active-class="dissapear">
            <div class="typeText" v-if="ability" v-html="ability"></div>
        </Transition>
        <h4>Flavour Text</h4>
        <p class="flavourText">{{flavourText.flavor_text}}</p>  
        <p class="typeText">Height: {{pokemonDetails.height}}. Weight: {{pokemonDetails.weight}}</p>
        <chart :stats="pokemonStats" :labels="pokemonStatsLabel" />
    </div>
</template>

<script setup>
import Chart from '@/components/Chart.vue';
import TypeBadge from '@/components/TypeBadge.vue';
import AbilitiesBadge from '@/components/AbilitiesBadge.vue';
defineProps({
    pokemonDetails: Object,
    genera: Object,
    type: String,
    ability: String,
    flavourText: Object,
    pokemonStats: Array,
    pokemonStatsLabel: Array
});
const emit = defineEmits(['get-type', 'get-ability']);

function clickTypeBadge(url) {
    emit('get-type',url)
}
function clickAbilitiesBadge(url) {
    emit('get-ability', url);
}
</script>

<style scoped lang="scss">
</style>