<template>
    <select v-model="url">
        <option v-for="pokemon in pokedexResult" v-bind:value="pokemon.pokemon_species.url" v-bind:key="pokemon.entry_number">
            {{pokemon.pokemon_species.name}}
        </option>
    </select>
</template>

<script>
export default {
    name: 'pokemon-select',
    props: ['pokedexResult'],
    data: function() {
        return {
            url: ''
        }
    },
    watch: {
        url: function(val) {
            this.$emit("select-pokemon", this.url);
        }
    }
}
</script>