<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <transition name="fadeLeft" leave-active-class="dissapear">
          <router-view/>
        </transition>
      </div>
      <div class="row footer">
        <div class="col">
          <p><a href="http://eightrayedsun.com">eightrayedsun</a></p>
          <p><a href="https://github.com/edward-ganuelas/pokedex_project">Github Repo</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./node_modules/bootstrap/scss/bootstrap-reboot.scss";
@import "./node_modules/bootstrap/scss/bootstrap-grid.scss";
@import "./node_modules/bootstrap/scss/_buttons.scss";
@import "./node_modules/bootstrap/scss/_utilities.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.dissapear{
  display: none;
}
.footer{
  background-color: grey;
  margin-top: 18px;
  p{
    margin-top: 18px;
  }
  a{
    color: #000;
    text-decoration: underline;
  }
}
</style>
