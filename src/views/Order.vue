<template>
  <div class="order">
    <div class="orderSearch" @click="jumpSearch">
      <van-search
        v-model="searchValue"
        shape="round"
        background="#994A1B"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="hotSell">今日特价</div>
    <div class="banner">
      <van-swipe :loop="false" :width="187.5">
        <van-swipe-item v-for="v in todayList" :key="v.id">
          <div class="item" @click="jumpDetailed(v.pid)">
            <img :src="v.largeImg" alt="" />
          </div>
        </van-swipe-item>

        <template #indicator>
          <div></div>
        </template>
      </van-swipe>
    </div>
    <div class="orderBox" route>
      <div class="leftTypeNav">
        <div
          @click="changeItem(v.keys,v.type,k)"
          v-for="(v,k) in leftType"
          :key="v.id"
          class="leftTypeItem"
          :style="currentIndex==k?'background: #F6F0F3 !important;box-shadow: none !important;':''"
        >
          <div class="leftType">
            <div class="img" >
              <img :src="v.iconImg" alt="" />
            </div>
            {{ v.typeDesc }}
          </div>
        </div>
      </div>
      <div class="rightOrder">
        <OrderItem :keys="keys" :type="type" :key="type"></OrderItem>
        <!-- <router-view :key="jumpKey"></router-view> -->
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/order.less";
import OrderItem from "../components/OrderItem.vue"
export default {
  data() {
    return {
      searchValue: "",
      todayList: [], //今日特价列表
      leftType: [], //左边的菜单名字
      keys:"isHot",
      type:"1",
      currentIndex:0

    };
  },
  components:{
    OrderItem
  },
  methods: {
    jumpSearch(){
      this.$router.push({
        name:"MySearch"
      })
    },
    changeItem(keys,type,k){
      this.currentIndex=k;
      this.keys=keys;
      this.type=type;
    },
    jumpDetailed(pid) {
      this.$router.push({
        name: "Detailed",
        params: {
          pid,
        },
      });
    }
  },
  computed: {
    jumpKey() {
      return this.$route.path + Math.random();
    },
  },
  created() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });
    this.$axios({
      method: "get",
      url: "/typeProducts",
      params: {
        appkey: this.appkey,
        key: "isHot",
        value: "1",
      },
    }).then((res) => {
      if (res.data.code == 500) {
        this.todayList = res.data.result;
      }
    });
    this.$axios({
      url: "/type",
      params: {
        appkey: this.appkey,
      },
    }).then((res) => {
      if (res.data.code == 400) {
        this.$toast.clear();

        let hotList = {
          id: 0,
          keys: "isHot",
          type: 1,
          typeDesc: "热门",
        };
        res.data.result.map((v) => {
          v.keys = "type";
          return v;
        });
        this.leftType = [hotList, ...res.data.result];
        let imgList = [
          require("../assets/images/order-hotCoffee.png"),
          require("../assets/images/order-latte.png"),
          require("../assets/images/order-coffee.png"),
          require("../assets/images/order-rena_ice.png"),
          require("../assets/images/order-fruit-tea.png"),
        ];
        for (let i in this.leftType) {
          this.leftType[i].iconImg = imgList[i];
        }
      }
    });
  },
};
</script>
