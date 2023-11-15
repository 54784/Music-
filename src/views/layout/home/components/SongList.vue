<template>
  <div class="songList">
    <div class="listHeader">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="swiper">
      <van-swipe class="swiperdata" :loop="false" :width="130" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in songLists" :key="index">
          <router-link :to="`/songListDetail?id=${item._id}`">
            <div class="box">
              <img :src="item.picUrl" alt="" />
              <div class="playcount">
                <svg-icon name="playcount" width="14px" height="14px"></svg-icon>
                <span>{{ changeCount(item.playCount) }}</span>
              </div>
              <p class="songName">{{ item.name }}</p>
            </div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetSongSheetServer } from '@/api/music/music'
import { ref, onMounted } from 'vue'

// 歌单列表
const songLists: any = ref([])
onMounted(async () => {
  await getSongSheet()
})

// 获取歌单列表
const getSongSheet = async () => {
  // limit  默认10条数据
  const res: any = await useGetSongSheetServer()
  console.log(res)
  songLists.value = res.data
}

// 对播放量数量进行处理
const changeCount = (num: number) => {
  if (num >= 100000000) {
    return (num / 10000000).toFixed(1) + '亿'
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
}
</script>

<style scoped lang="scss">
.songList {
  width: 100%;
  // height: 260px;
  padding: 10px;

  .listHeader {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 25px;
      padding: 0 10px;
      border-radius: 15px;
    }
  }

  .swiper {
    // border: 1px solid black;
    width: 100%;
    height: 150px;

    .swiperdata {
      height: 100%;

      .box {
        position: relative;
        padding-top: 8px;
        width: 118px;
        height: 118px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }

        .playcount {
          position: absolute;
          right: 6px;
          top: 10px;
          color: $index_bgcolor;

          span {
            font-size: 12px;
          }
        }

        .songName {
          color: black;
          font-size: 13px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
