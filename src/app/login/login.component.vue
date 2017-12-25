<template>
    <div class="login-component">
        <el-card class="box-card" :body-style="{
        width:'400px',
        margin:'0 auto'
        }">
            <div slot="header" class="clearfix">
                <span> {{loginTitle}}</span>
            </div>
            <el-form :model="formData" status-icon :rules="rules" ref="formData" label-width="100px">
                <el-form-item label="用户登录名" prop="userLoginName">
                    <el-input v-model="formData.userLoginName" placeholder="请输入用户登录名" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userPassword">
                    <el-input v-model="formData.userPassword" type="password" placeholder="请输入密码"
                              auto-complete="off"></el-input>
                </el-form-item>
                <div class="bottom clearfix">
                    <el-button @click="resetForm('formData')">重置</el-button>
                    <el-button type="primary" @click="submitForm('formData')">登录</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import userLoginApp from '../services/login.services';

    export default {
        name: 'loginComponent',
        data() {
            let userPasswordValidate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };

            let userNameValidate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            return {
                formData: {
                    userLoginName: '',
                    userPassword: ''
                },
                loginTitle: '用户登录',
                rules: {
                    userPassword:
                        [
                            {validator: userPasswordValidate, trigger: 'blur'}
                        ],
                    userLoginName:
                        [
                            {validator: userNameValidate, trigger: 'blur'}
                        ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        userLoginApp.userLogin({
                            userLoginName: this.formData.userLoginName,
                            userPassword: this.formData.userPassword,
                        }).then(resp => {
                           localStorage.setItem('token', resp.token);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
