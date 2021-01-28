import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import {
  NavBar,
  Field,
  Button,
  Popup,
  Tabbar,
  TabbarItem,
  Swipe, 
  SwipeItem,
  Lazyload,    //懒加载
  Toast,
  Icon,
  Grid,
  GridItem,
  Search,
  GoodsAction, 
  GoodsActionIcon,
  GoodsActionButton,
  Stepper,
  Divider,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  SwipeCell,
  List,
  AddressList,
  AddressEdit,
  Area,
  NoticeBar,
  Uploader,
  Cell, 
  CellGroup,
  Dialog,
  Tab,
  Tabs
  } from "vant";
//将ps转rem文件
import "lib-flexible/flexible";
Vue 
.use(NavBar)
.use(Field)
.use(Button)
.use(Popup)
.use(Tabbar)
.use(TabbarItem)
.use(Swipe)
.use(SwipeItem)
.use(Toast)
.use(VueCookies)
.use(Icon)
.use(Grid)
.use(GridItem)
.use(Search)
.use(GoodsAction)
.use(GoodsActionIcon)
.use(GoodsActionButton)
.use(Stepper)
.use(Divider)
.use(Checkbox)
.use(CheckboxGroup)
.use(SubmitBar)
.use(SwipeCell)
.use(List)
.use(AddressList)
.use(AddressEdit)
.use(Area)
.use(NoticeBar)
.use(Uploader)
.use(Cell)
.use(CellGroup)
.use(Dialog)
.use(Tab)
.use(Tabs)
.use(Lazyload,{lazyComponent: true,})

Vue.config.productionTip = false

Vue.prototype.appkey="U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
