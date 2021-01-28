const hotSellItem=[
    {
        path: '/home/hotSellItemOne',
        name: 'HotSellItemOne',
        component: () => import('../components/HotSellItemOne'),
        meta:{
            showNav:true
        },
        alias:"/home"
    },
    {
        path: '/home/hotSellItemTwo',
        name: 'HotSellItemTwo',
        component: () => import('../components/HotSellItemTwo'),
        meta:{
            showNav:true
        },
        alias:"/home"
        
    },
]
export const routes=[
    {
        path: '/home',
        alias:"/",
        name: 'Home',
        children:hotSellItem,
        redirect:"/home/hotSellItemOne",
        component: () => import('../views/Home.vue'),
        meta:{
            showNav:true
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta:{
            showNav:true
        },
    },
    {
        path: '/findPassword',
        name: 'FindPassword',
        component: () => import('../views/FindPassword.vue'),
        meta:{
            showNav:false
        },
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('../views/Order.vue'),
        meta:{
            showNav:true
        },
    },
    {
        path: '/my',
        name: 'My',
        component: () => import('../views/My.vue'),
        meta:{
            showNav:true
        },
    },
    {
        path: '/shoppingCar',
        name: 'ShoppingCar',
        component: () => import('../views/ShoppingCar.vue'),
        meta:{
            showNav:true
        },
    },
    {
        path: '/detailed/:pid',
        name: 'Detailed',
        // props:true,
        meta:{
            showNav:false
        },
        component: () => import('../views/Detailed.vue')
    },
    {
        path: '/addressList',
        name: 'AddressList',
        params:true,
        component: () => import('../views/AddressList'),
        meta:{
            showNav:false
        },
    },
    {
        path: '/address/:aid?',
        name: 'Address',
        component: () => import('../views/Address'),
        meta:{
            showNav:false
        },
    },
    {
        path: '/myOption',
        name: 'MyOption',
        component: () => import('../views/MyOption'),
        meta:{
            showNav:false
        },
    },
    {
        path: '/security',
        name: 'Security',
        component: () => import('../views/Security'),
        meta:{
            showNav:false
        },
    },
    {
        path: '/settlement/:sidsList',
        name: 'Settlement',
        params:true,
        props:true,
        component: () => import('../views/Settlement'),
        meta:{
            showNav:false
        },
    },
    {
        path: '/myOrder',
        name: 'MyOrder',
        query:true,
        component: () => import('../views/MyOrder'),
        meta:{
            showNav:false
        },
    },
    {
        path: '/myCollection',
        name: 'MyCollection',
        component: () => import('../views/MyCollection'),
        meta:{
            showNav:false
        },
    },
    {
        path: '/mySearch',
        name: 'MySearch',
        query:true,
        component: () => import('../views/MySearch'),
        meta:{
            showNav:false
        },
    },
]