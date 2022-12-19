<template>
    <button class="btn" :class="[ability.name]" @click="onClick">{{ability.name}}</button>
</template>

<script setup>
const props = defineProps({
    ability: Object,
    clickMethod: Function
})
function onClick() {
    props.clickMethod(props.ability.url)
}
</script>

<style lang="scss" scoped>
.btn{
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 18px;
    border: 1px solid;
    padding: 8px;
    border-radius: 15px;
    &:hover{
    -webkit-box-shadow: 5px 10px 2px -6px rgba(0,0,0,0.5);
    -moz-box-shadow: 5px 10px 2px -6px rgba(0,0,0,0.5);
    box-shadow: 5px 10px 2px -6px rgba(0,0,0,0.5);
    }
}
</style>