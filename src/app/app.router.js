import Router from 'vue-router'
import Vue from 'vue'
import HomeComponent from './home/home.component.vue'
import AuthBasicInfoComponent from './authBasicInfo/authBasicInfo.component.vue'
import RABCComponent from './authBasicInfo/rabc.component.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
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
        },
        {
            path: '/RABCInfo',
            name: 'RABCComponent',
            component: RABCComponent
        }
    ]
});