<template>
    <div class="login-component">
        <el-row>
            <el-col :span="6" :offset="9">
                {{loginTitle}}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :offset="9">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="用户登录名">
                        <el-input v-model="form.name" placeholder="请输入用户登录名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
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
    .el-row {
        margin-bottom: 40px;
        font-size: 20px;
    }
</style>
