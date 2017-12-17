<template>
    <div class="rabc-component">
        <el-tabs v-model="activeName">
            <el-tab-pane label="用户角色管理" name="first">

                <el-dropdown @command="handleCommand" trigger="click">
                  <span class="el-dropdown-link">
                    {{currentUser}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in dropDownUsersList" :command="item.userLoginName">
                            {{item.userLoginName}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </el-tab-pane>
            <el-tab-pane label="角色权限管理" name="second">
                2
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import app from '../services/authBasicInfo.services'
    import _ from 'underscore'

    export default {
        name: 'rabc',
        data() {
            return {
                activeName: 'first',
                currentUser: '',
                dropDownUsersList: []
            }
        },
        methods: {
            handleCommand(command) {
                this.currentUser = command;
                this.$message('click on item ' + command);
            }
        },
        created() {
            app.getUsersList().then(resp => {
                let {datas} = resp;
                this.currentUser = datas[0].userLoginName;
                this.dropDownUsersList = datas;
            })
        }
    }

</script>

<style>

</style>