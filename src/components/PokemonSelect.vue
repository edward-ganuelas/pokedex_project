<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <label for="pokemonSelect">Select Pokemon</label>
                <select v-model="url" id="pokemonSelect">
                    <option v-for="pokemon in pokedexResult" v-bind:value="pokemon.pokemon_species.url" v-bind:key="pokemon.entry_number">
                        {{pokemon.pokemon_species.name | capitalize}}
                    </option>
                </select>
            </div>
        </div>
    </div>
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