<template>
    <h2>
        {{pokemonData.name | capitalize}}</h2>
</template>

<script>
export default {
    name: 'pokemon',
    props: ['pokemonData'],
}
</script>

<style scoped>

</style>