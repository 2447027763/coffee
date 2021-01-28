<template>
    <div class="my">
        <div class="myHeader">
            <div class="scrollX">
                <van-notice-bar
                 scrollable   
                left-icon="volume-o"
                :text="myData.desc"
                />
            </div>
            <div class="myBackground">
                <div class="upBackGround">
                    <van-uploader :after-read="afterRead" />
                </div>
                <img :src="myData.userBg" alt="">
            </div>
            <div class="myPortrait">
                <div class="img">
                    <img :src="myData.userImg" alt="">
                </div>
                <div class="myName">
                    {{myData.nickName}}<van-icon name="arrow" class="icon" color="#FFF"/>
                </div>
            </div>
            
        </div>
        <div class="myBottom">
            <van-grid :column-num="2" route>
                <van-grid-item v-for="(v,k) in selfOption" :key="k" :icon="v.icon" :text="v.text" :to="v.to"/>
            </van-grid>
        </div>
        <div class="btn">
            <van-button block color="#994A1B" @click="signOut">退出登录</van-button>
        </div>
    </div>
</template>

<script>
import "../assets/less/my.less"
    export default {
        data(){
            return {
                selfOption:[
                    {
                        icon:require("../assets/images/self-data-icon.png"),
                        text:"个人资料",
                        to:"/myOption"
                    },
                    {
                        icon:require("../assets/images/self-order-icon.png"),
                        text:"我的订单",
                        to:"/myOrder"
                    },
                    {
                        icon:require("../assets/images/self-collection-icon.png"),
                        text:"我的收藏",
                        to:"/myCollection"
                    },
                    {
                        icon:require("../assets/images/self-address-icon.png"),
                        text:"地址管理",
                        to:"/addressList"
                    },
                    {
                        icon:require("../assets/images/self-address-security.png"),
                        text:"安全中心",
                        to:"/security"
                    }

                ],
                myData:{}
            }
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
                message:"加载中。。。",
                forbidClick: true,
                duration:0
            });
            this.$axios({
                url:"/findMy",
                method:"get",
                params:{
                    appkey:this.appkey,
                    tokenString
                }
            }).then(res=>{
                if(res.data.code=="A001"){
                    this.myData=res.data.result[0];
                    this.$toast.clear();
                }else{
                    this.$toast.clear();
                    this.$toast(res.data.msg);
                    this.$router.push({
                        name:"Login"
                    })
                }
            });
        },
        methods:{
            
            afterRead(file){
                let toUpdataImg=file.content;
                let imgType=file.file.type;
                toUpdataImg = toUpdataImg.split(",")[1];
                let tokenString = this.$cookies.get("tokenString");
                if (!tokenString) {
                    this.$toast("token过期了，请重新登录");
                    this.$router.push({
                    name: "Login",
                    });
                    return;
                }
                this.$toast.loading({
                    message: "加载中。。。",
                    forbidClick: true,
                    duration: 0,
                });
                this.$axios({
                    url: "/updateUserBg",
                    method:"post",
                    data: {
                    appkey: this.appkey,
                    tokenString,
                    imgType:imgType.split("/")[1],
                    serverBase64Img: toUpdataImg,
                    },
                })
                    .then((res) => {
                    console.log("res", res);
                    if (res.data.code == "I001") {
                        this.$toast(res.data.msg);
                        this.$toast.clear();
                        this.myData.userBg = res.data.userBg;
                    } else {
                        this.$toast(res.data.msg);
                    }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            signOut() {
            let tokenString = this.$cookies.get("tokenString");
            if(!tokenString){
                this.$router.push({
                    name:"Login"
                })
                return ;
            }
            this.$toast.loading({
                message: "退出中...",
                forbidClick: true,
                duration: 0,
            });
            this.axios({
                method: "post",
                url: "/logout",
                data: {
                tokenString,
                appkey: this.appkey,
                },
            }).then((res) => {
                this.$toast.clear();
                if (res.data.code == "F001") {
                this.$toast({
                    message: res.data.msg,
                    duration: 3000,
                });
                this.$router.push({
                    name: "Login",
                });
                } else {
                this.$router.push({
                    name: "Login",
                });
                this.$toast({
                    message: res.data.msg,
                    duration: 3000,
                });
                }
            });
            }
        }
    }
</script>
