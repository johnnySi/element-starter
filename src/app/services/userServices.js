import Vue from 'vue';
import APP_CONFIG from '../app.config';

/**
 * 用户服务类
 */
class UsersServices extends Vue {
    constructor() {
        super();
        this.appConfig = APP_CONFIG;
        this.requestUrlPrefix = this.appConfig.IS_DEV_ENVIRONMENT ? this.appConfig.DEV_PROCESS_URL : this.appConfig.DEV_PROCESS_URL;
    }

    getUserList() {
        return this.$http.get(this.requestUrlPrefix + `/users`)
            .then(resp => resp.data);
    }

    getUserByLoginName(loginName) {
        return this.$http.get(this.requestUrlPrefix + `/users/${loginName}/user-login-name`)
            .then(resp => resp.data);
    }

    addUser(usersModel) {
        return this.$http.post(this.requestUrlPrefix + `/users`, usersModel)
            .then(resp => resp.data);
    }

    editUser(userModel, userId) {
        return this.$http.put(this.requestUrlPrefix + `/users/${userId}`, userModel)
            .then(resp => resp.data);
    }

    delUser(userId) {
        return this.$http.delete(this.requestUrlPrefix + `/users/${userId}`)
            .then(resp => resp.data);
    }

}

export default new UsersServices();