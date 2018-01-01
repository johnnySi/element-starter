import Router from 'vue-router'
import Vue from 'vue'
import login from './views/login/login.vue'
import dashBoard from './views/dashBorad/dashBoard.vue'
import homeView from './views/dashBorad/homeView/homeView.vue'
import usersInfo from './views/dashBorad/usersInfo/userInfo.vue'
import rolesInfo from './views/dashBorad/rolesInfo/roleInfo.vue'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'loginViews',
            component: login
        },
        {
            path: '/dashBoard',
            component: dashBoard,
            children: [
                {
                    path: '',
                    name: 'homeView',
                    component: homeView,
                    meta: {
                        requireAuth: true // flag标识此路由需要登录
                    }
                },
                {
                    path: 'userInfo',
                    name: 'usersInfo',
                    component: usersInfo,
                    meta: {
                        requireAuth: true // flag标识此路由需要登录
                    }
                },
                {
                    path: 'roleInfo',
                    name: 'rolesInfo',
                    component: rolesInfo,
                    meta: {
                        requireAuth: true // flag标识此路由需要登录
                    }
                }
            ]
            // children: [
            //     {
            //         path: '',
            //         name: 'HomeComponent',
            //         component: HomeComponent,
            //         meta: {
            //             requireAuth: true // flag标识此路由需要登录
            //         }
            //     },
            //     {
            //         path: 'basicInfo',
            //         name: 'AuthBasicInfoComponent',
            //         component: AuthBasicInfoComponent,
            //         meta: {
            //             requireAuth: true // flag标识此路由需要登录
            //         }
            //     },
            //     {
            //         path: 'RABCInfo',
            //         name: 'RABCComponent',
            //         component: RABCComponent,
            //         meta: {
            //             requireAuth: true // flag标识此路由需要登录
            //         }
            //     }
            // ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        const token = sessionStorage.getItem('accessToken');
        if (token && token !== 'null') {
            // Bearer是JWT的认证头部信息
            Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
});

export default router