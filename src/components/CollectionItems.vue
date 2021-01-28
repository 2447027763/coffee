<template>
    <div class="collectionItems">
        <div class="item" v-for="(v,k) in productList" :key="k">
            <div class="img">
                <img :src="v.smallImg" alt="">
            </div>
            <div class="productName">{{v.name}}</div>
            <div class="productEnName">{{v.enname}}</div>
            <div class="productBottom">
                <div class="price">&yen;{{v.price}}</div>
                <div class="delect" @click="delectCollection(v.pid)"><van-icon name="delete-o" size="18" color="#994A1B"/></div>
            </div>
        </div>
       
    </div>
</template>

<script>
    export default {
        props:["productList"],
        methods:{
             delectCollection(pid){
                let data= this.productList;
                data=this.productList.filter(v=>{
                    if(v.pid==pid){
                        return false
                    }
                    return true
                });
                
             let tokenString=this.$cookies.get("tokenString");
                if(!tokenString){
                    this.$toast("token过期了，请重新登录")
                    this.$router.push({
                        name:"Login"
                    });
                    console.log("触发");
                    return 
                }
                this.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                duration: 0,
                });
                this.$axios({
                method: "post",
                url: "/notlike",
                data: {
                    appkey: this.appkey,
                    tokenString,
                    pid
                },
                }).then((res) => {
                    console.log(res);
                if (res.data.code == 900) {
                    this.$emit("changeList",data);
                    this.$toast.clear();
                    this.$toast(res.data.msg);
                }
                });
            }
        }
       
    }
</script>

<style lang="less" scoped>
    .collectionItems{
        width: 100%;
        display: flex;
        // justify-content: space-around;
        flex-wrap: wrap;
        .item{
            margin-top: 10px;
            padding:0 5px ;
            width: 30%;
            margin-bottom:10px ;
            .img{
                width: 100%;
                img{
                    height: 100%;
                    width: 100%;
                }
            }
            .productName{
                font-size: 16px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                
            }
            .productEnName{
                font-size: 12px;
                color: #999;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .productBottom{
                height: 20px;
                display: flex;
                justify-content: space-between;
            }

        }
    }
</style>