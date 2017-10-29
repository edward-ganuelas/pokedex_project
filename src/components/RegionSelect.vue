<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <label for="regionSelect">Select Region</label>
                <v-select v-model="url" id="regionSelect" :options="region"></v-select>
            </div>
        </div>
    </div>
</template>

<script>
import vSelect from "vue-select";
export default {
  name: "region-select",
  components: {
    vSelect
  },
  props: ["regionResult"],
  data: function() {
    return {
      url: "",
      region: []
    };
  },
  methods: {
    getRegions: function() {
      let results = this.regionResult.results;
      results.map(x => {
        let region = {value : x.url, label: this.capitalize(x.name)}
        this.region.push(region);
      });
    },
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  watch: {
    url: function(val) {
        this.$emit("select-region", this.url.value);
    }
  },
  beforeMount: function() {
    this.getRegions();
  }
};
</script>