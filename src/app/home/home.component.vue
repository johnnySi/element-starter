<template>
    <el-card :body-style="{ padding: '0px' }">
        <div style="padding: 14px;">
            <span>用户个数</span>
            <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: 'HomeComponent',
        data() {
            return {
                currentDate: new Date()
            }
        }
    }
</script>

<style>


</style>