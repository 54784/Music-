<template>
  <div id="swiper">
    <van-swipe :autoplay="2000" lazy-render>
      <van-swipe-item v-for="(item, index) in swiperData || []" :key="index">
        <img :src="item.dataUrl" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
import { useGetswiperService } from '@/api/swiper/swiper'
import { reactive, ref } from 'vue'
import type { SwiperData, SwiperDataResponseData } from '@/api/swiper/types'
let swiperData = ref<SwiperData[]>([])
// 获取轮播图数据
const getSwiperData = async () => {
  const res: SwiperDataResponseData = await useGetswiperService()
  // console.log(res)

  if (!res.code) {
    swiperData.value = res.data as unknown as SwiperData[]
    // swiperData.value = Array.isArray(res.data) ? res.data : [];
  }
  // console.log(swiperData)
}

getSwiperData()
</script>

<style scoped lang="scss">
#swiper {
  .van-swipe {
    background: linear-gradient(to right, #e6e6fc, #eae5fc, #f5e5f2);

    width: 100%;

    .van-swipe__track {
      .van-swipe-item {
        padding: 10px;

        img {
          border-radius: 10px;
          width: 100%;
          height: 130px;
        }
      }
    }
  }
}
</style>
