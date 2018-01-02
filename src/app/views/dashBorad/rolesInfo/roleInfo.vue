<template>
    <div class="roles-manager">
        <el-row>
            <el-col :span="6" class="user-list-title">
                {{roleListName}}
            </el-col>
            <el-col :span="6" :offset="12" class="role-list-btn">
                <el-button icon="el-icon-plus" class="add-button" type="primary" @click="openAddDialog">添加</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-table :data="rolesList" style="width: 100%" height="500" border stripe>
                <el-table-column fixed="left" type="index" width="50">
                </el-table-column>

                <el-table-column fixed prop="id" label="角色表ID" width="200">
                </el-table-column>

                <el-table-column label="角色名" width="200" sortable>
                    <template slot-scope="scope">
                        <el-tag size="medium" type="info">{{scope.row.rolesName}}</el-tag>
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
                        <el-button type="text" icon="el-icon-edit" @click="editRole(scope.row)"
                                   size="small">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" @click="delRole(scope.row)"
                                   size="small">移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <el-dialog :title="dialogName" center :visible.sync="diaLoginVisible" width="30%">
            <el-form :model="roleForm">
                <el-form-item label="角色名">
                    <el-input v-model="roleForm.rolesName" auto-complete="off"></el-input>
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
    import rolesServices from '~/app/services/roleServices'

    export default {
        name: 'rolesInfo',
        data() {
            return {
                roleListName: '角色列表',
                rolesList: [],
                diaLoginVisible: false,
                isAddUserFlag: false,
                dialogName: '',
                roleForm: {
                    rolesName: '',
                    id: 0
                },
                isDelConfirmDialog: false,
                readyDelUserName: ''
            }
        },
        methods: {
            openAddDialog() {
                this.diaLoginVisible = true;
                this.isAddUserFlag = true;
                this.dialogName = '添加角色';
                this.roleForm.rolesName = '';
            },
            editRole(editRole) {
                this.diaLoginVisible = true;
                this.isAddUserFlag = false;
                this.roleForm.rolesName = editRole.rolesName;
                this.roleForm.id = editRole.id;
                this.dialogName = '编辑角色';
            },
            delRole(delRole) {
                this.isDelConfirmDialog = true;
                this.readyDelUserName = delRole.rolesName;
                this.roleForm.id = delRole.id;
                this.dialogName = '删除角色';
            },

            confirmDialog(isDeleteStr) {
                if (typeof isDeleteStr === 'string' && isDeleteStr === 'del') {
                    this.isDelConfirmDialog = false;
                    this.__delRoleDialog();
                    return;
                }
                if (this.isAddUserFlag) {
                    this.__addRoleDialog();
                } else {
                    this.__editRoleDialog();
                }
            },

            closeDialog() {
                this.diaLoginVisible = false;
                this.isAddUserFlag = false;
                this.isDelConfirmDialog = false;
            },

            __delRoleDialog() {
                rolesServices.delRole(this.roleForm.id)
                    .then(resp => {
                        let {datas} = resp;
                        this.$message({
                            message: '删除角色成功',
                            type: datas ? 'success' : 'warning'
                        });
                        this.__refreshRolesList();
                        this.closeDialog();
                    });
            },
            __addRoleDialog() {
                rolesServices.addRole({
                    rolesName: this.roleForm.rolesName
                }).then(resp => {
                    let {datas} = resp;
                    this.$message({
                        message: '添加角色成功',
                        type: datas ? 'success' : 'warning'
                    });
                    this.isAddUserFlag = false;
                    this.__refreshRolesList();
                    this.closeDialog();
                });

            },

            __editRoleDialog() {
                rolesServices.editRole({
                    rolesName: this.roleForm.rolesName
                }, this.roleForm.id).then(resp => {
                    let {datas} = resp;
                    this.$message({
                        showClose: true,
                        message: '编辑角色成功',
                        type: datas ? 'success' : 'warning'
                    });
                    this.__refreshRolesList();
                    this.closeDialog();
                });
            },

            __refreshRolesList() {
                rolesServices.getRolesList()
                    .then(resp => {
                        let {datas} = resp;
                        this.rolesList = datas;
                    })
            }
        },
        created() {
            this.__refreshRolesList();
            this.diaLoginVisible = false;
            this.isAddUserFlag = false;
        }
    }
</script>

<style>
    .role-list-btn {
        text-align: right;
    }
</style>