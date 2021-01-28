<template>
  <div class="login">
    <Nav></Nav>
    <div class="loginBox">
      <div class="title">找回密码!</div>
      <div class="titleSub">Find password</div>
      <div class="usersInput">
        <van-field v-show="!isNext"
          v-model="passwordInfo.email"
          label="邮箱"
          placeholder="邮箱"
        />
        <van-field v-show="!isNext"
          v-model="passwordInfo.code"
          type="text"
          label="验证码"
          placeholder="验证码(6个字符)"
        >
          <template #button>
              <van-button size="small" color="#994A1B" @click="sendCode">发送验证码</van-button>
          </template>
        </van-field>
        <van-field v-show="isNext"
          v-model="loginInfo.userValue"
          label="电话"
          placeholder="请输入电话"
        />
        <van-field v-show="isNext"
          v-model="loginInfo.passwordValue"
          :type="inputType ? 'password' : 'text'"
          :right-icon="inputType ? 'closed-eye' : 'eye-o'"
          @click-right-icon="inputType = !inputType"
          label="密码"
          placeholder="请输入密码"
        />
        
      </div>
      <div class="forget" @click="isHave"><span>已有账号，立即登录</span></div>

      <div class="btnLogin" @click="nextTo">
        <van-button round block color="#994A1B" >{{!isNext?"下一步":"提交"}}</van-button>
      </div>
      <div class="btnRegister" v-if="isNext" @click="back">
        <van-button round block>返回</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { utils } from "../assets/js/utils.js";
import "../assets/less/login.less";
import Nav from "../components/Nav";

export default {
  name: "Login",
  data() {
    return {
      loginInfo: {
        userValue: "",
        passwordValue: "",
      },
      passwordInfo: {
        email: "",
        code: "",
      },
      isNext: false,
      inputType: true,
    };
  },
  methods: {
    back(){
      this.isNext=!this.isNext;
      this.passwordInfo.email="";
      this.passwordInfo.code="";
      this.loginInfo.userValue="";
      this.loginInfo.passwordValue="";
    },
    nextTo(){
      if(!this.isNext){
        let p = {
          email: {
            value: this.passwordInfo.email,
            reg: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            msg: "请输入邮箱的正确地址",
          },
          code: {
            value: this.passwordInfo.code,
            reg: /\d{6,6}/,
            msg: "请写6个数字",
          },
        };
        if (!utils.vaildForm(p)) {
          return;
        }
        this.$toast.loading({
        message: "发送中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "post",
        url: "/checkValidCode",
        data: {
          appkey: this.appkey,
          validCode:this.passwordInfo.code
        },
      }).then(res=>{
        console.log(res);
        if(res.data.code=="K001"){
          this.isNext=true;
          this.$toast(res.data.msg);
        }else{
          this.$toast(res.data.msg);
        }
      })
        

      }else{
        let o = {
          userValue: {
            value: this.loginInfo.userValue,
            reg: /^1[3-9]\d{9}$/,
            msg: "请输入11位数字,1开头",
          },
          passwordValue: {
            value: this.loginInfo.passwordValue,
            reg: /^[A-Za-z]\w{5,15}$/,
            msg: "密码首字母开头，组合支持字母数字",
          },
        };
          if (!utils.vaildForm(o)) {
          return;
        }
        this.$toast.loading({
          message: "修改中...",
          forbidClick: true,
          duration: 0,
        });
        this.axios({
          method: "post",
          url: "/retrievePassword",
          data: {
            appkey: this.appkey,
            phone:this.loginInfo.userValue,
            password:this.loginInfo.passwordValue
          },
        }).then(res=>{
          
          if(res.data.code=="L001"){
            this.$toast.clear();
            this.$toast(res.data.msg);
            this.$router.push({
              name:"Login"
            })
          }else{
            this.$toast(res.data.msg);
          }
        })



      }
      
    },
    sendCode(){
        let q = {
          email: {
            value: this.passwordInfo.email,
            reg: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            msg: "请输入邮箱的正确地址",
          }
        };
        if (!utils.vaildForm(q)) {
          return;
        }

      this.$toast.loading({
        message: "发送中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "post",
        url: "/emailValidCode",
        data: {
          appkey: this.appkey,
          email:this.passwordInfo.email
        },
      }).then(res=>{
        console.log(res);
        if(res.data.code=="J001"){
          this.$toast.clear();
          this.$toast(res.data.msg);
        }else{
          this.$toast(res.data.msg);
        }
      })
    },
    isHave(){
      this.$router.push({
        name:"Login"
      })
    }
  },
  components: {
    Nav,
  },
};
</script>

