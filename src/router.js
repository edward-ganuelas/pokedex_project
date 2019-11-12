import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Pokemon from '@/views/Pokemon.vue'
import store from '@/store.js'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },{
            path: '/pokemon',
            name: 'pokemon',
            component: Pokemon,
            props: (route) => ({
                id: route.query.id
            }),
            beforeEnter(to, from, next){
                const species = store.getters.getPokemonSpecies;
                const details = store.getters.getPokemonDetails;
                if(species !== '' || details !== ''){
                    next();
                }else{
                    next('/')
                }
            }
        }
    ],
    scrollBehavior(){
        return{x:0, y:0}
    }
})
