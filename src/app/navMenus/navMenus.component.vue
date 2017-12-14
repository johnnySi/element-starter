<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                     :router="true">
                <el-submenu index="1">
                    <template slot="title">
                        <span>用户角色权限</span>
                    </template>

                    <el-menu-item-group>
                        <el-menu-item index="/basicInfo">基 本 信息</el-menu-item>
                        <el-menu-item index="/RABCInfo">RABC信息</el-menu-item>
                    </el-menu-item-group>


                </el-submenu>

            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        name: 'NavMenus',
        data() {
            return {};
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style>

</style>