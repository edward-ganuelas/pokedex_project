<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2>{{pokemonData.id}} {{pokemonData.name | capitalize}}</h2>
                <img v-bind:src="pokemonDetails.sprites.front_default" />
                <h3>The {{getGenera()}} Pokemon</h3>
                <p v-for="pokemonDetail in pokemonDetails.types" v-bind:key="pokemonDetail.id">{{pokemonDetail.type.name | capitalize}} Type</p>
                <div class="versions">
                    <h4>Flavour Text</h4>
                    <div class="version-selectors">
                        <button v-for="version in versions.results" v-bind:key="version.name" v-on:click="changeVersion(version.name)" v-bind:class="[version.name, btnClass]">{{version.name | capitalize}}</button>
                    </div>
                    <p class="flavorText">{{getFlavourText(version)}}</p>
                </div>
                <div class="stats">
                    <h4>Base Stats</h4>
                    <p v-for="pokemonDetail in pokemonDetails.stats" v-bind:key="pokemonDetail.id">{{pokemonDetail.stat.name | capitalize }} : {{pokemonDetail.base_stat}}</p>
                    <p>Base Experience: {{pokemonDetails.base_experience}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { POKEMONVERSION, POKEMON } from '../const/pokeapi.js';
export default {
    name: 'pokemon',
    props: ['pokemonData'],
    data: function() {
        return {
            "flavorText": this.pokemonData.flavor_text_entries,
            "versions": '',
            "version": 'red',
            "btnClass": "btn",
            "pokemonDetails": "",
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
        getPokemonDetails: function() {
            let url = POKEMON + this.pokemonData.id;
            if (sessionStorage.getItem(url) === null) {
                let pokemonPromise = this.$parent.$options.methods.getPromises(url);
                pokemonPromise.then((message) =>{
                    this.pokemonDetails = JSON.parse(message);
                    sessionStorage.setItem(url, message);
                });
            } else {
                this.pokemonDetails = JSON.parse(sessionStorage.getItem(url));
            }
        },
        changeVersion: function(text) {
            this.version = text;
        }
    },
    watch: {
        pokemonData: function(data) {
            this.getPokemonDetails();
            this.flavorText = data.flavor_text_entries
        }
    },
    beforeMount: function() {
        this.getPokemonDetails();
        this.getVersions();
    },
    beforeUpdate: function () {

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
p.flavorText{
    text-align: center;
}
.red {
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