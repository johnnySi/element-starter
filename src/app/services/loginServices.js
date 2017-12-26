import Vue from 'vue';
import APP_CONFIG from '../app.config';

/**
 * 登录服务类
 */
class LoginServices extends Vue {
    constructor() {
        super();
        this.appConfig = APP_CONFIG;
        this.requestUrlPrefix = this.appConfig.IS_DEV_ENVIRONMENT ? this.appConfig.DEV_PROCESS_URL : this.appConfig.DEV_PROCESS_URL;
    }

    userLogin(userFormData) {
        return this.$http.post(this.requestUrlPrefix + '/auth/token', userFormData)
            .then(resp => resp.data);
    }

    userLoginOut() {

    }

}

export default new LoginServices();