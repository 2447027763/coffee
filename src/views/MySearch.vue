<template>
    <div class="myCollection">
        <TopHeader>
            <template>
                <van-search @input="search" v-model="searchValue" placeholder="请输入搜索关键词" background="#994A1B"/>
            </template>
        </TopHeader>
        <div class="myCollectionBox">
            <CollectionItems :productList="productList"></CollectionItems>
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
                productList:[],
                searchValue:""
            }
        },
        methods:{
            search(){
                if(this.searchValue==""){
                    this.productList=[];
                    return 
                }
                this.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                duration: 0,
                });
                this.$axios({
                method: "get",
                url: "/search",
                params: {
                    appkey: this.appkey,
                    name:this.searchValue
                },
                }).then((res) => {
                    console.log(res);
                if (res.data.code == "Q001") {
                    this.$toast.clear();
                    this.productList = res.data.result;
                }
                });
            }
        },
        components:{
            TopHeader,
            CollectionItems
        },
        
    }
</script>
