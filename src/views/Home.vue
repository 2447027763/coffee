<template>
  <div class="home">
    <div class="swipe">
      <div class="postion">
        <span
          ><svg
            t="1611038459437"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1960"
            width="200"
            height="200"
          >
            <path
              d="M508.44 2C274.12 2 81.76 194.36 81.76 432.18c0 52.46 17.49 108.42 45.47 171.37 31.48 62.95 76.94 129.4 129.4 199.35 38.47 45.47 80.44 90.93 118.91 132.9l38.47 38.47C421 981.26 428 984.76 428 988.26c41.97 41.97 111.92 41.97 150.39 0l13.99-13.99 38.47-38.47c41.97-41.97 80.44-87.43 118.91-132.9 55.96-66.45 101.42-136.4 129.4-199.35 31.48-62.95 45.47-118.91 45.47-171.37C935.12 194.36 742.77 2 508.44 2z m318.14 572.51c-27.14 57.68-67.86 118.75-122.14 183.21-37.32 44.11-74.64 88.21-111.96 125.53l-37.32 37.32-13.57 13.57c-20.36 20.36-54.29 20.36-74.64 0l-13.57-13.57-37.32-37.32c-37.32-40.71-78.03-81.43-111.96-125.53-50.88-64.46-91.61-125.52-122.14-183.21-27.14-54.29-40.71-101.78-40.71-142.5 0-203.57 162.86-366.43 363.03-366.43s363.03 162.85 363.03 366.43c-0.03 40.71-13.6 88.21-40.73 142.5zM508.44 236.33c-104.92 0-185.36 83.94-185.36 188.86s83.94 188.86 185.36 188.86S693.8 530.11 693.8 425.18s-80.44-188.85-185.36-188.85z m-0.38 320.76c-70.34 0-127.28-56.95-127.28-130.63s56.95-130.63 127.28-130.63 127.28 56.95 127.28 130.63-56.94 130.63-127.28 130.63z"
              fill="#FFFFFF"
              p-id="1961"
            ></path></svg
        ></span>
        <input type="text" value="吉山校区" />
        <span 
          ><svg
            t="1611038561100"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2989"
            width="200"
            height="200"
          >
            <path
              d="M731.7 475.1L370.6 80.8c-19.7-21.5-53-22.9-74.4-3.3-21.5 19.7-22.9 53-3.3 74.4l328.6 358.8-328.3 359.8c-19.6 21.5-18.1 54.8 3.4 74.4 21.5 19.6 54.8 18.1 74.4-3.4l360.5-394.9c0.7-0.8 1.5-1.7 2.1-2.5 16.4-19.9 16.1-49.4-1.9-69z"
              fill="#FFFFFF"
              p-id="2990"
            ></path></svg
        ></span>
      </div>
      <div class="search" @click="jumpSearch">
        <svg
          t="1611039548513"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4053"
          width="200"
          height="200"
        >
          <path
            d="M480.071312 702.877305c-7.090489 0-14.06125-0.314155-20.907169-0.943488-28.380374-2.606361-54.631248-10.593266-78.021981-23.735587-40.074717-22.51683-57.772798-52.31039-58.506509-53.570079-2.848884-4.881171-1.201361-11.146874 3.679809-13.994736 4.871961-2.843768 11.127432-1.207501 13.982456 3.65525 0.249687 0.419556 16.298198 26.953885 51.834552 46.604434 47.832402 26.448372 106.644879 28.664853 174.800142 6.588045 5.377474-1.738597 11.148921 1.205455 12.889565 6.581905s-1.205455 11.146874-6.581905 12.889565C540.539498 697.54281 509.29796 702.877305 480.071312 702.877305z"
            p-id="4054"
            fill="#FFFFFF"
          ></path>
          <path
            d="M886.950136 897.583822c-2.648316 0-5.29254-1.02126-7.296173-3.057639L709.233572 721.28556c-3.963265-4.02978-3.910053-10.507308 0.118704-14.470573 4.02978-3.965312 10.507308-3.90903 14.471596 0.11768l170.420391 173.240623c3.963265 4.02978 3.910053 10.509355-0.118704 14.47262C892.132158 896.604518 889.540124 897.583822 886.950136 897.583822z"
            p-id="4055"
            fill="#FFFFFF"
          ></path>
          <path
            d="M472.20618 828.28655c-46.64025 0-91.889827-9.287527-134.493134-27.607778-41.133839-17.685801-78.0711-43.00035-109.786429-75.238588-65.200978-66.279542-101.109816-154.387229-101.109816-248.093425 0-93.704149 35.907815-181.809789 101.109816-248.086262 31.715329-32.238238 68.65259-57.552787 109.787452-75.238588 42.603307-18.318204 87.852884-27.605731 134.493134-27.605731 46.6556 0 91.917456 9.287527 134.526903 27.605731 41.138956 17.685801 78.081333 42.999326 109.798708 75.238588 65.198931 66.272379 101.105722 154.37802 101.105722 248.087285 0 4.39203-0.079818 8.989745-0.237407 13.664208-0.191358 5.64865-4.946662 10.086729-10.571776 9.882068-5.649674-0.190335-10.073426-4.924149-9.882068-10.5728 0.149403-4.445242 0.226151-8.809643 0.226151-12.973476 0-182.219111-145.778154-330.464457-324.96521-330.464457-179.163519 0-324.923254 148.245346-324.923254 330.464457 0 182.224228 145.759735 330.473667 324.923254 330.473667 81.524758 0 159.491481-30.827099 219.538065-86.800925 2.232854-2.078335 4.422729-4.177136 6.516414-6.244214 4.019547-3.971451 10.498098-3.931542 14.471596 0.092098 3.970428 4.021593 3.929496 10.501168-0.093121 14.47262-2.234901 2.206248-4.571109 4.445242-6.945179 6.655584C641.850905 795.509029 558.928311 828.28655 472.20618 828.28655z"
            p-id="4056"
            fill="#FFFFFF"
          ></path>
        </svg>
      </div>
      <van-swipe :autoplay="3000" @change="onChange">
        <van-swipe-item v-for="(image, index) in bannerImages" :key="index">
          <img class="bannerImg" v-lazy="image.bannerImg" @click="jumpDetailed(image.pid)" />
        </van-swipe-item>
        <template #indicator>
          <div class="bannerDot">
            <span
              v-for="(v, k) in bannerImages"
              :key="k"
              :class="{ active: currentIndex == k }"
            ></span>
          </div>
        </template>
      </van-swipe>
    </div>
    <div class="hotSell">
      <van-nav-bar>
        <template #right>
          <div class="layout">
            <router-link tag="i" @click="columns = 1" to="/home/hotSellItemOne">
            <div>
              <img
                v-show="columns == 1"
                src="../assets/images/one-columns-active.png"
                alt=""
              />
              <img
                v-show="columns == 2"
                src="../assets/images/one-columns-inactive.png"
                alt=""
              />
            </div>
              
            </router-link>
            <router-link tag="i" @click="columns = 2" to="/home/hotSellItemTwo">
            <div>
               <img
                v-show="columns == 2"
                src="../assets/images/columns-active.png"
                alt=""
              />
              <img
                v-show="columns == 1"
                src="../assets/images/columns-inactive.png"
                alt=""
              />
            </div>
             
            </router-link>
          </div>
        </template>
        <template #left>
          <h1 class="hotTile">热卖推荐</h1>
        </template>
      </van-nav-bar>
      <router-view :hotSellList="hotSellList"></router-view>
    </div>
  </div>
</template>

<script>
import "../assets/less/home.less";
import {mapState,mapMutations} from "vuex"
export default {
  name: "Home",
  created() {
    
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$axios("/banner?appkey=" + vm.appkey).then((datas) => {
        vm.bannerImages = datas.data.result;
      });
      vm.$axios({
        url: "/typeProducts",
        method: "get",
        params: {
          appkey: vm.appkey,
          key: "isHot",
          value: 1,
        },
      }).then((res) => {
        vm.hotSellList = res.data.result;
        // console.log(vm.hotSellList);
      });
    });
  },
  components: {},
  data() {
    return {
      columns: 1,
      currentIndex: 0,
      bannerImages: [], // 背景图列表
      hotSellList: [], //热门推荐列表
    };
  },
  computed:{
    ...mapState(["shoppingCarCount","isLoadingCarCount"])
  },
  methods: {
    ...mapMutations(["changeShoppingCarCount","changeIsLoadingCarCount"]),
    jumpDetailed(pid) {
      this.$router.push({
        name: "Detailed",
        params: {
          pid,
        },
      });

    },
    jumpSearch(){
      this.$router.push({
        name:"MySearch"
      })
    },
    onChange(index) {
      this.currentIndex = index;
    },
  },
};
</script>

