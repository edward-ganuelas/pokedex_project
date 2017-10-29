<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <label for="regionSelect">Select Region</label>
                <select v-model="url" id="regionSelect">
                    <option v-for="region in regionResult.results" v-bind:value="region.url" v-bind:key="region.name">
                        {{region.name | capitalize}}
                    </option>
                </select>
            </div>
        </div>
    </div>
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