<template>
    <select>
        <option v-for="pokemon in selectedPokemon" v-bind:value="pokemon" v-bind:key="pokemon.entry_number">
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
            
        }
    },
    watch: {
        url: function(val) {
            this.$emit("select-region", this.url);
        }
    }
}
</script>