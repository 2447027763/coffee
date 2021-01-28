<template>
    <div class="hotSellItemOne">
        <div class="hotSellOne" v-for="(v,k) in hotSellList" :key="k" @click="jumpDetailed(v.pid)">
            <div class="img">
                <img :src="v.largeImg" alt="">
                <div class="hotIcon">
                    HOT
                </div>
            </div>
            <div class="itemBottom">
                <div class="proName">
                    <div>
                        {{v.name}}
                    </div>
                    
                </div>
                <div class="itemPrice">
                    <span>￥</span><span>{{v.price}}</span>
                </div>
                <div class="englishName">
                    <div>
                        {{v.enname}}
                    </div>
                    
                </div>
                
                </div>
               
        </div>
         <div class="space"></div>
    </div>
</template>

<script>
import "../assets/less/hotSellItemOne.less"
    export default {
        methods:{
            jumpDetailed(pid){
                this.$router.push({
                    name:"Detailed",
                    params:{
                        pid:pid
                    }
                })
            }
        },
        props:["hotSellList"],
       
    }
</script>
