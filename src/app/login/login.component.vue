<template>
    <div class="login-component">
        <el-card class="box-card" :body-style="{
        width:'400px',
        margin:'0 auto'
        }">
            <div slot="header" class="clearfix">
                <span> {{loginTitle}}</span>
            </div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="用户登录名">
                    <el-input v-model="form.name" placeholder="请输入用户登录名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <div class="bottom clearfix">
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'loginComponent',
        data() {
            return {
                form: {},
                loginTitle: '用户登录'
            }
        },
        methods: {
            submitForm() {
            },
            resetForm() {
            }
        }
    }
</script>

<style scoped>
    .el-card {
        width: 500px;
        top: 150px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
