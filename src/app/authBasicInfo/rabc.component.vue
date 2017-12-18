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
                    <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
                    <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
                </el-transfer>


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
                dropDownUsersList: [],
                value3: [1],
                transferFormat: {
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                },
                transferLeftList: [],
                transferRightList: []
            }
        },
        methods: {
            handleCommand(command) {
                this.currentUser = command;
                let curLoginName = _.find(this.dropDownUsersList, resp => resp.userLoginName === command);
                this.getUserRoleByUserId(curLoginName.id);
            },
            handleChange(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
            },
            getUserRoleByUserId(userId) {
                app.getUsersRoleByUserId(userId).then(resp => {
                    this.transferRightList = _.map(resp, item => {
                        return item.id;
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
</style>