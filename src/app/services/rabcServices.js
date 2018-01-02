import Vue from 'vue';
import APP_CONFIG from '../app.config';

class RabcMangers extends Vue {

    constructor() {
        super();
        this.appConfig = APP_CONFIG;
        this.requestUrlPrefix = this.appConfig.IS_DEV_ENVIRONMENT ? this.appConfig.DEV_PROCESS_URL : this.appConfig.DEV_PROCESS_URL;
    }

    getUsersRoleByUserId(userId) {
        return this.$http.get(`${this.requestUrlPrefix}/users/${userId}/roles`)
            .then(resp => resp.data);
    }

    addUserRoleLink(userRoleModel) {
        return new Promise((resolve, reject) => {
            this.delUserRoleLink(userRoleModel.userId).then(() => {
                this.$http.post(`${this.requestUrlPrefix}/users/roles/link`, userRoleModel)
                    .then(resp => resolve(resp.data));
            });
        });
    }

    delUserRoleLink(userId) {
        return this.$http.delete(`${this.requestUrlPrefix}/users/${userId}/roles`)
            .then(resp => resp.data);
    }

    getRolePermissionByRoleId(roleId) {
        return this.$http.get(`${this.requestUrlPrefix}/roles/${roleId}/permission`)
            .then(resp => resp.data);
    }

    addRolePermissionLink(rolePermissionModel) {
        return new Promise((resolve) => {
            this.delRolePerLink(rolePermissionModel.roleId).then(() => {
                this.$http.post(`${this.requestUrlPrefix}/roles/permission/link`, rolePermissionModel)
                    .then(resp => resolve(resp.data));
            })
        });
    }

    delRolePerLink(roleId) {
        return this.$http.delete(`${this.requestUrlPrefix}/roles/${roleId}/permission`)
            .then(resp => resp.data);
    }

}

export default new RabcMangers(APP_CONFIG);