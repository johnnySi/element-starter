<template>
    <div class="rabc-component">
        <el-tabs v-model="activeName">
            <el-tab-pane label="用户角色管理" name="first">
                <el-dropdown @command="handleCommand" trigger="click">
                    <el-button type="primary">
                        当前用户：{{currentUser}} <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <template v-for="item in dropDownUsersList">
                            <el-dropdown-item :command="item.userLoginName">
                                {{item.userLoginName}}
                            </el-dropdown-item>
                        </template>
                    </el-dropdown-menu>
                </el-dropdown>

                <el-transfer
                        v-model="transferRightList"
                        filterable
                        filter-placeholder="请输入角色"
                        :titles="['所有角色', '用户拥有的角色']"
                        :button-texts="['到左边', '到右边']"
                        :format="transferFormat"
                        @change="handleChange"
                        :data="transferLeftList">
                    <el-button class="transfer-footer" slot="right-footer" size="small" type="primary"
                               @click="saveRoles">保存操作
                    </el-button>
                </el-transfer>


            </el-tab-pane>
            <el-tab-pane label="角色权限管理" name="second">

                <el-dropdown @command="handleCommand4Roles" trigger="click">
                    <el-button type="primary">
                        当前用户：{{curRole}} <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <template v-for="item in dropDownRolesList">
                            <el-dropdown-item :command="item.rolesName">
                                {{item.rolesName}}
                            </el-dropdown-item>
                        </template>
                    </el-dropdown-menu>
                </el-dropdown>

                <el-transfer
                        v-model="transferPermissionRight"
                        filterable
                        filter-placeholder="请输入角色"
                        :titles="['所有权限', '角色拥有的权限']"
                        :button-texts="['到左边', '到右边']"
                        :format="transferFormat"
                        @change="handleChange"
                        :data="transferPermission">
                    <el-button class="transfer-footer" slot="right-footer" size="small" type="primary"
                               @click="saveRolesPermission">保存操作
                    </el-button>
                </el-transfer>

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
                curRole: '',
                dropDownUsersList: [],
                dropDownRolesList: [],
                transferFormat: {
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                },
                transferLeftList: [],
                transferRightList: [],
                curUserId: 0,
                curRoleId: 0,
                transferPermission: [],
                transferPermissionRight: []
            }
        },
        methods: {
            handleCommand(command) {
                this.currentUser = command;
                let userItem = _.find(this.dropDownUsersList, resp => resp.userLoginName === command);
                this.curUserId = userItem.id;
                this.getUserRoleByUserId(userItem.id);
            },

            handleCommand4Roles(command) {
                this.curRole = command;
                let roleItem = _.find(this.dropDownRolesList, resp => resp.rolesName === command);
                this.curRoleId = roleItem.id;
                this.getRolePermissionByRoleId(roleItem.id);
            },

            handleChange(value, direction, movedKeys) {
                console.log(direction, movedKeys);
            },

            getUserRoleByUserId(userId) {
                app.getUsersRoleByUserId(userId).then(resp => {
                    this.transferRightList = _.map(resp.datas, item => {
                        return item.id;
                    });
                });

            },

            getRolePermissionByRoleId(roleId) {
                app.getRolePermissionByRoleId(roleId)
                    .then(resp => {
                        this.transferPermissionRight = _.map(resp.datas, item => {
                            return item.id;
                        });
                    })
            },

            saveRoles() {
                let userId = this.curUserId;
                let roleId = _.compact(this.transferRightList);
                if (roleId.length > 1) {
                    this.$message({
                        showClose: true,
                        message: '每个用户只能对应一个角色',
                        type: 'error'
                    });
                    return;
                }
                app.addUserRoleLink({
                    userId,
                    roleId: roleId[0]
                }).then(resp => {
                    this.$message({
                        showClose: true,
                        message: '添加角色成功',
                        type: 'success'
                    });
                });
            },
            saveRolesPermission() {
                let roleId = this.curRoleId;
                let perIds = _.compact(this.transferPermissionRight);

                app.addRolePermissionLink({
                    roleId,
                    perIds
                }).then(resp => {
                    this.$message({
                        showClose: true,
                        message: '添加权限成功',
                        type: 'success'
                    });
                });
            }
        },
        created() {

            app.getUsersList().then(resp => {
                let {datas} = resp;
                this.currentUser = datas[0].userLoginName;
                this.dropDownUsersList = datas;
                this.handleCommand(this.currentUser);
            });

            app.getRolesList().then(resp => {
                let {datas} = resp;
                this.transferLeftList = _.map(datas, (item, index) => {
                    return {
                        key: item.id,
                        label: `${index + 1} ${item.rolesName}`,
                        disabled: false
                    }
                });
                this.dropDownRolesList = resp.datas;
                this.curRole = resp.datas[0].rolesName;
                this.handleCommand4Roles(this.curRole);
            });

            app.getPermissionsList()
                .then(resp => {
                    let {datas} = resp;
                    this.transferPermission = _.map(datas, (item, index) => {
                        return {
                            key: item.id,
                            label: `${index + 1} ${item.permissionName}`,
                            disabled: false
                        }
                    });
                });
        }
    }

</script>

<style>
    .el-tab-pane {
        text-align: left;
    }

    .transfer-footer {
        margin-left: 20px;
        padding: 6px 5px;
    }

    .el-transfer-panel {
        width: 500px;
    }
</style>