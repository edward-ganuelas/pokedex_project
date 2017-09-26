<template>
    <select v-model="url">
        <option v-for="region in regionResult.results" v-bind:value="region.url" v-bind:key="region.name">
            {{region.name}}
        </option>
    </select>
</template>

<script>
export default {
    name: 'region-select',
    props: ['regionResult'],
    data: function() {
        return {
            url: ''
        }
    },
    watch: {
        url: function(val) {
            this.$emit("select-region", this.url);
        }
    }
}
</script>