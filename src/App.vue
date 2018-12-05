<template>
  <div id="app">
    <div class="container">
      <div class="row header">
        <div class="col">
          <h1>PokeDex in Vue</h1>
        </div>
        <div class="col-12">
          <nav class="container">
          <ul class="row">
            <li><router-link to="/">Home</router-link></li>
            <li>About</li>
            <li><a href="https://github.com/edward-ganuelas/pokedex_project" target="_blank" rel="noopener noreferrer">Github Repository</a></li>
            <li><a href="http://eightrayedsun.com">eightrayedsun</a></li>
          </ul>
        </nav>
        </div>
      </div>
    
    </div>
    <div class="container">
      
      <div class="row">
        <transition name="fadeLeft" leave-active-class="dissapear">
          <router-view/>
        </transition>
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
  position: relative;
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
.header{
  padding: 15px;
  border-radius: 0 0 15px 15px;
  background-color: white;
  border: solid thin #000;
  border-top-color: transparent;
  -webkit-box-shadow: 5px 10px 2px -6px rgba(0,0,0,0.5);
    -moz-box-shadow: 5px 10px 2px -6px rgba(0,0,0,0.5);
    box-shadow: 5px 10px 2px -6px rgba(0,0,0,0.5);
}
nav{
  ul{
    list-style-type: none;
    display: flex;
    li{
      flex: 0 1 auto;
      margin-right: 1rem;
    }
  }
}
</style>
