<template>
    <div class="home-component">
        <el-card class="box-card">
            <span>用户个数</span>
        </el-card>
        <el-card class="box-card">
            <span>角色个数</span>
        </el-card>
        <el-card class="box-card">
            <span>权限个数</span>
        </el-card>
    </div>

</template>

<script>
    export default {
        name: 'HomeComponent',
        data() {
            return {
                currentDate: new Date()
            }
        },
        created() {
            console.log('options.dev')
        }
    }
</script>

<style>
    .box-card {
        width: 250px;
        background-color: #409EFF;
        display: inline-block;
        color: white;
    }

</style>