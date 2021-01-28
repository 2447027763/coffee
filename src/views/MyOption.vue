<template>
  <div class="myOption">
    <TopHeader>
      <template>
        个人资料
      </template>
    </TopHeader>
    <div class="imgShow">
      <van-popup v-model="isShow">
        <van-uploader  :max-count="1" :after-read="afterRead">
          <div class="watchImg" :style="{'background-image':`url(${watchImg})`}">
            
          </div>
          <van-button class="upImg" icon="plus" color="#994A1B"
            >上传头像</van-button
          >
          <van-button
            @click="replaceImg"
            class="confirm"
            icon="plus"
            color="#994A1B"
            >确认修改</van-button
          >
        </van-uploader>
      </van-popup>
    </div>
    <div class="optionBox">
      <div class="myImg">
        <div class="img" @click="isShow = !isShow">
          <img :src="myImg" alt="" />
          <div class="imgBottom">修改头像<van-icon name="arrow" /></div>
        </div>
      </div>
      <div class="options">
        <van-field
          left-icon="debit-pay"
          disabled
          input-align="right"
          class="myId"
          v-model="myId"
          label="用户id"
        />
        <van-field
          left-icon="user-circle-o"
          @input="isChange"
          @focus="getValueOne"
          input-align="right"
          class="myName"
          v-model="myName"
          label="昵称"
        />
        <van-field
          left-icon="records"
          @input="isChange"
          @focus="getValueTwo"
          input-align="right"
          class="myDesc"
          v-model="myDesc"
          label="简介"
          type="textarea"
        />
      </div>
    </div>
    <div class="btn" v-show="isShowButton">
      <van-button @click="modify" type="primary" block color="#994A1B"
        >确认修改</van-button
      >
    </div>
  </div>
</template>

<script>
import "../assets/less/myOption.less";
import TopHeader from "../components/TopHeader";
export default {
    components:{
        TopHeader
    },
  data() {
    return {
      imgType: "",
      toUpdataImg: "",
      isShow: false,   //显示上传的弹出模块
      myId: "",
      myName: "",
      myDesc: "",
      myImg: "",
      select: 0, //改变的是那个
      changeValue: "", //改变值之前存值对比
      isShowButton: false, //是否打开修改,
      watchImg:""
    };
  },
  created() {
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
      url: "/findAccountInfo",
      method: "get",
      params: {
        appkey: this.appkey,
        tokenString,
      },
    }).then((res) => {
      //   console.log("res", res);
      if (res.data.code == "B001") {
        let data = res.data.result[0];
        this.myId = data.userId;
        this.myName = data.nickName;
        this.myDesc = data.desc;
        this.myImg = data.userImg;
        this.$toast.clear();
      }
    });
  },

  methods: {
    base64ToBlob ({b64data = '', contentType = '', sliceSize = 512} = {}) {
      return new Promise((resolve, reject) => {
        // 使用 atob() 方法将数据解码
        let byteCharacters = atob(b64data);
        let byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          let slice = byteCharacters.slice(offset, offset + sliceSize);
          let byteNumbers = [];
          for (let i = 0; i < slice.length; i++) {
              byteNumbers.push(slice.charCodeAt(i));
          }
          // 8 位无符号整数值的类型化数组。内容将初始化为 0。
          // 如果无法分配请求数目的字节，则将引发异常。
          byteArrays.push(new Uint8Array(byteNumbers));
        }
        let result = new Blob(byteArrays, {
          type: contentType
        })
        result = Object.assign(result,{
          // jartto: 这里一定要处理一下 URL.createObjectURL
          preview: URL.createObjectURL(result),
          name: `图片示例.png`
        });
        resolve(result)
      })
   },

    // 修改昵称
    modify() {
      let tokenString = this.$cookies.get("tokenString");
      if (!tokenString) {
        this.$toast("token过期了，请重新登录");
        this.$router.push({
          name: "Login",
        });
        return;
      }
      this.$toast.loading({
        message: "修改中。。。",
        forbidClick: true,
        duration: 0,
      });
      if (this.select == 1) {
           this.$axios({
            url: "/updateNickName",
            method: "post",
            data: {
                appkey: this.appkey,
                tokenString,
                nickName:this.myName
            },
            }).then(res=>{
                this.$toast.clear();
                console.log(res);
                if(res.data.code=="C001"){
                    this.myName=res.data.nickName;
                    this.$toast(res.data.msg);
                    this.isShowButton=false;
                }else{
                    this.$toast(res.data.result);
                }
            })
      }else if(this.select == 2){
           this.$axios({
            url: "/updateDesc",
            method: "post",
            data: {
                appkey: this.appkey,
                tokenString,
                desc:this.myDesc
            },
            }).then(res=>{
                this.$toast.clear();
                console.log(res);
                if(res.data.code=="D001"){
                    this.myDesc=res.data.desc;
                    this.$toast(res.data.msg);
                    this.isShowButton=false;
                }else{
                    this.$toast(res.data.result);
                }
            })
      }
     
        
      
    },
    replaceImg() {

      //    console.log(this.toUpdataImg);
      this.toUpdataImg = this.toUpdataImg.split(",")[1];
      // console.log(this.toUpdataImg);
      this.isShow = false;
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
        url: "/updateAvatar",
        method:"post",
        data: {
          appkey: this.appkey,
          tokenString,
          imgType: this.imgType.split("/")[1],
          serverBase64Img: this.toUpdataImg,
        },
      })
        .then((res) => {
          console.log("res", res);
          if (res.data.code == "H001") {
            this.$toast(res.data.msg);
            this.$toast.clear();
            this.myImg = res.data.userImg;
          } else {
            this.$toast(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    afterRead(file) {
      this.toUpdataImg = file.content;
      let toUpdataImg=file.content;
      toUpdataImg=toUpdataImg.split(',')[1];
      let imgFile=this.base64ToBlob(toUpdataImg);
       this.base64ToBlob({b64data: toUpdataImg, contentType: 'image/png'}).then(res => {
        this.watchImg=res.preview
    })
    },
    back() {
      this.$router.go(-1);
    },
    getValueOne(e) {
      this.select = 1;
      this.changeValue = e.target.value;
    },
    getValueTwo(e) {
      this.select = 2;
      this.changeValue = e.target.value;
    },
    isChange(value) {
      if (value != this.changeValue) {
        this.isShowButton = true;
      } else {
        this.isShowButton = false;
      }
    },
  },
};
</script>
