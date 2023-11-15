<template>
  <div class="nav">
    <div class="more">
      <!-- <svg-icon @click="isShowPopup = !isShowPopup" name="more" width="20px" height="20px"></svg-icon> -->
      <Popup></Popup>
    </div>
    <div class="search">
      <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center" />
    </div>
    <div class="listen">
      <svg-icon name="listen" width="25px" height="25px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Popup from '@/components/Popup/index.vue'

const value = ref()
</script>

<style lang="scss" scoped>
.nav {
  background: linear-gradient(to right, #e6e6fc, #eae5fc, #f5e5f2);
  width: 100%;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search {

    // overflow: hidden;
    .van-search {
      background: none;
      width: 300px;

      :deep(.van-icon) {
        left: 64px;
      }

      :deep(.van-search__content) {
        background-color: transparent;
      }

      :deep(.van-cell) {
        border: 1px solid #d1caeb;
        border-radius: 18px;
        background: linear-gradient(to right, #e1e1fd, #e2dcfa, #f0d9ec);
      }
    }
  }
}

:deep(.van-search) {
  border-radius: 10px;
}
</style>
