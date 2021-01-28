<template>
  <div class="tabNav" v-show="$route.meta.showNav">
    <van-tabbar route v-model="active" active-color="#994A1B" inactive-color="#CDCDCD">
      <van-tabbar-item name="home" to="/home/hotSellItemOne">
        <span class="tabNavName">首页</span>
        <template #icon="props">
          <img class="tabNavIcon" :src="props.active ? homeIcon.active : homeIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="order" to="/order">
        <span class="tabNavName">菜单</span>
        <template #icon="props">
          <img class="tabNavIcon" :src="props.active ? orderIcon.active : orderIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item :badge="shoppingCarCount<=0?'':shoppingCarCount" name="shoppingCar" to="/shoppingCar">
        <span class="tabNavName">购物车</span>
        <template #icon="props" >
          <img class="tabNavIcon" :src="props.active ? shoppingCarIcon.active : shoppingCarIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="my" to="/my">
        <span class="tabNavName">我的</span>
        <template #icon="props" >
          <img class="tabNavIcon" :src="props.active ? myIcon.active : myIcon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
  
</template>

<script>
import "../assets/less/tabNav.less"
import {mapState} from "vuex"
export default {
  computed:{
    ...mapState(["shoppingCarCount"])
  },
  data(){
    return {
      active:"home",
      homeIcon:{
        active:require("../assets/images/home-acitve.png"),
        inactive:require("../assets/images/home-inacitve.png")
      },
       orderIcon:{
        active:require("../assets/images/order-active.png"),
        inactive:require("../assets/images/order-inactive.png")
      },
       shoppingCarIcon:{
        active:require("../assets/images/shoppingCar-active.png"),
        inactive:require("../assets/images/shoppingCar-inactive.png")
      },
       myIcon:{
        active:require("../assets/images/my-active.png"),
        inactive:require("../assets/images/my-inactive.png")
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>