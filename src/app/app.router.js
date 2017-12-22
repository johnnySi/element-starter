import Router from 'vue-router'
import Vue from 'vue'
import HomeComponent from './home/home.component.vue'
import AuthBasicInfoComponent from './authBasicInfo/authBasicInfo.component.vue'
import RABCComponent from './authBasicInfo/rabc.component.vue'
import loginComponent from './login/login.component.vue'
import mainComponent from './mainBody/main.component.vue'


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'loginComponent',
            component: loginComponent
        },
        {
            path: '/main',
            name: 'mainComponent',
            component: mainComponent,
            children: [
                {
                    path: '',
                    name: 'HomeComponent',
                    component: HomeComponent
                },
                {
                    path: 'basicInfo',
                    name: 'AuthBasicInfoComponent',
                    component: AuthBasicInfoComponent
                },
                {
                    path: 'RABCInfo',
                    name: 'RABCComponent',
                    component: RABCComponent
                }
            ]
        }
    ]
});