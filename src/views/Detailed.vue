<template>
    <div class="detailed">
        <div class="detailedBack" @click="backHome">
            <img src="../assets/images/back.png" alt="">
        </div>
        <div class="detailedBox">
            <div class="bigImg">
                <img :src="datas.large_img" alt="">
            </div>
            <div class="info">
                <div class="defaultSelect" @click="isPop=!isPop">
                    <div class="defaultSelectImg">
                        <svg t="1611238226047" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7192" width="200" height="200"><path d="M849.454545 240.64a38.167273 38.167273 0 0 0-54.458181 53.992727A382.138182 382.138182 0 0 1 899.723636 558.545455a387.723636 387.723636 0 0 1-775.447272 0 397.963636 397.963636 0 0 1 104.727272-267.636364 38.632727 38.632727 0 0 0-54.458181-54.458182A476.16 476.16 0 0 0 46.545455 558.545455a465.454545 465.454545 0 0 0 930.90909 0 458.472727 458.472727 0 0 0-128-317.905455z" p-id="7193" fill="#994A1B"></path><path d="M469.178182 31.185455l-162.909091 162.90909a38.167273 38.167273 0 0 0 54.458182 53.992728l135.912727-135.447273 135.447273 135.447273a38.167273 38.167273 0 0 0 54.458182-53.992728l-162.909091-162.90909a37.236364 37.236364 0 0 0-54.458182 0z" p-id="7194" fill="#994A1B"></path><path d="M469.178182 263.912727l-162.909091 162.909091a38.167273 38.167273 0 0 0 54.458182 53.992727l135.912727-135.447272 135.447273 135.447272a38.167273 38.167273 0 0 0 54.458182-53.992727l-162.909091-162.909091a37.236364 37.236364 0 0 0-54.458182 0z" p-id="7195" fill="#994A1B"></path></svg>
                    </div>
                    已选:{{ruleString}}
                </div>
                 <div class="shoppingCarCount" @click="addShoppingCar">
                    <van-icon name="shopping-cart" color="#95481A" size="40px" :badge="shoppingCarCount"/>
                    <div class="shoppingCarText">购物车</div>
                </div>

                <div class="like" @click="toggeleLike"> 
                    <van-icon name="like" :color="isCollection?'#95481A':'#FCF1EF'" size="40px"/>
                    <div class="likeText">{{isCollection?"已收藏":"收藏"}}</div>
                </div>
               

                <div class="infoName">{{datas.name}}</div>
                <div class="infoEnName">{{datas.enname}}</div>
                <div class="price"><span>&yen;</span><span>59</span></div>
                <div class="line"></div>
                <div class="introduce">
                    <span class="introduceTitle">商品描述</span>
                    <div v-for="(v,k) in datas.productDesc" :key="k">{{k+1}}、{{v}}</div>
                    
                </div>
            </div>
            <div class="detailedNav">
                <van-goods-action>
                    <van-goods-action-button type="warning" @click="addShoppingCar" text="加入购物车" class="jumpCar"/>
                    <van-goods-action-button color="#994A1B" type="danger" text="立即购买"  @click="isPop=!isPop"/>
                </van-goods-action>
            </div>
            <div class="popupBottom">
                <van-popup v-model="isPop" position="bottom" class="popupBottomBox" :style="{height:'60%'}">
                    <div class="specs">
                        <div class="specsHeader">
                            <div class="specsImg">
                                <img :src="datas.small_img" alt="">
                            </div>
                            <div class="specsMessage">
                                <div class="specsName">{{datas.name}}</div>
                                <div class="specsDetailed">{{ruleString}}</div>
                            </div>
                            <div class="specsCount">
                                <van-stepper v-model="productCount" theme="round" button-size="22" disable-input/>
                            </div>
                        </div>
                        <van-divider style="background:#994A1B"/>
                        <div class="selectSpecs">
                            <div class="desc" v-for="(v,k) in datas.coffeeDesc" :key="k">
                                <div class="descName">{{v.title}}:</div>
                                <div class="descSel"><span @click="selectActive(datas.coffeeDesc[k],j)" :class="{selectActive:datas.coffeeDesc[k].currentIndex==j}" v-for="(i,j) in v.descList" :key="j">{{i}}</span></div>
                            </div>
                           
                        </div>
                         <div class="selectSpecsBottom">
                                <button @click="addShoppingCar">加入购物车</button>
                                <button @click="nowBuy">立即购买</button>
                        </div>
                    </div>
                </van-popup>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import "../assets/less/detailed.less"
import {mapState,mapMutations} from "vuex"
    export default {
        data(){
            return {
                id:"",
                datas:"",
                isPop:false,
                productCount:1,
                isCollection:false,
                ruleString:"",
                sids:"",
                isNowBuy:false
            }
        },
        computed:{
            ...mapState(["shoppingCarCount"])
        },
        methods:{
            ...mapMutations(["changeShoppingCarCount"]),
            nowBuy(){
                this.addShoppingCar();
                this.isNowBuy=true;
            },
            addShoppingCar(){
                this.$toast({
                    message: "加入购物车中...",
                    duration: 0,
                    forbidClick: true,
                });
                let token=this.$cookies.get("tokenString");
                if(!token){
                     this.$toast("登录过时,请再次登录");
                     this.$router.push({
                         name:"Login"
                     })
                }
                let coffeeDescRule=this.datas.coffeeDesc;

                // console.log(coffeeDescRule);
                this.ruleString="";
                coffeeDescRule.forEach(v=>{
                    this.ruleString+=v.descList[v.currentIndex]+"/"
                });
                this.ruleString=this.ruleString.slice(0,-1);
                // console.log(ruleString);
                
                this.$axios({
                    method:"post",
                    url:"/addShopcart",
                    data:{
                        appkey:this.appkey,
                        pid:this.id,
                        tokenString:token,
                        count:this.productCount,
                        rule:this.ruleString
                    }
                }).then(res=>{
                    if(res.data.code==3000){

                         this.$toast.clear();
                         this.$toast(res.data.msg);
                        if(this.isNowBuy){
                            this.$router.push({
                                path:"/settlement/"+res.data.sid
                            })
                        }
                        if(res.data.status==1){
                            this.changeShoppingCarCount(this.shoppingCarCount+1);
                        }

                    }else{
                        this.$toast(res.data.msg);
                        // console.log(res);
                         this.$router.push({
                            name:"Login"
                        })
                    }
                    
                })
            },
            backHome(){
                this.$router.push({
                    name:"Home"
                })
            },
            toggeleLike(){
                if(this.isCollection){
                    this.notLike();
                }else{
                    this.like();
                }
            },
            notLike(){
                let token=this.$cookies.get("tokenString");
                if(!token){
                     this.$toast("登录过时,请再次登录");
                     this.$router.push({
                         name:"Login"
                     })
                }
                this.$axios({
                    method:"post",
                    url:"/notlike",
                    data:{
                        appkey:this.appkey,
                        pid:this.id,
                        tokenString:token
                    }
                }).then(res=>{
                    console.log(res);
                    if(res.data.code==900){
                        this.$toast(res.data.msg);
                        this.isCollection=false;
                    }else{
                        this.$toast(res.data.msg);
                        // console.log(res);
                         this.$router.push({
                            name:"Login"
                        })
                    }
                    
                })
            },
            like(){
                let token=this.$cookies.get("tokenString");
                // console.log(token);
                this.$axios({
                    method:"post",
                    url:"/like",
                    data:{
                        appkey:this.appkey,
                        pid:this.id,
                        tokenString:token
                    }
                }).then(res=>{
                    if(res.data.code==800){
                        this.$toast(res.data.msg);
                        this.isCollection=true;
                    }else{
                        this.$toast(res.data.msg);
                        // console.log(res);
                         this.$router.push({
                            name:"Login"
                        })
                    }
                    
                })
            },
            add(){
                console.log(this.id);
            },
            selectActive(v,i){
                v.currentIndex=i;
                let coffeeDescRule=this.datas.coffeeDesc;

                // console.log(coffeeDescRule);
                this.ruleString=[];
                coffeeDescRule.forEach(v=>{
                    this.ruleString+=v.descList[v.currentIndex]+"/"
                });
                this.ruleString=this.ruleString.slice(0,-1);
                // console.log(v,i);
            }
        },
        created(){
            this.id=this.$route.params.pid;

                this.$toast({
                    meassage:"加载中",
                    duration:0
                })
                this.$axios({
                    url:"/productDetail",
                    method:"get",
                    params:{
                        appkey:this.appkey,
                        pid:this.id
                    }
                }).then(res=>{
                    if(res.data.code===600){
                        this.$toast.clear();
                        let data=res.data.result[0];
                        let coffeeDesc=[];  // 描述冷热的数组
                        let productDesc=[];   //描述商品咖啡的数组;
                        let typeDesc=["cream","milk","sugar","tem"];
                        typeDesc.forEach(v=>{
                            
                            let coffee={
                                currentIndex:0,
                                title:data[v+"_desc"],
                                descList:data[v].split("/")
                            };
                            if(!coffee.descList[0]==""){
                                coffeeDesc.push(coffee);
                            }
                        });
                        res.data.result[0].coffeeDesc=coffeeDesc;
                        res.data.result[0].productDesc=res.data.result[0].desc.split(/\n/);
                        this.datas=res.data.result[0];
                         let coffeeDescRule=this.datas.coffeeDesc;
                        coffeeDescRule.forEach(v=>{
                            this.ruleString+=v.descList[v.currentIndex]+"/"
                        });
                        this.ruleString=this.ruleString.slice(0,-1);
                    }else{
                        console.log(res.data.msg);
                    }
                    
                });
                 this.$axios({
                    url:"/findlike",
                    method:"get",
                    params:{
                        appkey:this.appkey,
                        pid:this.id,
                        tokenString:this.$cookies.get("tokenString")
                    }
                }).then(res=>{
                    if(res.data.code==1000){
                        if(res.data.result.length>0){
                            this.isCollection=true;
                        }
                    }
                })
        }
       
    }
</script>
