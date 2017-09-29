<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2>{{pokemonData.id}} {{pokemonData.name | capitalize}}</h2>
                <h3>The {{getGenera()}} Pokemon</h3>
                <div class="versions">
                    <p>Flavour Text</p>
                    <div class="version-selectors">
                        <button v-for="version in versions.results" v-bind:key="version.name" v-on:click="changeVersion(version.name)" v-bind:class="[version.name, btnClass]">{{version.name | capitalize}}</button>
                    </div>
                    <p>{{getFlavourText(version)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { POKEMONVERSION } from '../const/pokeapi.js';
export default {
    name: 'pokemon',
    props: ['pokemonData'],
    data: function() {
        return {
            "flavorText": this.pokemonData.flavor_text_entries,
            "versions": '',
            "version": 'red',
            "btnClass": "btn"
        }
    },
    methods: {
        getFlavourText: function(version) {

            let flvText = '';

            for (let obj in this.flavorText) {
                //    console.log(this.flavorText[obj].language.name);
                if (this.flavorText[obj].language.name === 'en' && this.flavorText[obj].version.name === version) {
                    flvText = this.flavorText[obj].flavor_text;
                    break;
                }
            }
            return flvText;

        },
        getGenera: function() {
            for (let obj in this.pokemonData.genera) {
                if (this.pokemonData.genera[obj].language.name == 'en') {
                    return this.pokemonData.genera[obj].genus;
                }
            }
        },
        getVersions: function() {
            if (sessionStorage.getItem(POKEMONVERSION) === null) {
                let pokemonPromise = this.$parent.$options.methods.getPromises(POKEMONVERSION);
                pokemonPromise.then((message) => {

                    this.versions = JSON.parse(message);
                    sessionStorage.setItem(POKEMONVERSION, message);

                });
            } else {
                this.versions = JSON.parse(sessionStorage.getItem(POKEMONVERSION));
            }
        },
        changeVersion: function(text) {
            console.log(text);
            this.version = text;
        }
    },
    beforeMount: function() {
        this.getVersions();
    }
}
</script>

<style scoped>
.version-selectors {
    display: flex;
    flex-wrap: wrap;
}

.version-selectors button {
    margin-right: 5px;
    margin-bottom: 10px;
    color: white;
}
.red{
    background-color: red;
}
.blue {
    background-color: blue;
}
.yellow {
    background-color: yellow;
}
.gold {
    background-color: #FFD700;
}
</style>