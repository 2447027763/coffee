import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shoppingCarCount:0,
    isLoadingCarCount:false,
    defaultAddress:{}
  },
  mutations: {
    changeShoppingCarCount(state,payload){
      state.shoppingCarCount=payload;
    },
    changeIsLoadingCarCount(state,payload){
      state.isLoadingCarCount=payload;
    },
    changeDefaultAddress(state,payload){
      state.defaultAddress=payload;
    },
    changeDefaultAddressName(state,payload){
      state.defaultAddress.name=payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
