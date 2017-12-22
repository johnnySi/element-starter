<template>
    <div class="home-component">
        <el-row :gutter="10">
            <el-col :span="2.5">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
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
    import app from '../services/authBasicInfo.services'

    export default {
        name: 'HomeComponent',
        data() {
            return {
                userCounts: 0,
                roleCounts: 0,
                permissionCounts: 0
            }
        },
        created() {
            Promise.all([
                app.getUserCounts(),
                app.getRoleCount(),
                app.getPermissionCount()
            ]).then((resp) => {
                this.userCounts = resp[0].datas;
                this.roleCounts = resp[1].datas;
                this.permissionCounts = resp[2].datas;
            });


        }
    }
</script>

<style>
    .home-component {
        height: 100%;
    }

    .box-card {
        background-color: #409EFF;
        display: inline-block;
        color: white;
    }

    .box-card-one {
        background-color: #67C23A;
        display: inline-block;
        color: white;
    }

    .box-card-two {
        background-color: #E6A23C;
        display: inline-block;
        color: white;
    }

</style>