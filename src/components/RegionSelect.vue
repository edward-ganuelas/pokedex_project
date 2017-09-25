<template>
    <select name="" id="">
        <option v-for="region in results" v-bind:value="region.url" v-bind:key="region.name">
            {{region.name}}
        </option>
    </select>
</template>

<script>
import { POKEDEX } from '../const/pokeapi.js';
export default {
    name: 'region-select',
    data: function() {
        return {
            results: ''
        }
    },
    methods: {
        getRegions: function() {
            if (sessionStorage.getItem("pokedexRegions") === null) {
                let pokeDexPromise = new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", POKEDEX);
                    xhr.onload = () => resolve(xhr.responseText);
                    xhr.onerror = () => reject(xhr.statusText);
                    xhr.send();
                });

                pokeDexPromise.then((message) => {
                    this.results = message;
                    sessionStorage.setItem("pokedexRegions", message);
                });
            } else {
                this.results = JSON.parse(sessionStorage.getItem("pokedexRegions"));
            }
        }
    },
    mounted: function() {
        this.getRegions();
    }
}
</script>