<template>
    <div class="settlementItems">
        <div class="item" v-for="(v,k) in allProduct" :key="k">
            <div class="img">
                <img :src="v.small_img||v.smallImg" alt="">
            </div>
            <div class="itemRight">
                <div class="itemRightTop">
                    <span class="ProductName">{{v.name}}</span>
                    <span class="ProductDesc">{{v.rule}}</span>
                </div>
                <div class="itemRightMid">
                    {{v.enname}}
                </div>
                <div class="itemRightBottom">
                    <span>&yen;{{v.price}}</span><span>x{{v.count}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "../assets/less/settlementItems.less"
    export default {
        props:["allProduct"],
        
    }
</script>
