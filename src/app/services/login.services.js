import Vue from 'vue'
import APP_CONFIG from '../app.config';

class LoginServices extends Vue {
    constructor() {
        super();
        this.appConfig = APP_CONFIG;
        this.requestUrlPrefix = this.appConfig.IS_DEV_ENVIRONMENT ? this.appConfig.DEV_PROCESS_URL : this.appConfig.DEV_PROCESS_URL;
    }

    userLogin(userInfo) {
        return this.$http.post(`${APP_CONFIG.isDev}/auth/login`, userInfo)
            .then(resp => resp.data);
    }
}

export default new LoginServices();