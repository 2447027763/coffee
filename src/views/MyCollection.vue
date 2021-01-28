<template>
    <div class="myCollection">
        <TopHeader>
            <template>我的收藏</template>
        </TopHeader>
        <div class="myCollectionBox">
            <CollectionItems @changeList="changeList" :productList="productList"></CollectionItems>
        </div>
    </div>
</template>

<script>
import TopHeader from "../components/TopHeader";
import CollectionItems from "../components/CollectionItems";
import "../assets/less/myCollection.less"
    export default {
        data(){
            return {
                productList:[]
            }
        },
        methods:{
            changeList(v){
                this.productList=v;
            }
        },
        components:{
            TopHeader,
            CollectionItems
        },
        created(){
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
            method: "get",
            url: "/findAllLike",
            params: {
                appkey: this.appkey,
                tokenString

            },
            }).then((res) => {
            if (res.data.code == 2000) {
                this.$toast.clear();
                this.productList = res.data.result;
            }
            });
        }
    }
</script>
