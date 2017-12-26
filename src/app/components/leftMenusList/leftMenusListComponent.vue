<template>
    <div class="left-menus-list">
        <el-row class="tac">
            <el-col :span="24">
                <el-menu default-active="2" class="el-menu-vertical-demo"
                         :router="true">
                    <el-menu-item index="/dashBoard">
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <span>用户角色权限</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/dashBoard/userInfo">用户信息</el-menu-item>
                            <el-menu-item index="/dashBoard/roleInfo">角色信息</el-menu-item>
                            <el-menu-item index="/dashBoard/persInfo">权限信息</el-menu-item>
                            <el-menu-item index="/dashBoard/RABCInfo">RABC管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'leftMenusList'
    }
</script>