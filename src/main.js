import Vue from 'vue'
import ElementUI from 'element-ui'
// import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './app/app.router'
import axios from 'axios'

Vue.use(ElementUI);

// Vue.use(VueResource);
Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    render: h => h(App),
    router
});
