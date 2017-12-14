import Router from 'vue-router'
import Vue from 'vue'
import HomeComponent from './home/home.component.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HomeComponent',
            component: HomeComponent
        }
    ]
});