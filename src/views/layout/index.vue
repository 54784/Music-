<template>
  <div class="a">
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar route active-color="red" inactive-color="#66666a">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/boke" icon="apps-o">博客</van-tabbar-item>
      <van-tabbar-item to="/my" icon="user-o">我的</van-tabbar-item>
      <van-tabbar-item to="/shequ" icon="shopping-cart-o">社区</van-tabbar-item>
      <van-tabbar-item to="/faxian" icon="user-o">发现</van-tabbar-item>
    </van-tabbar>
    <!-- <FooterMusic></FooterMusic> -->
  
  </div>
</template>

<script setup lang="ts">
import FooterMusic from '@/components/FooterMusic/index.vue'
</script>

<style scoped lang="scss">
// .a{
//   z-index: -111111111;
// }
.van-tabbar {
  
  background-color: $index_bgcolor;
  .van-tabbar-item {
    // z-index:-1;
    font-size: 13px;
  }
}

.van-tabbar-item--active {
  background-color: $index_bgcolor;
}
</style>
