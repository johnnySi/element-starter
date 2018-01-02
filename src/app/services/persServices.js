import APP_CONFIG from '~/app/app.config'
import Vue from 'vue';

class PersServices extends Vue {

    constructor(appConfig) {
        super();
        this.appConfig = appConfig;
        this.requestUrlPrefix = this.appConfig.IS_DEV_ENVIRONMENT ? this.appConfig.DEV_PROCESS_URL : this.appConfig.DEV_PROCESS_URL;
    }

    getPermissionsList() {
        return this.$http.get(`${this.requestUrlPrefix}/permissions`)
            .then(resp => resp.data);
    }

    addPermissions(permissionModel) {
        return this.$http.post(`${this.requestUrlPrefix}/permissions`, permissionModel)
            .then(resp => resp.data);
    }

    editPermission(permissionModel, perId) {
        return this.$http.put(`${this.requestUrlPrefix}/permissions/${perId}`, permissionModel)
            .then(resp => resp.data);
    }

    delPermission(perId) {
        return this.$http.delete(`${this.requestUrlPrefix}/permissions/${perId}`)
            .then(resp => resp.data);
    }
}

export default new PersServices(APP_CONFIG);