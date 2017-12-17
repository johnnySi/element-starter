<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="用户列表信息" name="first">
            <users-list :usersList="usersList" @refreshUserList="refreshUserList"></users-list>
        </el-tab-pane>
        <el-tab-pane label="角色列表信息" name="second">
            <roles-list :rolesList="rolesList" @refreshRoleList="refreshRoleList"></roles-list>
        </el-tab-pane>
        <el-tab-pane label="权限列表信息" name="third">
            <permissions-list :permissionsList="permissionsList"
                              @refreshPermissionList="refreshPermissionList"></permissions-list>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import app from '../services/authBasicInfo.services'
    import UsersList from './userList.component.vue'
    import RolesList from './roleList.component.vue'
    import permissionsList from './permissionList.component.vue'
    import * as _ from 'underscore'

    export default {
        name: 'AuthBasicInfo',
        data() {
            return {
                activeName: 'first',
                usersList: [],
                rolesList: [],
                permissionsList: []
            }
        },
        methods: {
            refreshUserList() {
                this.getUsersList();
            },
            getUsersList() {
                app.getUsersList()
                    .then(resp => {
                        let {datas} = resp;
                        this.usersList = datas;
                    });
            },
            getRolesList() {
                app.getRolesList()
                    .then(resp => {
                        let {datas} = resp;
                        this.rolesList = datas;
                    });
            },

            getPermissionsList() {
                app.getPermissionsList()
                    .then(resp => {
                        let {datas} = resp;
                        this.permissionsList = datas;
                    })
            },
            refreshRoleList() {
                this.getRolesList();
            },
            refreshPermissionList() {
                this.getPermissionsList();
            }
        },
        created() {
            this.getUsersList();
            this.getRolesList();
            this.getPermissionsList();
        },
        components: {
            UsersList,
            RolesList,
            permissionsList
        }

    }
</script>

<style>

</style>