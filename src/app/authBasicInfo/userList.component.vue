<template>
    <div class="usersList">
        <el-button icon="el-icon-plus" class="add-button" round @click="addUser">添加用户</el-button>
        <el-table :data="usersList" style="width: 100%" height="500" border stripe>
            <el-table-column fixed="left"
                             type="index"
                             width="50">
            </el-table-column>

            <el-table-column fixed prop="id" label="用户表的ID" width="200">
            </el-table-column>

            <el-table-column prop="userName" label="用户名" width="200" sortable>
            </el-table-column>

            <el-table-column prop="userLoginName" label="用户登录名" width="200" sortable>
            </el-table-column>

            <el-table-column prop="gmtCreate" label="创建时间" width="200" sortable>
            </el-table-column>

            <el-table-column prop="gmtModified" label="修改时间" width="200" sortable>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="editUsers(scope.row)"
                               size="small" round>编辑
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="delUsers(scope.row)"
                               size="small" round>移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog
                :title="dialogName"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="用户登录名" prop="userLoginName">
                    <el-input v-model="form.userLoginName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="userPassword">
                    <el-input v-model="form.userPassword" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="confirmDialog">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="是否删除？" :visible.sync="tipDialogVisible" width="30%" center>
            <span>是否删除{{readyDelUserName}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="confirmDialog('del')">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import app from '../services/authBasicInfo.services'

    export default {
        name: 'usersList',

        props: ['usersList'],

        data() {
            function validateUserLogin(rule, value, callback) {
                app.getUserByLoginName(value)
                    .then(resp => {
                        if (resp.datas.length !== 0) {
                            callback(new Error('登录名已经存在'));
                        } else {
                            callback();
                        }
                    });
            }

            return {
                centerDialogVisible: false,
                tipDialogVisible: false,
                readyDelUserName: '',
                dialogName: '',

                form: {
                    userName: '',
                    userLoginName: '',
                    userPassword: ''
                },

                rules: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, message: '至少三个字符', trigger: 'blur'},
                    ],
                    userLoginName: [
                        {required: true, message: '请输入登录名', trigger: 'blur'},
                        {min: 3, message: '至少三个字符', trigger: 'blur'},
                        {validator: validateUserLogin, trigger: 'blur'}
                    ],
                    userPassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, message: '至少三个字符', trigger: 'blur'}
                    ]
                },

                isAddUserFlag: false
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            addUser() {
                this.centerDialogVisible = true;
                this.dialogName = '添加用户';
                this.form.userName = '';
                this.form.userLoginName = '';
                this.form.userPassword = '';
                this.isAddUserFlag = true;
            },
            delUsers(userRow) {
                this.tipDialogVisible = true;
                this.readyDelUserName = userRow.userName;
                this.form.id = userRow.id;
            },
            editUsers(userRow) {
                this.form.userName = userRow.userName;
                this.form.userLoginName = userRow.userLoginName;
                this.form.id = userRow.id;
                this.form.userPassword = userRow.userPassword;
                this.centerDialogVisible = true;
                this.isAddUserFlag = false;
            },
            confirmDialog(delStr) {
                this.centerDialogVisible = false;
                this.tipDialogVisible = false;
                if (typeof delStr === 'string' && delStr === 'del') {
                    this.confirmDelUser();
                    return;
                }
                if (this.isAddUserFlag) {
                    this.confirmAddUser();
                } else {
                    this.confirmEditUser();
                }
            },
            confirmAddUser() {
                this.isAddUserFlag = false;
                app.addUser({
                    userName: this.form.userName,
                    userLoginName: this.form.userLoginName,
                    userPassword: this.form.userPassword
                }).then(resp => {
                    let {datas} = resp;
                    this.$notify({
                        title: datas ? '成功' : '失败',
                        message: '添加用户成功',
                        type: datas ? 'success' : 'warning'
                    });
                    this.$emit('refreshUserList');
                }, () => {
                    this.$notify.error({
                        title: '错误',
                        message: '编辑用户错误'
                    });
                });

            },

            confirmEditUser() {
                app.editUser({
                        userName: this.form.userName,
                        userLoginName: this.form.userLoginName,
                        userPassword: this.form.userPassword
                    }, this.form.id
                ).then(resp => {
                    let {datas} = resp;
                    this.$notify({
                        title: datas ? '成功' : '失败',
                        message: '编辑用户成功',
                        type: datas ? 'success' : 'warning'
                    });
                    this.$emit('refreshUserList');
                }, () => {
                    this.$notify.error({
                        title: '错误',
                        message: '编辑用户错误'
                    });
                });
            },

            confirmDelUser() {
                app.delUser(this.form.id)
                    .then(resp => {
                        let {datas} = resp;
                        this.$notify({
                            title: datas ? '成功' : '失败',
                            message: '删除用户成功',
                            type: datas ? 'success' : 'warning'
                        });
                        this.$emit('refreshUserList');
                    });
            },
            closeDialog() {
                this.centerDialogVisible = false;
                this.isAddUserFlag = false;
                this.tipDialogVisible = false;
            }
        }
    }
</script>
<style>
    .add-button {
        float: left;
    }
</style>