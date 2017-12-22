<template>
    <div class="main-component">
        <el-container>
            <el-header>
                <i class="el-icon-news"></i>
                仪表盘
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <nav-menus></nav-Menus>
                </el-aside>
                <el-main>
                    <transition name="el-zoom-in-top">
                        <router-view/>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import navMenus from '../navMenus/navMenus.component.vue'

    export default {
        components: {navMenus},
        methods: {
            startHacking() {
                this.$notify({
                    title: 'It works!',
                    type: 'success',
                    message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
                    duration: 5000
                })
            }
        }
    }
</script>
<style>
    .main-component{
        height: 100%;
    }
</style>