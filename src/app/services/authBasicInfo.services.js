import Vue from 'vue'
import {APP_CONFIG} from '../app.config';

class AuthBasicServices extends Vue {

    constructor() {
        super();
    }

    getUsersList() {
        return this.$http.get(`${APP_CONFIG.isDev}/users`)
            .then(resp => resp.body);
    }

    getUserByLoginName(loginName) {
        return this.$http.get(`${APP_CONFIG.isDev}/users/${loginName}`)
            .then(resp => resp.body);
    }

    addUser(usersModel) {
        return this.$http.post(`${APP_CONFIG.isDev}/users`, usersModel)
            .then(resp => resp.body);
    }

    editUser(userModel, userId) {
        return this.$http.put(`${APP_CONFIG.isDev}/users/${userId}`, userModel)
            .then(resp => resp.body);
    }

    delUser(userId) {
        return this.$http.delete(`${APP_CONFIG.isDev}/users/${userId}`)
            .then(resp => resp.body);
    }

    getUserCounts() {
        return this.$http.get(`${APP_CONFIG.isDev}/users`)
            .then(resp => resp.body);
    }

    getRoleCount() {
        return this.$http.get(`${APP_CONFIG.isDev}/users`)
            .then(resp => resp.body);
    }

    getPermission() {
        return this.$http.get(`${APP_CONFIG.isDev}/users`)
            .then(resp => resp.body);
    }


}

export default new AuthBasicServices();