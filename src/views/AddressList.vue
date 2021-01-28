<template>
  <div class="addressList">
    <div class="addressListHeader" @click="add">
      <van-nav-bar left-arrow>
        <template #left>
          <div class="addressListNavLeft" @click="back">
            <van-icon name="arrow-left" size="20" color="#98491B" />
          </div>
        </template>
        <template #title>
          <div class="addressListTitle">地址列表</div>
        </template>
        <template #right>
          <div
            class="addressAdd"
            @click="jumpNewAddress"
            v-if="!fromSettlement"
          >
            添加新地址
            <van-icon name="arrow" color="#98491B" size="20" />
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="addressListBox">
      <van-address-list
        v-if="list[0].aid"
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        :add-button-text="fromSettlement ? '确认收货地址' : '新增地址'"
        @edit="jumpEdit"
        :switchable="fromSettlement"
        @add="toggleButton(chosenAddressId)"
      />
    </div>
  </div>
</template>
<script>
import "../assets/less/addressList.less";
import { mapMutations } from "vuex";
export default {
  methods: {
    add(){
      console.log(this.list);
    },
    ...mapMutations(["changeDefaultAddress"]),
    back() {
      this.$router.go(-1);
    },
    jumpNewAddress() {
      //组合键,如果从订单页面去到地址页面，这按钮是用来选择指定的地址，反之，去到新增地址
      this.$router.push({
        name: "Address",
      });
    },
    toggleButton(aid) {
      if (this.fromSettlement) {
        let deAddress = {}; //选择的默认地址，传给全局变量
        deAddress = this.list.filter((v) => {
          if (v.aid == aid) {
            return true;
          } else {
            false;
          }
        });
        this.changeDefaultAddress(deAddress);

        this.$router.go(-1);
      } else {
        this.$router.push({
          name: "Address",
        });
      }
    },
    jumpEdit({ aid }) {
      this.$router.push({
        name: "Address",
        params: {
          aid,
        },
      });
    },
  },
  data() {
    return {
      fromSettlement: false,
      chosenAddressId: 1,
      list: [{ id: 1 }],
    };
  },

  created() {
    let reSettlemenetAddress = this.$route.params.allAddress; //从我的订单的页面传回来的地址;
    if (reSettlemenetAddress) {
      this.fromSettlement = true;
      if (!reSettlemenetAddress.aid) {
        let token = this.$cookies.get("tokenString");
        if (!token) {
          return;
        }
        this.$axios({
          method: "get",
          url: "/findAddress",
          params: {
            appkey: this.appkey,
            tokenString: token,
          },
        }).then(res => {

          if (res.data.code == 20000) {
            reSettlemenetAddress=res.data.result;
            this.list = reSettlemenetAddress.map((v) => {
              v.address = v.city + " " + v.county + " " + v.addressDetail;
                v.id = v.aid;
              return v;
            });
            this.chosenAddressId = this.list[0].id;
            console.log("LIst2",this.list);
          }
        });
        return;
      }
    }
    let token = this.$cookies.get("tokenString");
    if (!token) {
      return;
    }
    this.$axios({
      method: "get",
      url: "/findAddress",
      params: {
        appkey: this.appkey,
        tokenString: token,
      },
    }).then((res) => {
      if (res.data.code == 20000) {
        this.$toast(res.data.msg);
        let data = res.data.result;
        if(data.length==0){
          return ;
        }
        data.map((v) => {
            v.address = v.city + " " + v.county + " " + v.addressDetail;
            v.id = v.aid;
            return v;
        });
        
        this.list = data;
        this.chosenAddressId = this.list[0].id;
      } else {
        this.$toast(res.data.msg);
        // console.log(res);
      }
    });
  },
};
</script>

