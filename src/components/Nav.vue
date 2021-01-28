<template>
    <div class="nav">
        <van-nav-bar  left-text="返回" left-arrow>
            <template #left>
                <div class="logo"><img class="auto-img" src="../assets/images/logo.png" alt=""></div>
                <div class="loginName">Camellia Coffee</div>
            </template>
            <template #right>
                <div class="goWatch" @click="goHome">先逛逛</div>
            </template>
        </van-nav-bar>
    </div>
</template>

<script>
import "../assets/less/nav.less"
    export default {
        methods:{
            goHome(){
                this.$router.push({
                    name:"Home"
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    
</style>