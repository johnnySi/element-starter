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
                    <el-input v-model="form.userLoginName" placeholder="请输入用户登录名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.userPassword" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <div class="bottom clearfix">
                    <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
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
                form: {
                    userLoginName: '',
                    userPassword: ''
                },
                loginTitle: '用户登录'
            }
        },
        methods: {
            userLogin() {
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
