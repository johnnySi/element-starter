<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户列表信息" name="first">
            <users-list :usersList="usersList" @refreshUserList="refreshUserList"></users-list>
        </el-tab-pane>
        <el-tab-pane label="角色列表信息" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="权限列表信息" name="third">角色管理</el-tab-pane>
    </el-tabs>
</template>

<script>
    import app from '../services/authBasicInfo.services'
    import UsersList from './userList.component.vue'
    import * as _ from 'underscore'

    export default {
        name: 'AuthBasicInfo',
        data() {
            return {
                activeName: 'first',
                usersList: []
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            refreshUserList() {
                this.getUsersList();
            },
            getUsersList() {
                app.getUsersList()
                    .then(resp => {
                        let {datas} = resp;
                        this.usersList = datas;
                    });
            }
        },
        created() {
            this.getUsersList();
        },
        components: {
            UsersList
        }

    }
</script>

<style>

</style>