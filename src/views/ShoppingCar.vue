<template>
  <div class="shoppingCar">
    <div class="carHeader">
      <van-nav-bar>
        <template #title>
          <div class="carTitle">购物车(1)</div>
        </template>
        <template #right>
          <div class="carOption" @click="isEdit = !isEdit">
            {{ isEdit ? "完成" : "编辑" }}
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="carList">
      <van-list
        loading-text="加载中。。。"
        offset="100"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoadMore"
      >
        <van-swipe-cell
          v-for="(v, k) in carList"
          :key="v.sid"
          :disabled="!isEdit ? false : true"
        >
          <div class="carItem">
            <div class="carCheckbox">
              <van-checkbox
                @click="isAllSelect"
                icon-size="30px"
                v-model="v.isChecked"
                checked-color="#98491B"
              ></van-checkbox>
            </div>
            <div class="carSamllImg">
              <img :src="v.small_img" />
            </div>
            <div class="carMessage">
              <div class="carName">{{ v.name }}</div>
              <div class="carEnName">{{ v.enname }}</div>
              <div class="carDesc">{{ v.rule }}</div>
            </div>
            <div class="carCount">
              <div class="carPrice">
                &yen;<span>{{ v.price }}</span>
              </div>
              <!-- 加减按钮 -->
              <van-stepper
                @change="setCarNum(v.sid, v.count)"
                v-model="v.count"
                theme="round"
                button-size="22"
                disable-input
              />
            </div>
          </div>
          <template #right>
            <van-button
              square
              type="danger"
              text="删除"
              @click="removeShoppingCar([v.sid], k)"
            />
          </template>
        </van-swipe-cell>
      </van-list>
    </div>
    <div class="shoppingCarSubimt">
      <van-submit-bar v-show="!isEdit" :price="total" button-text="立即结算" @submit="pay">
        <van-checkbox @click="selcetAllCheckbox" v-model="allChecked"
          >全选</van-checkbox
        >
      </van-submit-bar>
      <van-submit-bar
        v-show="isEdit"
        button-text="删除全选"
        @submit="removeAllSelect"
      >
        <van-checkbox @click="selcetAllCheckbox" v-model="allChecked"
          >全选</van-checkbox
        >
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import "../assets/less/shoppingCar.less";
import {mapState,mapMutations} from "vuex";
export default {
  data() {
    return {
      allChecked: false,
      isEdit: false,
      carAllList: [], //  全部显示的列表
      carList: [], //目前显示的列表
      loading: true,
      finished: false,
      start: 0,
      listLength: 8,
      total:0,
    };
  },
  computed:{
     ...mapState(["shoppingCarCount","isLoadingCarCount"])
  },
  methods: {

    ...mapMutations(["changeShoppingCarCount","changeIsLoadingCarCount"]),
    pay(){
      
      let isSelect=false;
      let sidsList="";
      this.carList.forEach(v=>{
        if(v.isChecked){
          isSelect=true;
          sidsList+=v.sid+"-";
        }
      });
      sidsList=sidsList.slice(0,-1)
      if(isSelect){
        // this.removeAllSelect();
        this.$router.push({
          name:"Settlement",
          params:{
            sidsList:sidsList
          }
        });
      }else{
        this.$toast("请选择要购买的东西")
      }
    },
    computedSum(){
      let total=0;
       this.carList.map(v=> {
        if (v.isChecked) {
          total+=v.price*v.count;
        }
        return v;
      });
      this.total=total*100;
    },
    //删除选择的
    removeAllSelect() {
      let count=0;
      let sids = [];
      this.carList.filter((v, k) => {
        if (v.isChecked) {
          sids.push(v.sid);
          count++;
          return false;
        }
        return true;
      });
      if(sids.length==0){
        return 
      }
      let token = this.$cookies.get("tokenString");
      if (!token) {
        this.$router.push({
          name:"Login"
        })
        this.$toast("token过期了,请重新登录");
        return;
      }
      this.$axios({
        method: "post",
        url: "/deleteShopcart",
        data: {
          appkey: this.appkey,
          tokenString: token,
          sids: JSON.stringify(sids),
        },
      }).then((res) => {

        if (res.data.code == 7000) {
          this.$toast(res.data.msg);
          this.carList = this.carList.filter((v, k) => {
            if (v.isChecked) {
              sids.push(v.sid);
              return false;
            }
            return true;
          });
          this.isAllSelect();
          this.changeShoppingCarCount(this.shoppingCarCount-count);
        } else {
          this.$toast(res.data.msg);
          // console.log(res);
        }
      });
    },
    //删除指定的
    removeShoppingCar(sids, k) {
      this.$toast.loading({
        message: '删除中...',
        forbidClick: true,
        duration:0
      });
      let token = this.$cookies.get("tokenString");
      if (!token) {
         this.$toast.clear();
        this.$toast("token过期了,请重新登录");
        this.$router.push({
          name:"Login"
        })
        return;
      }
      this.$axios({
        method: "post",
        url: "/deleteShopcart",
        data: {
          appkey: this.appkey,
          tokenString: token,
          sids: JSON.stringify(sids),
        },
      }).then((res) => {
        // console.log(res);
        this.$toast.clear();
        if (res.data.code == 7000) {
          this.$toast(res.data.msg);
          this.carList.splice(k, 1);
          this.isAllSelect();
          this.changeShoppingCarCount(this.shoppingCarCount-1);
        } else {
          this.$toast(res.data.msg);
          // console.log(res);
        }
      });
    },
    //检查是否全部选择
    isAllSelect() {
      this.computedSum();
      // console.log("this.carList==>",this.carList);
      if(this.carList.length==0){
        this.allChecked = false;
        return 
      }
      for (let i of this.carList) {
        if (!i.isChecked) {
          this.allChecked = false;
          return;
        }
      }
      this.allChecked = true;

    },
    selcetAllCheckbox() {
      if(this.allChecked){
          this.carList = this.carList.map((v) => {
            v.isChecked=true
            return v;
          });
      }else{
         this.carList = this.carList.map((v) => {
            v.isChecked=false
            return v;
          });
      }
      this.computedSum();
    },
    setCarNum(sid, count) {
      let token = this.$cookies.get("tokenString");
      if (!token) {
         this.$router.push({
          name:"Login"
        })
        this.$toast("token过期了,请重新登录");
        return;
      }
      this.$axios({
        method: "post",
        url: "/modifyShopcartCount",
        data: {
          appkey: this.appkey,
          tokenString: token,
          sid,
          count,
        },
      }).then((res) => {
        if (res.data.code == 6000) {
          this.computedSum();
          this.$toast(res.data.msg);
        } else {
          this.$toast(res.data.msg);
          // console.log(res);
        }
      });
    },
    onLoadMore() {
      // 加载更多的数量
      setTimeout(() => {
        // console.log(this.start,this.listLength);
        let data = this.carAllList.slice(
          this.start,
          this.listLength + this.start
        );
        if (data.length < this.listLength) {
          this.finished = true;
        }
        this.carList.push(...data);
        // console.log(this.carList);
        this.start = this.listLength + this.start;
        this.loading = false;
      }, 1000);
    },
  },
  created() {
    let token = this.$cookies.get("tokenString");
    if (!token) {
       this.$router.push({
          name:"Login"
        })
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
        this.carAllList = res.data.result.map((v) => {
          v.isChecked = false;
          return v;
        });
        let data = this.carAllList.slice(
          this.start,
          this.listLength + this.start
        );
        if (data.length < this.listLength) {
          this.finished = true;
        }
        this.carList.push(...data);
        this.start = this.listLength + this.start;
        // console.log(this.carList);
        this.loading = false;
      } else {
        this.$toast(res.data.msg);
         this.$router.push({
          name:"Login"
        })
        // console.log(res);
      }
    });
  },
};
</script>
