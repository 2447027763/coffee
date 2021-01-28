<template>
  <div class="login">
    <Nav></Nav>
    <div class="loginBox">
      <div class="title">欢迎回来!</div>
      <div class="titleSub">Please login to your accounts</div>
      <div class="usersInput">
        <van-field
          v-model="loginInfo.userValue"
          label="用户"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="loginInfo.passwordValue"
          :type="inputType ? 'password' : 'text'"
          :right-icon="inputType ? 'closed-eye' : 'eye-o'"
          @click-right-icon="inputType = !inputType"
          label="密码"
          placeholder="请输入密码"
        />
      </div>
      <div class="forget" @click="isForget"><span>忘记密码？</span></div>

      <div class="btnLogin" @click="loginReg">
        <van-button round block color="#994A1B">登录</van-button>
      </div>
      <div class="btnRegister" @click="isRegister">
        <van-button round block>注册</van-button>
      </div>
      <van-popup v-model="isOpen" position="bottom" class="register" closeable>
        <div class="usersInput">
          <van-field
            v-model="registerInfo.userValue"
            label="用户"
            placeholder="请输入用户名"
          />
          <van-field
            v-model="registerInfo.passwordValue"
            :type="inputType ? 'password' : 'text'"
            :right-icon="inputType ? 'closed-eye' : 'eye-o'"
            @click-right-icon="inputType = !inputType"
            label="密码"
            placeholder="请输入密码"
          />
          <van-field
            v-model="registerInfo.nickName"
            label="用户名"
            placeholder="请输入名字"
          />
          <div class="btnLogin">
            <van-button round block color="#994A1B" @click="registerReg"
              >注册</van-button
            >
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { utils } from "../assets/js/utils.js";
import "../assets/less/login.less";
import Nav from "../components/Nav";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Login",
  computed: {
    ...mapState(["isLoadingCarCount","shoppingCarCount"]),
  },
  data() {
    return {
      loginInfo: {
        userValue: "",
        passwordValue: "",
      },
      registerInfo: {
        userValue: "",
        passwordValue: "",
        nickName: "",
      },
      isOpen: false,
      inputType: true,
    };
  },
  methods: {
    ...mapMutations(["changeIsLoadingCarCount","changeShoppingCarCount"]),
    isForget(){
      this.$router.push({
        name:"FindPassword"
      })
    },
    isRegister() {
      this.isOpen = true;
    },
    loginReg() {
      this.changeIsLoadingCarCount(false);
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
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "post",
        url: "/login",
        data: {
          appkey: this.appkey,
          password: this.loginInfo.passwordValue,
          phone: this.loginInfo.userValue,
        },
      })
        .then((res) => {
          console.log(res);
          this.$toast.clear();
          if (res.data.code == 200) {
            this.$toast({
              message: res.data.msg,
              duration: 3000,
            });
            this.isOpen = false;
            this.$cookies.set("tokenString", res.data.token, "1d");
            this.$toast("登录成功");
            this.getCarCount();
            this.$router.push({
              name: "Home",
            });
          } else {
            this.$toast({
              message: res.data.msg,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCarCount() {
      let token = this.$cookies.get("tokenString");
      if (!token) {
        return;
      }
      if (this.isLoadingCarCount) {
        return;
      }
      this.$axios({
        method: "get",
        url: "/findAllShopcart",
        params: {
          appkey: this.appkey,
          tokenString: token,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code == 5000) {
          this.changeShoppingCarCount(res.data.result.length);
          this.changeIsLoadingCarCount(true);
        } else {
          this.$toast(res.data.msg);
          // console.log(res);
        }
      });
    },
    registerReg() {
      let o = {
        userValue: {
          value: this.registerInfo.userValue,
          reg: /^1[3-9]\d{9}$/,
          msg: "请输入11位数字,1开头",
        },
        passwordValue: {
          value: this.registerInfo.passwordValue,
          reg: /^[A-Za-z]\w{5,15}$/,
          msg: "密码首字母开头，组合支持字母数字",
        },
        nickNam: {
          value: this.registerInfo.nickName,
          reg: /^[\u4e00-\u9fa5A-Za-z0-9]{2,10}$/,
          msg: "请输入2到10位汉字",
        },
      };
      if (!utils.vaildForm(o)) {
        return;
      }
      this.$toast.loading({
        message: "注册中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "post",
        url: "/register",
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          nickName: this.registerInfo.nickName,
          password: this.registerInfo.passwordValue,
          phone: this.registerInfo.userValue,
        },
      })
        .then((res) => {
          console.log(res);
          this.$toast.clear();
          if (res.data.code == 100) {
            this.$toast({
              message: res.data.msg,
              duration: 3000,
            });
            this.isOpen = false;
          } else {
            this.$toast({
              message: res.data.msg,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    Nav,
  },
};
</script>

