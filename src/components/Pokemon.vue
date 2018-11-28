<template>
    <v-container v-if="pokemonHide == false">
        <v-layout row wrap class="details">
        
                <v-flex xs12 md8>
                    <h2>{{pokemonData.id}} {{pokemonData.name | capitalize}}</h2>
                    <h3>The {{getGenera()}}</h3>
                    <div class="types">
                        <v-chip v-for="pokemonDetail in pokemonDetails.types" v-bind:key="pokemonDetail.id">{{pokemonDetail.type.name | capitalize}} Type</v-chip>
                    </div>
                </v-flex>
                <v-flex xs12 md2>
                    <img v-bind:src="pokemonDetails.sprites.front_default" v-bind:alt="pokemonData.name | capitalize" />
                </v-flex>
 
        </v-layout>
        <v-layout row wrap>
                <v-flex xs12>
                    <div class="versions">
                        <h4>Flavour Text</h4>
                        <div class="version-selectors">
                            <v-btn dark v-for="version in versions.results" v-bind:key="version.name" v-on:click="changeVersion(version.name)" v-bind:class="[version.name, btnClass]">{{version.name | capitalize}}</v-btn>
                        </div>
                        <blockquote>
                            <p class="flavorText">{{getFlavourText(version)}}</p>
                        </blockquote>
                    </div>
                    <div class="stats">
                        <h4>Base Stats</h4>
                        <p v-for="pokemonDetail in pokemonDetails.stats" v-bind:key="pokemonDetail.id">{{pokemonDetail.stat.name | capitalize }} : {{pokemonDetail.base_stat}}</p>
                        <p>Base Experience: {{pokemonDetails.base_experience}}</p>
                    </div>
                </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { POKEMONVERSION } from '../const/pokeapi.js';
import axios from "axios";
export default {
    name: 'pokemon',
    props: ['pokemonData', 'pokemonDetails', 'pokemonHide'],
    data: function() {
        return {
            "flavorText": this.pokemonData.flavor_text_entries,
            "versions": '',
            "version": 'red',
            "btnClass": "btn",
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
            console.log(POKEMONVERSION);
            if (sessionStorage.getItem(POKEMONVERSION) === null) {
                let pokemonPromise = axios.get(POKEMONVERSION);
                pokemonPromise.then((message) => {
                    this.versions = message.data;
                    sessionStorage.setItem(POKEMONVERSION, JSON.stringify(message.data));

                });
            } else {
                this.versions = JSON.parse(sessionStorage.getItem(POKEMONVERSION));
            }
        },
        changeVersion: function(text) {
            this.version = text;
        }
    },
    watch: {
        pokemonData: function(data) {
            this.flavorText = data.flavor_text_entries
        }
    },
    beforeMount: function() {
        this.getVersions();
    }
}
</script>

<style scoped lang="scss">
.details img {
    margin: 0 auto;
    display: block;
    @media (min-width: 768px){
        margin: 0;
    }
}
h4{
    margin: 30px auto;
}


.version-selectors {
    display: flex;
    flex-wrap: wrap;
    margin: 30px auto;
}

.types {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

@media (min-width: 768px) {
    .types {
        flex-direction: row;
    }
}

.types p {
    margin: 0 5px 10px;
}

.version-selectors button {
    margin-right: 5px;
    margin-bottom: 10px;
    color: white;
}

p.flavorText {
    text-align: center;
}

:root:root:root .red {
    background-color: red;
}

:root:root:root .blue {
    background-color: blue;
}

:root:root:root .yellow {
    background-color: yellow;
}

:root:root:root .gold {
    background-color: #FFD700;
}

:root:root:root .silver {
    background-color: #C0C0C0;
    color: #ebebeb;
}

:root:root:root .crystal {
    background-color: #8f8fc1;
}

:root:root:root .ruby {
    background-color: #b52f23;
}

:root:root:root .sapphire {
    background-color: #40579d;
}

:root:root:root .emerald {
    background-color: #00a64e;
}

:root:root:root .firered {
    background-color: #4e1f0d;
}

:root:root:root .leafgreen {
    background-color: #92ca52;
}

:root:root:root .diamond {
    background-color: #45a2b3;
}

:root:root:root .pearl {
    background-color: #430244;
}

:root:root:root .platinum {
    background-color: #0d0c0d;
}

:root:root:root .heartgold {
    background-color: #e3bb41;
}

:root:root:root .soulsilver {
    background-color: #8b9396;
}

:root:root:root .black {
    background-color: #000;
}

:root:root:root .white {
    background-color: #FFF;
    color: #000!important;
    border-color: #000;
}
</style>