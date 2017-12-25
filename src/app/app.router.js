import Router from 'vue-router'
import Vue from 'vue'
import HomeComponent from './home/home.component.vue'
import AuthBasicInfoComponent from './authBasicInfo/authBasicInfo.component.vue'
import RABCComponent from './authBasicInfo/rabc.component.vue'
import loginComponent from './login/login.component.vue'
import mainComponent from './mainBody/main.component.vue'

Vue.use(Router);

const router = new Router({
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
                    component: HomeComponent,
                    meta: {
                        requireAuth: true // flag标识此路由需要登录
                    }
                },
                {
                    path: 'basicInfo',
                    name: 'AuthBasicInfoComponent',
                    component: AuthBasicInfoComponent,
                    meta: {
                        requireAuth: true // flag标识此路由需要登录
                    }
                },
                {
                    path: 'RABCInfo',
                    name: 'RABCComponent',
                    component: RABCComponent,
                    meta: {
                        requireAuth: true // flag标识此路由需要登录
                    }
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        const token = localStorage.getItem('token')
        if (token && token !== 'null') {
            // Bearer是JWT的认证头部信息
            Vue.prototype.$http.defaults.headers.common['Authorization'] = token
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
});

export default router