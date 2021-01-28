<template>
  <div id="app">
    <router-view />
    <TabNav></TabNav>
  </div>
</template>

<script>
import TabNav from "./components/TabNav";
import {mapState,mapMutations} from "vuex";

export default {
  components: {
    TabNav,
  },
  computed:{
    ...mapState(["shoppingCarCount","isLoadingCarCount"])
  },
  methods:{
    ...mapMutations(["changeShoppingCarCount","changeIsLoadingCarCount"])
  },
  created() {
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
      if (res.data.code == 5000) {
        
        this.changeShoppingCarCount(res.data.result.length);
        this.changeIsLoadingCarCount(true);
      } else {
        this.$toast(res.data.msg);
        // console.log(res);
      }
    });

  },
};
</script>
<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.space {
  width: 100%;
  height: 50px;
}
</style>
