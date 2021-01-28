<template>
    <div class="orderItem">
        <div class="item"  v-for="v in itemList" :key="v.id" @click="jumpDetailed(v.pid)">
            <div class="itemImg" >
                <img :src="v.smallImg" alt="">
            </div>
            <div class="itemDetailed">
                <div class="productName">{{v.name}}</div>
                <div class="productEnName">{{v.enname}}</div>
                <div class="productType">加冰加可乐</div>
            </div>
            <div class="count">
                <div class="price"><span>&yen;</span>10.00</div>
                <div class="num" >
                    +
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../assets/less/orderItem.less"
    export default {
        props:["keys","type"],
        data(){
            return {
                itemList:[]
            }
        },
        methods:{
            add(){
                console.log(this.keys);
            },
            jumpDetailed(pid){
                this.$router.push({
                    name:"Detailed",
                    params:{
                        pid
                    }
                })
            }
        },
        created(){
           this.$axios({
               url:"/typeProducts",
               method:"get",
               params:{
                   appkey:this.appkey,
                   key:this.keys,
                   value:this.type
               }
           }).then(res=>{
               if(res.data.code==500){
                   this.itemList=res.data.result;
               }
           })
        }
    }
</script>

