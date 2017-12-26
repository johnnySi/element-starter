<template>
    <div class="user-login" :style="loginTopStyle">
        <div slot="header" class="clearfix user-login-title">{{loginPageTitle}}
        </div>
        <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px">
            <el-form-item label="用户登录名" prop="userLoginName">
                <el-input v-model="userForm.userLoginName" placeholder="请输入用户登录名" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
                <el-input v-model="userForm.userPassword" type="password" placeholder="请输入密码"
                          auto-complete="off"></el-input>
            </el-form-item>
            <div class="bottom clearfix">
                <el-button @click="resetUserForm('userForm')">重置</el-button>
                <el-button type="primary" @click="userSignIn('userForm')"><i class="el-icon-check"></i>登录</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import validateServices from '../../services/validateServices'
    import loginServices from '../../services/loginServices'
    import * as _ from 'underscore'

    export default {
        name: 'login',
        data() {
            return {
                userForm: {
                    userLoginName: '',
                    userPassword: ''
                },
                loginPageTitle: '用户登录',
                rules: {
                    userLoginName: [{validator: validateServices.userLoginNameValidate, trigger: 'blur'}],
                    userPassword: [{validator: validateServices.userPasswordValidate, trigger: 'blur'}]
                },
                loginTopStyle: {
                    top: ''
                }

            }
        },

        methods: {
            userSignIn(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        loginServices.userLogin({
                            userLoginName: this.userForm.userLoginName,
                            userPassword: this.userForm.userPassword
                        }).then((resp) => {
                            let {access_token} = resp;
                            if (!_.isEmpty(access_token)) {
                                sessionStorage.setItem('accessToken', access_token);
                                this.$router.push('dashBoard')
                            }
                        }, () => {
                            this.$message({
                                message: '密码或者用户名错误请重新输入',
                                type: 'warning'
                            });
                        });
                    } else {
                        this.$message({
                            message: '您输入的用户名或者密码不符合归档',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            resetUserForm(formName) {
                this.$refs[formName].resetFields()
                console.log(this.$router);
            }
        },
        created() {
            let screenHeight = window.screen.height;
            this.loginTopStyle.top = `${(screenHeight - 460) / 2}px`;
        }
    }
</script>

<style scoped>
    .user-login {
        width: 500px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }

    .user-login-title {
        margin-bottom: 40px;
        font-size: 20px;
    }
</style>