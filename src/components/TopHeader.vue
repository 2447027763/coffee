<template>
    <div class="topHeader">
        <div class="topHeaderBox">
        <van-nav-bar left-arrow>
            <template #title>
            <div class="topHeaderTitle">
                <slot></slot>
            </div>
            </template>
            <template #left>
            <div class="myOptionLeft" @click="back">
                <van-icon name="arrow-left" color="#ffffff" />
            </div>
            </template>
        </van-nav-bar>
        </div>
        <div class="bg"></div>
    </div>
</template>

<script>
    export default {
        methods:{
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="less">
        .bg{
            height: 80px;
            width: 100%;
            background-color: #994A1B;
            position: relative;
            top: -1px;
            z-index: 222;
        }
        .topHeaderBox{
        background: #994A1B;
        /deep/ .van-nav-bar{
            background-color: #994A1B !important;
        }
        
        .topHeaderTitle{
            font-size: 20px;
            color: #FFF;
        }
        
        }
</style>