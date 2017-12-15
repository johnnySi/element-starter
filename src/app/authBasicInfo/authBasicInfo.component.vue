<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户列表信息" name="first">



            </el-tab-pane>
            <el-tab-pane label="角色列表信息" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="权限列表信息" name="third">角色管理</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'AuthBasicInfo',
        data() {
            return {
                activeName: 'first'
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style>


</style>