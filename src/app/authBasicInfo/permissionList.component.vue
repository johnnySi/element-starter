<template>
    <div class="role-list-component">
        <el-button icon="el-icon-plus" class="add-button" @click="addPermission" type="info">添加</el-button>
        <el-table :data="permissionsList" style="width: 100%" height="500" border stripe>
            <el-table-column fixed="left" type="index" width="50">
            </el-table-column>

            <el-table-column fixed prop="id" label="权限ID" width="200">
            </el-table-column>

            <el-table-column prop="permissionName" label="权限名" width="200" sortable>
            </el-table-column>

            <el-table-column prop="gmtCreate" label="创建时间" width="200" sortable>
            </el-table-column>

            <el-table-column prop="gmtModified" label="修改时间" width="200" sortable>
            </el-table-column>

            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="editPermission(scope.row)"
                               size="small" >编辑
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="delPermission(scope.row)"
                               size="small" >移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="dialogName" center :visible.sync="centerDialogVisible" width="30%">
            <el-form :model="form" :rules="rules">
                <el-form-item label="权限名" prop="permissionName">
                    <el-input v-model="form.permissionName" auto-complete="off"></el-input>
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
        name: 'permissionsList',
        props: ['permissionsList'],
        data() {
            return {
                form: {
                    permissionName: ''
                },
                dialogName: '',
                centerDialogVisible: false,
                readyDelUserName: '',
                rules: {
                    permissionName: [
                        {required: true, message: '请输入权限', trigger: 'blur'},
                        {min: 3, message: '至少三个字符', trigger: 'blur'}
                    ]
                },
                isAddPermissionFlag: false,
                tipDialogVisible: false
            }
        },
        methods: {
            addPermission() {
                this.centerDialogVisible = true;
                this.dialogName = '添加权限';
                this.form.permissionName = '';
                this.isAddPermissionFlag = true;
            },
            delPermission(roleRow) {
                this.tipDialogVisible = true;
                this.readyDelUserName = roleRow.permissionName;
                this.form.id = roleRow.id;
            },
            editPermission(roleRow) {
                this.form.permissionName = roleRow.permissionName;
                this.form.id = roleRow.id;
                this.centerDialogVisible = true;
                this.isAddPermissionFlag = false;
            },
            confirmDialog(delStr) {
                this.centerDialogVisible = false;
                this.tipDialogVisible = false;
                if (typeof delStr === 'string' && delStr === 'del') {
                    this.confirmDelPermission();
                    return;
                }
                if (this.isAddPermissionFlag) {
                    this.confirmAddPermission()
                } else {
                    this.confirmEditPermission();
                }
            },
            confirmAddPermission() {
                this.isAddPermissionFlag = false;
                app.addPermissions({
                    permissionName: this.form.permissionName
                }).then(resp => {
                    let {datas} = resp;
                    this.$emit('refreshPermissionList');
                    this.$notify({
                        title: datas ? '成功' : '失败',
                        message: '添加权限成功',
                        type: datas ? 'success' : 'warning'
                    });
                }, () => {
                    this.$notify.error({
                        title: '错误',
                        message: '添加权限错误'
                    })
                });
            },
            confirmEditPermission() {
                app.editPermission({
                    permissionName: this.form.permissionName
                }, this.form.id).then(resp => {
                    let {datas} = resp;
                    this.$emit('refreshPermissionList');
                    this.$notify({
                        title: datas ? '成功' : '失败',
                        message: '编辑权限成功',
                        type: datas ? 'success' : 'warning'
                    });
                }, () => {
                    this.$notify.error({
                        title: '错误',
                        message: '编辑权限错误'
                    });
                });
            },
            confirmDelPermission() {
                app.delPermission(this.form.id)
                    .then(resp => {
                        let {datas} = resp;
                        this.$notify({
                            title: datas ? '成功' : '失败',
                            message: '权限删除成功',
                            type: datas ? 'success' : 'warning'
                        });
                        this.$emit('refreshPermissionList');
                    });
            },
            closeDialog() {
                this.centerDialogVisible = false;
                this.isAddPermissionFlag = false;
                this.tipDialogVisible = false;
            }
        }

    }

</script>

<style>


</style>