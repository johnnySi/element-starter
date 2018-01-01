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
            <el-form :model="roleForm" :rules="rules">
                <el-form-item label="角色名" prop="rolesName">
                    <el-input v-model="roleForm.rolesName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="confirmDialog">确 定</el-button>
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
                dialogName: '',
                roleForm: {
                    rolesName: ''
                }
            }
        },
        methods: {
            openAddDialog() {

            },
            editRole() {
            },
            delRole() {
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
        }
    }
</script>

<style>
    .role-list-btn {
        text-align: right;
    }
</style>