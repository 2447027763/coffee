<template>
    <div class="myOrder">
        <TopHeader>
            <template>我的订单</template>
        </TopHeader>
        <div class="myOrderBox">
            <div class="myOrderTab">
            <van-tabs color="#994A1B" @rendered="rendered" @change="toggleStatus" v-model="currentIndex">
                <van-tab title="全部">
                    <div class="allBox">
                        <div class="completed" v-for="(v,k) in completedList" :key="k|random">
                            <div class="completedTop">
                                <div class="num">{{v[0].oid}}</div>
                                <div class="rightDelect" @click="delectOrder(v[0].oid)">
                                    已完成 <van-icon name="delete-o" size="20" color="#994A1B"/>
                                </div>
                            </div>
                            <SettlementItems :allProduct="v"></SettlementItems>
                            <div class="shoppingCarCount">
                            <div class="settlementTime">{{v[0].updatedAt|changeTime}}</div>
                            <div class="settlementCount">
                                <div class="num">共计 {{ v.completedTotal }} 件</div>
                                <div class="totalPrice">合计 &yen; {{ v.completedPrice }}</div>
                            </div>
                            </div>
                        </div>
                        <div class="title">未收货</div>
                        <div class="inCompleted" v-for="(value,key) in incompleteList" :key="key">
                            <div class="inCompletedTop">
                                <div class="num">{{value[0].oid}}</div>
                                <div class="rightDelect" @click="confirmReceipt(value[0].oid)">
                                    确认收货
                                </div>
                            </div>
                            <SettlementItems :allProduct="value"></SettlementItems>
                            <div class="shoppingCarCount">
                            <div class="settlementTime">{{value[0].updatedAt|changeTime}}</div>
                            <div class="settlementCount">
                                <div class="num">共计 {{ value.completedTotal }} 件</div>
                                <div class="totalPrice">合计 &yen; {{ value.completedPrice }}</div>
                            </div>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="进行中">
                     <div class="incompleteBox">
                        <div class="inCompleted" v-for="(value,key) in incompleteList" :key="key">
                            <div class="inCompletedTop">
                                <div class="num">{{value[0].oid}}</div>
                                <div class="rightDelect" @click="confirmReceipt(value[0].oid)">
                                    确认收货
                                </div>
                            </div>
                            <SettlementItems :allProduct="value"></SettlementItems>
                            <div class="shoppingCarCount">
                            <div class="settlementTime">{{value[0].updatedAt|changeTime}}</div>
                            <div class="settlementCount">
                                <div class="num">共计 {{ value.completedTotal }} 件</div>
                                <div class="totalPrice">合计 &yen; {{ value.completedPrice }}</div>
                            </div>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="已完成">
                     <div class="completedBox">
                        <div class="completed" v-for="(v,k) in completedList" :key="k|random">
                            <div class="completedTop">
                                <div class="num">{{v[0].oid}}</div>
                                <div class="rightDelect" @click="delectOrder(v[0].oid)">
                                    已完成 <van-icon name="delete-o" size="20" color="#994A1B"/>
                                </div>
                            </div>
                            <SettlementItems :allProduct="v"></SettlementItems>
                            <div class="shoppingCarCount">
                            <div class="settlementTime">{{v[0].updatedAt|changeTime}}</div>
                            <div class="settlementCount">
                                <div class="num">共计 {{ v.completedTotal }} 件</div>
                                <div class="totalPrice">合计 &yen; {{ v.completedPrice }}</div>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                </van-tab>
            </van-tabs>
            </div>        
        </div>
        
    </div>
</template>

<script>
import "../assets/less/myOrder.less"
import TopHeader from "../components/TopHeader";
import SettlementItems from "../components/SettlementItems"
    export default {
        data(){
            return {
                currentIndex:0,
                completedList:[],
                incompleteList:[],
                orderList:[],
            }
        },
        filters:{
            random(key){
                return key+Math.random();
            },
            changeTime(timer){
                let time=new Date(timer);
                let y=time.getFullYear();
                let M=time.getMonth()+1;
                let d=time.getDate()>10?time.getDate():'0'+time.getDate();
                let h=time.getHours()>10?time.getHours():'0'+time.getHours();
                let m=time.getMinutes()>10?time.getMinutes():'0'+time.getMinutes();
                let s=time.getSeconds()>10?time.getSeconds():'0'+time.getSeconds();
                return y+"-"+M+"-"+d+" "+h+":"+m+":"+s;
            }
        },
        methods:{
            delectOrder(oid){
                let token = this.$cookies.get("tokenString");
                if (!token) {
                    this.$toast("token过期了,请重新登录");
                    return;
                }
                this.$axios({
                    method: "post",
                    url: "/removeOrder",
                    data: {
                    appkey: this.appkey,
                    tokenString: token,
                    oid
                    },
                }).then(res=>{
                    if(res.data.code==90000){
                        this.$toast(res.data.msg);
                        this.findAllOrder();
                    }
                })
            },
            confirmReceipt(oid){
                 let token = this.$cookies.get("tokenString");
                if (!token) {
                    this.$toast("token过期了,请重新登录");
                    return;
                }
                this.$axios({
                    method: "post",
                    url: "/receive",
                    data: {
                    appkey: this.appkey,
                    tokenString: token,
                    oid
                    },
                }).then(res=>{
                    if(res.data.code==80000){
                        this.$toast(res.data.msg);
                        this.findAllOrder();
                    }
                })
            },

            findAllOrder(){
                let token = this.$cookies.get("tokenString");
                if (!token) {
                    this.$toast("token过期了,请重新登录");
                    return;
                }
                this.$axios({
                    method: "get",
                    url: "/findOrder",
                    params: {
                    appkey: this.appkey,
                    tokenString: token,
                    status:0
                    },
                }).then((res) => {
                    if (res.data.code == 70000) {
                    this.$toast(res.data.msg);
                        let data=res.data.result;
                        this.completedList=[];
                        this.incompleteList=[];
                        let obj={}
                        for(let i in data){
                            if(obj[data[i]["oid"]]){
                                obj[data[i]["oid"]].push(data[i]);
                            }else{
                                obj[data[i]["oid"]]=[];
                                obj[data[i]["oid"]].push(data[i]);
                            }
                        }
                        for(let j in obj){
                            if(obj[j][0].status==2){
                                this.completedList.push(obj[j]);
                            }else if(obj[j][0].status==1){
                                this.incompleteList.push(obj[j]);
                            }
                        }

                        for(let k in this.completedList){
                            let completedTotal=0;
                            let completedPrice=0;
                            for(let l in this.completedList[k]){
                                completedTotal+=this.completedList[k][l].count;
                                completedPrice+=this.completedList[k][l].count*this.completedList[k][l].price;
                            }
                            this.completedList[k].completedTotal=completedTotal;
                            this.completedList[k].completedPrice=completedPrice;
                        }
                        for(let k in this.incompleteList){
                            let completedTotal=0;
                            let completedPrice=0;
                            for(let l in this.incompleteList[k]){
                                completedTotal+=this.incompleteList[k][l].count;
                                completedPrice+=this.incompleteList[k][l].count*this.incompleteList[k][l].price;
                            }
                            this.incompleteList[k].completedTotal=completedTotal;
                            this.incompleteList[k].completedPrice=completedPrice;
                        }

                    } else {
                    this.$toast(res.data.msg);
                    // console.log(res);
                    }
                });
            },
            rendered(){
                this.findAllOrder();
            },
            toggleStatus(){
                
            }
        },
        components:{
            TopHeader,
            SettlementItems
        },
        created(){
            
            
        }
    }   
</script>
