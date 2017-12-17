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
        return this.$http.get(`${APP_CONFIG.isDev}/users/${loginName}/user-login-name`)
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

    getRolesList() {
        return this.$http.get(`${APP_CONFIG.isDev}/roles`)
            .then(resp => resp.body);
    }

    addRole(roleModel) {
        return this.$http.post(`${APP_CONFIG.isDev}/roles`, roleModel)
            .then(resp => resp.body);
    }

    editRole(roleModel, roleId) {
        return this.$http.put(`${APP_CONFIG.isDev}/roles/${roleId}`, roleModel)
            .then(resp => resp.body);
    }

    delRole(roleId) {
        return this.$http.delete(`${APP_CONFIG.isDev}/roles/${roleId}`)
            .then(resp => resp.body);
    }

    getPermissionsList() {
        return this.$http.get(`${APP_CONFIG.isDev}/permissions`)
            .then(resp => resp.body);
    }

    addPermissions(permissionModel) {
        return this.$http.post(`${APP_CONFIG.isDev}/permissions`, permissionModel)
            .then(resp => resp.body);
    }

    editPermission(permissionModel, perId) {
        return this.$http.put(`${APP_CONFIG.isDev}/permissions/${perId}`, permissionModel)
            .then(resp => resp.body);
    }

    delPermission(perId) {
        return this.$http.delete(`${APP_CONFIG.isDev}/permissions/${perId}`)
            .then(resp => resp.body);
    }

    getUserCounts() {
        return this.$http.get(`${APP_CONFIG.isDev}/users/counts`)
            .then(resp => resp.body);
    }

    getRoleCount() {
        return this.$http.get(`${APP_CONFIG.isDev}/roles/counts`)
            .then(resp => resp.body);
    }

    getPermissionCount() {
        return this.$http.get(`${APP_CONFIG.isDev}/permissions/counts`)
            .then(resp => resp.body);
    }


}

export default new AuthBasicServices();