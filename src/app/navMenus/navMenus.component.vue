<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu default-active="2" class="el-menu-vertical-demo"
                     :router="true">
                <el-menu-item index="/main">
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <span>用户角色权限</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/main/basicInfo">基 本 信息</el-menu-item>
                        <el-menu-item index="/main/RABCInfo">RABC信息</el-menu-item>
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
        }
    }
</script>
<style>

</style>