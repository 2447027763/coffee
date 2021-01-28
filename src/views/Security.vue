<template>
  <div class="security">
    <TopHeader>
      安全中心
    </TopHeader>
    <div class="securityBox">
      <van-cell title="修改密码" is-link @click="isShowRe = !isShowRe" />
      <van-cell title="注销账号" is-link @click="cancellation" />
    </div>
    <div class="rePassword">
      <van-popup
        v-model="isShowRe"
        closeable
        round
        position="bottom"
        :style="{ height: '50%' }"
      >
        <template>
          <div class="passwordBox">
            <h3>修改密码</h3>
            <div class="usersInput">
              <van-field
                v-model="passwordInfo.oldPassword"
                :type="inputTypeOne ? 'password' : 'text'"
                :right-icon="inputTypeOne ? 'closed-eye' : 'eye-o'"
                @click-right-icon="inputTypeOne = !inputTypeOne"
                label="旧密码"
                placeholder="请输入密码"
              />
              <van-field
                v-model="passwordInfo.newPassword"
                :type="inputTypeTwo ? 'password' : 'text'"
                :right-icon="inputTypeTwo ? 'closed-eye' : 'eye-o'"
                @click-right-icon="inputTypeTwo = !inputTypeTwo"
                label="新密码"
                placeholder="请输入密码"
              />
              <div class="btnSubmit">
                <van-button round block color="#994A1B" @click="rePasswordReg"
                  >提交</van-button
                >
              </div>
            </div>
          </div>
        </template>
      </van-popup>
    </div>
    <div class="bottomBotton">
      <van-button color=" #994A1B" block  @click="signOut"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import TopHeader from "../components/TopHeader";
import { utils } from "../assets/js/utils.js";
import "../assets/less/security.less";
import { Dialog } from "vant";
export default {
  components: {
    TopHeader,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      isShowRe: false,
      inputTypeOne: true,
      inputTypeTwo: true,
      passwordInfo: {
        oldPassword: "",
        newPassword: "",
      },
    };
  },
  methods: {
    signOut() {
        console.log("触发");
      let tokenString = this.$cookies.get("tokenString");
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
        console.log(res);
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
          this.$toast({
            message: res.data.msg,
            duration: 3000,
          });
        }
      });
    },
    cancellation() {
      Dialog.confirm({
        title: "注销账号",
        message: "是否确认注销账号，一旦注销无法恢复",
      }).then(() => {
        let tokenString = this.$cookies.get("tokenString");
        this.$toast.loading({
          message: "注销中...",
          forbidClick: true,
          duration: 0,
        });
        this.axios({
          method: "post",
          url: "/destroyAccount",
          data: {
            tokenString,
            appkey: this.appkey,
          },
        }).then((res) => {
          console.log(res);
          this.$toast.clear();
          if (res.data.code == "G001") {
            this.$toast({
              message: res.data.msg,
              duration: 3000,
            });
            this.$cookies.clear();
            this.$router.push({
              name: "Login",
            });
          } else {
            this.$toast({
              message: res.data.msg,
              duration: 3000,
            });
          }
        });
      });
    },
    rePasswordReg() {
      let o = {
        oldPassword: {
          value: this.passwordInfo.oldPassword,
          reg: /^[A-Za-z]\w{5,15}$/,
          msg: "密码首字母开头，组合支持字母数字",
        },
        newPassword: {
          value: this.passwordInfo.newPassword,
          reg: /^[A-Za-z]\w{5,15}$/,
          msg: "密码首字母开头，组合支持字母数字",
        },
      };
      if (!utils.vaildForm(o)) {
        return;
      }
      let tokenString = this.$cookies.get("tokenString");
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "post",
        url: "/updatePassword",
        data: {
          tokenString,
          appkey: this.appkey,
          password: this.passwordInfo.newPassword,
          oldPassword: this.passwordInfo.oldPassword,
        },
      })
        .then((res) => {
          console.log(res);
          this.$toast.clear();
          if (res.data.code == "E001") {
            this.$toast({
              message: res.data.msg,
              duration: 3000,
            });
            this.$cookies.clear();
            this.$router.push({
              name: "Login",
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
    backLogin() {},
  },
};
</script>

