<template>
  <div class="address">
    <div class="addressHeader">
      <van-nav-bar left-arrow>
        <template #left>
          <div class="addressNavLeft" @click="back">
            <van-icon name="arrow-left" size="20" color="#98491B" />
          </div>
        </template>
        <template #title>
          <div class="addressTitle">
            {{ $route.params.aid ? "修改地址" : "新增地址" }}
          </div>
        </template>
        <template #right>
          <div
            v-if="$route.params.aid"
            class="addressNavRight"
            @click="delectAddress"
          >
            删除
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="addressBox">
      <van-address-edit
        :address-info="addressInfo"
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="saveAddress"
      />
    </div>
  </div>
</template>

<script>
import "../assets/less/address.less";
import area from "../assets/js/area.js";
import { Dialog } from 'vant';
export default {
  data() {
    return {
      areaList: area,
      addressInfo: {},
    };
  },
  created() {
    this.getAddressById();
  },
  component:{
    [Dialog.Component.name]: Dialog.Component
  },
  methods: {
    getAddressById() {
      let token = this.$cookies.get("tokenString");
      if (!token) {
        return;
      }
      if (!this.$route.params.aid) {
        return;
      }
      this.$axios({
        method: "get",
        url: "/findAddressByAid",
        params: {
          appkey: this.appkey,
          tokenString: token,
          aid: this.$route.params.aid,
        },
      }).then((res) => {
        if (res.data.code == 40000) {
          res.data.result[0].isDefault = !!res.data.result[0].isDefault;
          this.addressInfo = res.data.result[0];
        } else {
          this.$toast(res.data.msg);
          // console.log(res);
        }
      });
    },
    delectAddress() {
      Dialog.confirm({
      title: "警告",
      message: '是否删除地址，删除不可逆',
    })
      .then(() => {
           let token = this.$cookies.get("tokenString");
            if (!token) {
              return;
            }
            if (!this.$route.params.aid) {
              return;
            }
            this.$axios({
              method: "post",
              url: "/deleteAddress",
              data: {
                appkey: this.appkey,
                tokenString: token,
                aid: this.$route.params.aid,
              },
            }).then((res) => {

              if (res.data.code == 10000) {
              this.$toast(res.data.msg);
                this.$router.go(-1);
              } else {
                this.$toast(res.data.msg);
                // console.log(res);
              }
            });
      })
      .catch(() => {
        return ;
      });
     
    },
    saveAddress(content) {
      let isChange = false;
      let token = this.$cookies.get("tokenString");
      if (!token) {
        return;
      }

      let contentList = { ...content };
      for (let i in contentList) {
        if (i == "country") continue;
        if (contentList[i] != this.addressInfo[i]) {
          isChange = true;
          break;
        }
      }
      if (!isChange) {
        console.log("触发打断");
        return;
      }
      contentList.isDefault = Number(contentList.isDefault);
      if (this.$route.params.aid) {
        this.$axios({
          method: "post",
          url: "/editAddress",
          data: {
            ...contentList,
            appkey: this.appkey,
            tokenString: token,
          },
        }).then((res) => {
          console.log(res);
          if (res.data.code == 30000) {
            this.$toast(res.data.msg);
            this.getAddressById();
          } else {
            this.$toast(res.data.msg);
            // console.log(res);
          }
        });
        return;
      }
      this.$axios({
        method: "post",
        url: "/addAddress",
        data: {
          ...contentList,
          appkey: this.appkey,
          tokenString: token,
        },
      }).then((res) => {
        if (res.data.code == 9000) {
          this.$toast(res.data.msg);
          this.$router.go(-1);
        } else {
          this.$toast(res.data.msg);
          // console.log(res);
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

