import Vue from 'vue';
import APP_CONFIG from '../app.config';

/**
 * 登录服务类
 */
class ViewsServices extends Vue {
    constructor() {
        super();
        this.appConfig = APP_CONFIG;
        this.requestUrlPrefix = this.appConfig.IS_DEV_ENVIRONMENT ? this.appConfig.DEV_PROCESS_URL : this.appConfig.DEV_PROCESS_URL;
    }

    getUserCount() {
        return this.$http.get(this.requestUrlPrefix + `/users/counts`)
            .then(resp => resp.data);
    }

    getRoleCount() {
        return this.$http.get(this.requestUrlPrefix + `/roles/counts`)
            .then(resp => resp.data);
    }

    getPermissionCount() {
        return this.$http.get(this.requestUrlPrefix + `/permissions/counts`)
            .then(resp => resp.data);
    }

}

export default new ViewsServices();