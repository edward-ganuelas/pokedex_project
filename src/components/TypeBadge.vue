<template functional>
    <button class="btn" :class="[props.type]" @click="listeners['click']">{{props.type}}</button>
</template>

<script>
    export default{
        name: 'TypeBadge',
        props: {
            type: String
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
.normal{
    background-color: white;
    color: #000;
}
.fighting{
    background-color: red;
}
.flying{
    background-color: purple;
}
.poison{
    background-color: violet;
}
.ground{
    background-color: burlywood;
}
.rock{
    background-color: grey;
}
.bug{
    background-color: greenyellow;
}
.ghost{
    background-color: darkslateblue;
}
.steel{
    background-color: silver;
}
.fire{
    background-color: orange;
}
.water{
    background-color: blue;
}
.grass{
    background-color: green;
}
.electric{
    background-color: yellow;
}
.psychic{
    background-color: plum;
}
.ice{
    background-color: skyblue;
}
.dragon{
    background-color: indigo;
}
.dark{
    background-color: #000;
    color: white;
}
.fairy{
    background-color: pink;
}
</style>