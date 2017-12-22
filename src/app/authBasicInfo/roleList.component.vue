<template>
    <div class="role-list-component">
        <el-row>
            <el-col :span="6" :offset="20">
                <el-button icon="el-icon-plus" class="add-button" @click="addRole" type="info">添加</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="rolesList" style="width: 100%" height="500" border stripe>
                    <el-table-column fixed="left" type="index" width="50">
                    </el-table-column>

                    <el-table-column fixed prop="id" label="角色表ID" width="200">
                    </el-table-column>

                    <el-table-column prop="rolesName" label="角色名" width="200" sortable>
                    </el-table-column>

                    <el-table-column prop="gmtCreate" label="创建时间" width="200" sortable>
                    </el-table-column>

                    <el-table-column prop="gmtModified" label="修改时间" width="200" sortable>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" @click="editRole(scope.row)"
                                       size="small">编辑
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="delRole(scope.row)"
                                       size="small">移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog :title="dialogName" center :visible.sync="centerDialogVisible" width="30%">
            <el-form :model="form" :rules="rules">
                <el-form-item label="角色名" prop="rolesName">
                    <el-input v-model="form.rolesName" auto-complete="off"></el-input>
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
        name: 'rolesList',
        props: ['rolesList'],
        data() {
            return {
                form: {
                    rolesName: ''
                },
                dialogName: '',
                centerDialogVisible: false,
                readyDelUserName: '',
                rules: {
                    rolesName: [
                        {required: true, message: '请输入角色', trigger: 'blur'},
                        {min: 3, message: '至少三个字符', trigger: 'blur'}
                    ]
                },
                isAddRolesFlag: false,
                tipDialogVisible: false
            }
        },
        methods: {
            addRole() {
                this.centerDialogVisible = true;
                this.dialogName = '添加角色';
                this.form.rolesName = '';
                this.isAddRolesFlag = true;
            },
            delRole(roleRow) {
                this.tipDialogVisible = true;
                this.readyDelUserName = roleRow.rolesName;
                this.form.id = roleRow.id;
            },
            editRole(roleRow) {
                this.form.rolesName = roleRow.rolesName;
                this.form.id = roleRow.id;
                this.centerDialogVisible = true;
                this.isAddRolesFlag = false;
            },
            confirmDialog(delStr) {
                this.centerDialogVisible = false;
                this.tipDialogVisible = false;
                if (typeof delStr === 'string' && delStr === 'del') {
                    this.confirmDelRole();
                    return;
                }
                if (this.isAddRolesFlag) {
                    this.confirmAddRole()
                } else {
                    this.confirmEditRole();
                }
            },
            confirmAddRole() {
                this.isAddRolesFlag = false;
                app.addRole({
                    rolesName: this.form.rolesName
                }).then(resp => {
                    let {datas} = resp;
                    this.$emit('refreshRoleList');
                    this.$message({
                        message: '添加角色成功',
                        type: datas ? 'success' : 'warning'
                    });
                }, () => {
                    this.$message({
                        showClose: true,
                        message: '编辑角色错误',
                        type: 'error'
                    });
                });
            },
            confirmEditRole() {
                app.editRole({
                    rolesName: this.form.rolesName
                }, this.form.id).then(resp => {
                    let {datas} = resp;
                    this.$emit('refreshRoleList');
                    this.$message({
                        showClose: true,
                        message: '编辑角色成功',
                        type: datas ? 'success' : 'warning'
                    });
                }, () => {
                    this.$message({
                        showClose: true,
                        message: '编辑角色错误',
                        type: 'error'
                    });
                });
            },
            confirmDelRole() {
                app.delRole(this.form.id)
                    .then(resp => {
                        let {datas} = resp;
                        this.$message({
                            message: '删除用户成功',
                            type: datas ? 'success' : 'warning'
                        });
                        this.$emit('refreshRoleList');
                    });
            },
            closeDialog() {
                this.centerDialogVisible = false;
                this.isAddRolesFlag = false;
                this.tipDialogVisible = false;
            }
        }

    }

</script>

<style>


</style>