<template>
    <div class="main-component">
        <el-container>
            <el-header>
                <i class="el-icon-news"></i> 仪表盘
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <left-menus-list></left-menus-list>
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
    import leftMenusList from '../../components/leftMenusList/leftMenusListComponent.vue'

    export default {
        name: 'dashBoard',
        components: {
            leftMenusList
        }
    }
</script>