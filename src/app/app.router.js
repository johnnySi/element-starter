import Router from 'vue-router'
import Vue from 'vue'
import HomeComponent from './home/home.component.vue'
import AuthBasicInfoComponent from './authBasicInfo/authBasicInfo.component.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HomeComponent',
            redirect: '/home',
            component: HomeComponent
        },
        {
            path: '/home',
            name: 'HomeComponent',
            component: HomeComponent
        },
        {
            path: '/basicInfo',
            name: 'AuthBasicInfoComponent',
            component: AuthBasicInfoComponent
        }
    ]
});