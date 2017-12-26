<template>
    <div class="home-component">
        <el-row :gutter="10">
            <el-col :span="2.5">
                <div class="grid-content bg-purple">
                    <el-card class="box-card user-counts">
                        <span>用户 {{userCounts}} 个</span>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="2.5">
                <div class="grid-content bg-purple">
                    <el-card class="box-card-one">
                        <span>角色 {{roleCounts}} 个</span>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="2.5">
                <div class="grid-content bg-purple">
                    <el-card class="box-card-two">
                        <span>权限 {{permissionCounts}} 个</span>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import viewServices from '../../../services/viewServices'

    export default {
        name: 'homeViews',
        data() {
            return {
                userCounts: 0,
                roleCounts: 0,
                permissionCounts: 0
            }
        },
        created() {
            Promise.all([
                viewServices.getUserCount(),
                viewServices.getRoleCount(),
                viewServices.getPermissionCount()
            ]).then((resp) => {
                this.userCounts = resp[0].datas;
                this.roleCounts = resp[1].datas;
                this.permissionCounts = resp[2].datas;
            });
        }
    }
</script>

<style scoped>
    .box-card {
        color: white;
        background-color: #909399;
    }

    .box-card-one {
        color: white;
        background-color: #67C23A;
    }

    .box-card-two {
        color: white;
        background-color: #409EFF;
    }
</style>