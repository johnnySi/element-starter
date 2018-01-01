import APP_CONFIG from '~/app/app.config'
import Vue from 'vue';

class RoleServices extends Vue {
    constructor(appConfig) {
        super();
        this.appConfig = appConfig;
        this.requestUrlPrefix = this.appConfig.IS_DEV_ENVIRONMENT ? this.appConfig.DEV_PROCESS_URL : this.appConfig.DEV_PROCESS_URL;
    }

    getRolesList() {
        return this.$http.get(`${this.requestUrlPrefix}/roles`)
            .then(resp => resp.data);
    }

    addRole(roleModel) {
        return this.$http.post(`${this.requestUrlPrefix}/roles`, roleModel)
            .then(resp => resp.data);
    }

    editRole(roleModel, roleId) {
        return this.$http.put(`${this.requestUrlPrefix}/roles/${roleId}`, roleModel)
            .then(resp => resp.data);
    }

    delRole(roleId) {
        return this.$http.delete(`${this.requestUrlPrefix}/roles/${roleId}`)
            .then(resp => resp.data);
    }
}

export default new RoleServices(APP_CONFIG)