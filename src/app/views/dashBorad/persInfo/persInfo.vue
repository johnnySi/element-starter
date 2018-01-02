<template>
    <div class="permission-manager">
        <el-row>
            <el-col :span="6" class="user-list-title">
                {{permissionListName}}
            </el-col>
            <el-col :span="6" :offset="12" class="role-list-btn">
                <el-button icon="el-icon-plus" class="add-button" type="primary" @click="openAddDialog">添加</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="persList" style="width: 100%" height="500" border stripe>
                <el-table-column fixed="left" type="index" width="50">
                </el-table-column>

                <el-table-column fixed prop="id" label="权限ID" width="200">
                </el-table-column>

                <el-table-column label="权限名" width="200" sortable>
                    <template slot-scope="scope">
                        <el-tag size="medium">{{scope.row.permissionName}}</el-tag>
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
                        <el-button type="text" icon="el-icon-edit" @click="editPermission(scope.row)"
                                   size="small">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" @click="delPermission(scope.row)"
                                   size="small">移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <el-dialog :title="dialogName" center :visible.sync="diaLoginVisible" width="30%">
            <el-form :model="persForms">
                <el-form-item label="权限名">
                    <el-input v-model="persForms.permissionName" auto-complete="off"></el-input>
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
    import persServices from '~/app/services/persServices'

    export default {
        name: 'persInfo',
        data() {
            return {
                permissionListName: '权限列表',
                persList: [],
                dialogName: '',
                diaLoginVisible: false,
                isAddPersFlag: false,
                tipDialogVisible: false,
                persForms: {
                    permissionName: '',
                    id: 0
                },
                readyDelUserName: ''
            }
        },
        methods: {

            openAddDialog() {
                this.diaLoginVisible = true;
                this.isAddPersFlag = true;
                this.persForms.permissionName = '';
            },

            editPermission(editPers) {
                this.persForms.permissionName = editPers.permissionName;
                this.persForms.id = editPers.id;
                this.diaLoginVisible = true;
                this.dialogName = '编辑权限';
            },

            delPermission(delPers) {
                this.persForms.id = delPers.id;
                this.tipDialogVisible = true;
                this.readyDelUserName = delPers.permissionName;
                this.dialogName = '删除权限';
            },

            closeDialog() {
                this.diaLoginVisible = false;
                this.isAddPersFlag = false;
                this.tipDialogVisible = false;
            },

            confirmDialog(isDeleteStr) {
                if (typeof isDeleteStr === 'string' && isDeleteStr === 'del') {
                    this.__delPersListServices();
                    return;
                }
                if (this.isAddPersFlag) {
                    this.__addPersListServices()
                } else {
                    this.__editPersListServices();
                }
            },

            __delPersListServices() {
                persServices.delPermission(this.persForms.id)
                    .then(resp => {
                        let {datas} = resp;
                        this.$message({
                            message: '权限删除成功',
                            type: datas ? 'success' : 'warning'
                        });
                        this.__refreshPersList();
                        this.closeDialog();
                    });
            },

            __addPersListServices() {
                persServices.addPermissions({
                    permissionName: this.persForms.permissionName
                }).then(resp => {
                    let {datas} = resp;
                    this.$emit('refreshPermissionList');
                    this.$message({
                        message: '添加权限成功',
                        type: datas ? 'success' : 'warning'
                    });
                    this.__refreshPersList();
                    this.closeDialog();
                });
            },

            __editPersListServices() {
                persServices.editPermission({
                    permissionName: this.persForms.permissionName
                }, this.persForms.id).then(resp => {
                    let {datas} = resp;
                    this.$emit('refreshPermissionList');
                    this.$message({
                        message: '编辑权限成功',
                        type: datas ? 'success' : 'warning'
                    });
                    this.__refreshPersList();
                    this.closeDialog();
                });
            },
            __refreshPersList() {
                persServices.getPermissionsList()
                    .then(resp => {
                        this.persList = resp.datas;
                    });
            }
        },
        created() {
            this.__refreshPersList();
            this.closeDialog();
        }
    }
</script>

<style>

</style>