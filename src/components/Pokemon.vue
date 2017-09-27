<template>
    <h2>
        {{pokemonData.name | capitalize}} {{getFlavourText('test')}}</h2>

</template>

<script>
export default {
    name: 'pokemon',
    props: ['pokemonData'],
    data: function() {
        return {
            "flavorText": this.pokemonData.flavor_text_entries
        }
    },
    methods: {
        getFlavourText : function (region) {
           
           let flvText = '';

           for(let obj in this.flavorText){
            //    console.log(this.flavorText[obj].language.name);
                if(this.flavorText[obj].language.name === 'en'){
                    flvText = this.flavorText[obj].flavor_text;
                    break;
                }
           }
           return flvText;

        }
    }
}
</script>

<style scoped>

</style>