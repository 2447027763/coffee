<template>
  <div class="settlement">
    <TopHeader> 订单结算 </TopHeader>
    <div class="settlementBox">
      <div class="addressBox">
        <div class="addressBoxSelect" @click="selectAddress">
          选择地址<van-icon name="arrow" color="#994A1B" />
        </div>
        <div class="addressContent">
          <div class="addressTop">
            <span class="addressName">{{
              defaultAddress.name ? defaultAddress.name : "地址为空，请新增地址"
            }}</span>
            <span class="addressPhone">{{ defaultAddress.tel }}</span>
            <span
              class="addressIsDefault"
              v-show="defaultAddress.isDefault == 1"
              >默认</span
            >
          </div>
          <div class="addressBottom" v-show="defaultAddress.city">
            {{
              defaultAddress.city +
              "  " +
              defaultAddress.county +
              "  " +
              defaultAddress.addressDetail
            }}
          </div>
        </div>
      </div>
      <div class="midBox"></div>
      <div class="shoppingCarBox">
        <div class="shoppingCarTitle">订单信息</div>
        <div class="shoppingCarItems">
          <SettlementItems :allProduct="allProduct"></SettlementItems>
        </div>
        <div class="shoppingCarCount">
          <div class="settlementTime">1970-01-01 00:00:00</div>
          <div class="settlementCount">
            <div class="num">共计 {{ totalCount }} 件</div>
            <div class="totalPrice">合计 &yen; {{ totalPrice }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="settlementButton" @click="submitOrder">
      <van-button color="#994A1B" block>立即结算</van-button>
    </div>
  </div>
</template>

<script>
import "../assets/less/settlement.less";
import TopHeader from "../components/TopHeader";
import SettlementItems from "../components/SettlementItems";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    TopHeader,
    SettlementItems,
  },
  props: ["sidsList"],
  data() {
    return {
      allAddress: [],
      allProduct: [],
    };
  },
  created() {
    let sids = this.sidsList.split("-");
    // console.log(sids);
    this.allProduct = this.sidsList;
    let token = this.$cookies.get("tokenString");
    if (!token) {
      return;
    }
    this.$axios({
      method: "get",
      url: "/commitShopcart",
      params: {
        appkey: this.appkey,
        tokenString: token,
        sids: JSON.stringify(sids),
      },
    }).then((res) => {
      if (res.data.code == 50000) {
        this.allProduct = res.data.result;
        
        let data = this.defaultAddress;
        if (this.defaultAddress.length) {
          this.changeDefaultAddress(data[0]);
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
            this.allAddress = res.data.result;
            let flag = false;
            res.data.result.forEach((v) => {
              flag = true;
              if (v.isDefault == 1) {
                this.changeDefaultAddress(v);
                return;
              }
            });
            if (flag) {
              this.changeDefaultAddress(res.data.result[0]);
            } else {
              this.changeDefaultAddressName("无地址，快去添加吧");
            }
            // console.log(this.defaultAddress);
          } else {
            this.$toast(res.data.msg);
            // console.log(res);
          }
        });
      } else {
        this.$toast(res.data.msg);
      }
    });
  },
  computed: {
    ...mapState(["defaultAddress","shoppingCarCount","isLoadingCarCount"]),
    totalCount() {
      let num = 0;
      for(let i in this.allProduct){
        num+=this.allProduct[i].count;
      }
      return num;
      }
      
    ,
    totalPrice() {
      let price = 0;
      for(let i in this.allProduct){
        price+=this.allProduct[i].count*this.allProduct[i].price;
      }
      return price;
    }
  },
  methods: {
    ...mapMutations(["changeDefaultAddress", "changeDefaultAddressName","changeShoppingCarCount","changeIsLoadingCarCount"]),
    selectAddress() {
      if (this.defaultAddress.aid) {
        this.$router.push({
          name: "AddressList",
          params: {
            allAddress: this.allAddress,
          },
        });
      } else {
        this.$router.push({
          name: "Address",
        });
      }
    },
    submitOrder() {
      let sids = [];
      this.allProduct.forEach((v) => {
        sids.push(v.sid);
      });
      // console.log(sids);
      let token = this.$cookies.get("tokenString");
      if (!token) {
        this.$toast("token过期了,请重新登录");
        return;
      }
      this.$axios({
        method: "post",
        url: "/pay",
        data: {
          appkey: this.appkey,
          tokenString: token,
          sids: JSON.stringify(sids),
          phone: this.defaultAddress.tel,
          address:
            this.defaultAddress.city +
            "  " +
            this.defaultAddress.county +
            "  " +
            this.defaultAddress.addressDetail,
          receiver: this.defaultAddress.name,
        },
      }).then((res) => {
        if (res.data.code == 60000) {
          this.$toast(res.data.msg);
          this.$router.push({
            name:"ShoppingCar"
          });
        } else {
          this.$toast(res.data.msg);
          // console.log(res);
        }
      });
    },
  },
};
</script>

