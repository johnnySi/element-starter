import Vue from 'vue'
import {APP_CONFIG} from '../app.config';

class LoginServices extends Vue {
    constructor() {
        super();
    }

    userLogin(userInfo) {
        return this.$http.post(`${APP_CONFIG.isDev}/auth/login`, userInfo)
            .then(resp => resp.data);
    }
}

export default new LoginServices();