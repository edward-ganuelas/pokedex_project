<template functional>
    <button class="btn" :class="[props.ability]" @click="listeners['click']">{{props.ability}}</button>
</template>

<script>
    export default{
        name: 'AbilitiesBadge',
        props: {
            ability: String
        }
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
}
</style>