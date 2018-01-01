<template>
    <div class="users-manager">
        <el-row>
            <el-col :span="6" class="user-list-title">
                {{userListName}}
            </el-col>
            <el-col :span="6" :offset="12" class="user-list-btn">
                <el-button icon="el-icon-plus" class="add-button" type="primary" @click="openAddDialog">添加</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="usersList" style="width: 100%" height="500" border stripe>
                <el-table-column fixed="left" type="index" width="50">
                </el-table-column>

                <el-table-column fixed prop="id" label="用户表的ID" width="200">
                </el-table-column>

                <el-table-column prop="userName" label="用户名" width="200" sortable>
                </el-table-column>

                <el-table-column label="用户登录名" width="200" sortable>
                    <template slot-scope="scope">
                        <el-tag size="medium"> {{scope.row.userLoginName}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="创建时间" width="200" sortable>
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        {{scope.row.gmtCreate}}
                    </template>
                </el-table-column>

                <el-table-column label="修改时间" width="200" sortable>
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        {{scope.row.gmtModified}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="editUser(scope.row)"
                                   size="small">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" @click="deleteUser(scope.row)"
                                   size="small">移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <el-dialog :title="dialogName" :visible.sync="diaLoginVisible"
                   width="30%"
                   center>
            <el-form :model="dialogForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="dialogForm.userName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="用户登录名" prop="userLoginName">
                    <el-input v-model="dialogForm.userLoginName" auto-complete="off"
                              :disabled="!isAddUserFlag"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="userPassword">
                    <el-input v-model="dialogForm.userPassword" auto-complete="off"
                              :disabled="!isAddUserFlag"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="confirmDialog">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="是否删除？" :visible.sync="isDelConfirmDialog" width="30%" center>
            <span>是否删除{{readyDelUserName}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="confirmDialog('del')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import userServices from '~/app/services/userServices'
    import validateServices from '~/app/services/validateServices'

    export default {
        name: 'usersInfo',
        data() {
            return {
                userListName: '用户列表',
                usersList: [],
                dialogForm: {
                    id: 0,
                    userName: '',
                    userLoginName: '',
                    userPassword: ''
                },
                diaLoginVisible: false,
                isAddUserFlag: false,
                isDelConfirmDialog: false,
                readyDelUserName: '',
                dialogName: '',
                rules: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, message: '至少三个字符', trigger: 'blur'},
                    ],
                    userLoginName: [
                        {required: true, message: '请输入登录名', trigger: 'blur'},
                        {min: 3, message: '至少三个字符', trigger: 'blur'},
                        {validator: validateServices.userLoginName4UserListValidate, trigger: 'blur'}
                    ],
                    userPassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, message: '至少三个字符', trigger: 'blur'}
                    ]
                },
            }
        },
        created() {
            this.refreshUserList();
        },

        methods: {
            editUser(editUser) {
                this.isAddUserFlag = false;
                this.dialogForm.userName = editUser.userName;
                this.dialogForm.userLoginName = editUser.userLoginName;
                this.dialogForm.id = editUser.id;
                this.dialogForm.userPassword = editUser.userPassword;
                this.diaLoginVisible = true;
            },
            deleteUser(delUser) {
                this.isDelConfirmDialog = true;
                this.readyDelUserName = delUser.userName;
                this.dialogForm.id = delUser.id;
            },
            openAddDialog() {
                this.diaLoginVisible = true;
                this.isAddUserFlag = true;
                this.dialogForm.userName = '';
                this.dialogForm.userLoginName = '';
                this.dialogForm.userPassword = '';
            },
            confirmDialog(isDelStr) {
                if (typeof isDelStr === 'string' && isDelStr === 'del') {
                    this.isDelConfirmDialog = false;
                    this.__delUserToServices();
                    return;
                }
                if (this.isAddUserFlag) {
                    this.__addUserToServices();
                } else {
                    this.__editUserToService();
                }

            },
            closeDialog() {
                this.diaLoginVisible = false;
                this.isAddUserFlag = false;
                this.isDelConfirmDialog = false;
            },

            refreshUserList() {
                userServices.getUserList()
                    .then(resp => {
                        let {datas} = resp;
                        this.usersList = datas;
                    })
            },
            __delUserToServices() {
                userServices.delUser(this.dialogForm.id)
                    .then(resp => {
                        let {datas} = resp;
                        this.$message({
                            message: '删除用户成功',
                            type: datas ? 'success' : 'warning'
                        });
                        this.refreshUserList();
                        this.closeDialog();
                    });
            },
            __addUserToServices() {
                this.$refs.ruleForm.validate(values => {
                    if (values) {
                        let {userName, userLoginName, userPassword} = this.dialogForm;
                        userServices.addUser({userName, userLoginName, userPassword})
                            .then(resp => {
                                let {datas} = resp;
                                this.$message({
                                    message: '添加用户成功',
                                    type: datas ? 'success' : 'warning'
                                });
                                this.diaLoginVisible = false;
                                this.refreshUserList();
                            });
                    }
                });
            },
            __editUserToService() {
                this.$refs.ruleForm.validate(values => {
                    if (values) {
                        let {userName, userLoginName, userPassword} = this.dialogForm;
                        userServices.editUser({userName, userLoginName, userPassword}, this.dialogForm.id)
                            .then(resp => {
                                let {datas} = resp;
                                this.$message({
                                    message: '编辑用户成功',
                                    type: datas ? 'success' : 'warning'
                                });
                                this.diaLoginVisible = false;
                                this.refreshUserList();
                            });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .user-list-title {
        font-size: 20px;
        line-height: 40px;
        height: 40px;
    }

    .user-list-btn {
        text-align: right;
    }
</style>