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
              <li>
                <router-link to="/">
                  <span class="sr-only">Home</span>
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"></path>
                  </svg>
                </router-link>
              </li>
              <li>
                <a
                  href="https://github.com/edward-ganuelas/pokedex_project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="sr-only">Github Repository</span>
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path
                      fill="#000000"
                      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="http://eightrayedsun.com">eightrayedsun</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <router-view v-slot="{ Component }">
          <transition name="fadeDown" leave-active-class="dissapear">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./node_modules/bootstrap/scss/bootstrap-reboot.scss";
@import "./node_modules/bootstrap/scss/bootstrap-grid.scss";
@import "./node_modules/bootstrap/scss/bootstrap-utilities.scss";
@import "./node_modules/bootstrap/scss/_buttons.scss";
@import "./node_modules/bootstrap/scss/_utilities.scss";
@import "./node_modules/bootstrap/scss/_spinners.scss";
@import "/node_modules/vue2-animate/dist/vue2-animate.min.css";

#app {
  // font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
html,
body {
  font-family: "Lato", sans-serif;
}

// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
.dissapear {
  display: none;
}
.header {
  padding: 15px;
  border-radius: 0 0 15px 15px;
  background-color: red;
  border: solid thin #000;
  border-top-color: transparent;
  -webkit-box-shadow: 5px 10px 2px -6px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 5px 10px 2px -6px rgba(0, 0, 0, 0.5);
  box-shadow: 5px 10px 2px -6px rgba(0, 0, 0, 0.5);
  h1 {
    color: #000;
  }

  @media (min-width: 768px){
    margin-top: 18px;
    border-radius: 15px;
  }
}
nav {
  ul {
    list-style-type: none;
    display: flex;
    li {
      flex: 0 1 auto;
      margin-right: 1rem;
      a {
        color: #000;
      }
    }
  }
}
</style>
