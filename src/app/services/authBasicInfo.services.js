import Vue from 'vue'
import {APP_CONFIG} from '../app.config';

class AuthBasicServices extends Vue {

    constructor() {
        super();
    }

    getUsersList() {
        return this.$http.get(`${APP_CONFIG.isDev}/users`)
            .then(resp => resp.data);
    }

    getUserByLoginName(loginName) {
        return this.$http.get(`${APP_CONFIG.isDev}/users/${loginName}/user-login-name`)
            .then(resp => resp.data);
    }

    addUser(usersModel) {
        return this.$http.post(`${APP_CONFIG.isDev}/users`, usersModel)
            .then(resp => resp.data);
    }

    editUser(userModel, userId) {
        return this.$http.put(`${APP_CONFIG.isDev}/users/${userId}`, userModel)
            .then(resp => resp.data);
    }

    delUser(userId) {
        return this.$http.delete(`${APP_CONFIG.isDev}/users/${userId}`)
            .then(resp => resp.data);
    }

    getRolesList() {
        return this.$http.get(`${APP_CONFIG.isDev}/roles`)
            .then(resp => resp.data);
    }

    addRole(roleModel) {
        return this.$http.post(`${APP_CONFIG.isDev}/roles`, roleModel)
            .then(resp => resp.data);
    }

    editRole(roleModel, roleId) {
        return this.$http.put(`${APP_CONFIG.isDev}/roles/${roleId}`, roleModel)
            .then(resp => resp.data);
    }

    delRole(roleId) {
        return this.$http.delete(`${APP_CONFIG.isDev}/roles/${roleId}`)
            .then(resp => resp.data);
    }

    getPermissionsList() {
        return this.$http.get(`${APP_CONFIG.isDev}/permissions`)
            .then(resp => resp.data);
    }

    addPermissions(permissionModel) {
        return this.$http.post(`${APP_CONFIG.isDev}/permissions`, permissionModel)
            .then(resp => resp.data);
    }

    editPermission(permissionModel, perId) {
        return this.$http.put(`${APP_CONFIG.isDev}/permissions/${perId}`, permissionModel)
            .then(resp => resp.data);
    }

    delPermission(perId) {
        return this.$http.delete(`${APP_CONFIG.isDev}/permissions/${perId}`)
            .then(resp => resp.data);
    }

    getUserCounts() {
        return this.$http.get(`${APP_CONFIG.isDev}/users/counts`)
            .then(resp => resp.data);
    }

    getRoleCount() {
        return this.$http.get(`${APP_CONFIG.isDev}/roles/counts`)
            .then(resp => resp.data);
    }

    getPermissionCount() {
        return this.$http.get(`${APP_CONFIG.isDev}/permissions/counts`)
            .then(resp => resp.data);
    }

    getUsersRoleByUserId(userId) {
        return this.$http.get(`${APP_CONFIG.isDev}/users/${userId}/roles`)
            .then(resp => resp.data);
    }

    addUserRoleLink(userRoleModel) {
        return new Promise((resolve, reject) => {
            this.delUserRoleLink(userRoleModel.userId).then(() => {
                this.$http.post(`${APP_CONFIG.isDev}/users/roles/link`, userRoleModel)
                    .then(resp => resolve(resp.data));
            });
        });
    }

    delUserRoleLink(userId) {
        return this.$http.delete(`${APP_CONFIG.isDev}/users/${userId}/roles`)
            .then(resp => resp.data);
    }

    getRolePermissionByRoleId(roleId) {
        return this.$http.get(`${APP_CONFIG.isDev}/roles/${roleId}/permission`)
            .then(resp => resp.data);
    }

    addRolePermissionLink(rolePermissionModel) {
        return new Promise((resolve) => {
            this.delRolePerLink(rolePermissionModel.roleId).then(()=>{
                this.$http.post(`${APP_CONFIG.isDev}/roles/permission/link`, rolePermissionModel)
                    .then(resp => resolve(resp.data));
            })
        });
    }

    delRolePerLink(roleId) {
        return this.$http.delete(`${APP_CONFIG.isDev}/roles/${roleId}/permission`)
            .then(resp => resp.data);
    }

}

export default new AuthBasicServices();