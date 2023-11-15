<template>
  <div class="songListDetail">
    <DetialHeader :songSheetDetail="songSheetDetail"></DetialHeader>
    <DetailMusicList
      :playLists="playLists"
      :subscribedCount="songSheetDetail?.subscribedCount"
    ></DetailMusicList>
    <!-- <FooterMusic class="footer"></FooterMusic> -->
  </div>
</template>

<script setup lang="ts">
import FooterMusic from '@/components/FooterMusic/index.vue'
import DetialHeader from './components/DetialHeader.vue'
import DetailMusicList from './components/DetailMusicList.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, reactive } from 'vue'
import { useGetSongSheetDetailServer } from '@/api/music/music'

onMounted(async () => {
  // <script setup> 中无法直接访问 $route 对象
  let id = useRoute().query.id
  await getSongSheetDetail(id)

})

// 歌单详情
const songSheetDetail = ref()
// 播放列表
const playLists = ref()
// 获取歌单音乐列表
const getSongSheetDetail = async (id: any) => {
  const res: any = await useGetSongSheetDetailServer(id)
  console.log(res)
  songSheetDetail.value = res.data.songSheetInfo
  playLists.value = res.data.musicDetail
}

/* // 歌单详情数据
  const playList = reactive({
    name: "黄金卡上帝视角啊汇顶科技啊哈扩大合计卡萨",
    coverImgUrl: "http://127.0.0.1:3007/images/avatar.webp",
    description: "持续更新，会把自认为更好听的曲子分享给大家",
    userInfo: {
      avatar: "http://127.0.0.1:3007/images/avatar.webp",
      username: "嘿嘿嘿"
    },
    subscribedCount: 1312 // 收藏量
  })

  // 歌单中的歌曲
  const musics = reactive([
  {
    info: {
      id: 435234234,
      name: "歌曲名歌曲名sadasdasdsadasdasda",
      picUrl: "http://127.0.0.1:3007/images/avatar.webp",
    },
    // 作者
    author: [
      {
        id: 12321,
        name: "John"
      },
      {
        id: 123221,
        name: "jsda"
      },
    ]
  },
  {
    info: {
      id: 435234234,
      name: "歌曲名歌曲名sadasdasdsadasdasda",
      picUrl: "http://127.0.0.1:3007/images/avatar.webp",
    },
    // 作者
    author: [
      {
        id: 12321,
        name: "John"
      },
      {
        id: 123221,
        name: "jsda"
      },
    ]
  },
  {
    info: {
      id: 435234234,
      name: "歌曲名歌曲名sadasdasdsadasdasda",
      picUrl: "http://127.0.0.1:3007/images/avatar.webp",
    },
    // 作者
    author: [
      {
        id: 12321,
        name: "John"
      },
      {
        id: 123221,
        name: "jsda"
      },
    ]
  },
  {
    info: {
      id: 435234234,
      name: "歌曲名歌曲名sadasdasdsadasdasda",
      picUrl: "http://127.0.0.1:3007/images/avatar.webp",
    },
    // 作者
    author: [
      {
        id: 12321,
        name: "John"
      },
      {
        id: 123221,
        name: "jsda"
      },
    ]
  },
  {
    info: {
      id: 435234234,
      name: "歌曲名歌曲名sadasdasdsadasdasda",
      picUrl: "http://127.0.0.1:3007/images/avatar.webp",
    },
    // 作者
    author: [
      {
        id: 12321,
        name: "John"
      },
      {
        id: 123221,
        name: "jsda"
      },
    ]
  },
  {
    info: {
      id: 435234234,
      name: "歌曲名歌曲名sadasdasdsadasdasda",
      picUrl: "http://127.0.0.1:3007/images/avatar.webp",
    },
    // 作者
    author: [
      {
        id: 12321,
        name: "John"
      },
      {
        id: 123221,
        name: "jsda"
      },
    ]
  },
  {
    info: {
      id: 435234234,
      name: "歌曲名歌曲名sadasdasdsadasdasda",
      picUrl: "http://127.0.0.1:3007/images/avatar.webp",
    },
    // 作者
    author: [
      {
        id: 12321,
        name: "John"
      },
      {
        id: 123221,
        name: "jsda"
      },
    ]
  },
  {
    info: {
      id: 435234234,
      name: "歌曲名歌曲名sadasdasdsadasdasda",
      picUrl: "http://127.0.0.1:3007/images/avatar.webp",
    },
    // 作者
    author: [
      {
        id: 12321,
        name: "John"
      },
      {
        id: 123221,
        name: "jsda"
      },
    ]
  },
  {
    info: {
      id: 435234234,
      name: "歌曲名歌曲名sadasdasdsadasdasda",
      picUrl: "http://127.0.0.1:3007/images/avatar.webp",
    },
    // 作者
    author: [
      {
        id: 12321,
        name: "John"
      },
      {
        id: 123221,
        name: "jsda"
      },
    ]
  },
  {
    info: {
      id: 435234234,
      name: "歌曲名歌曲名sadasdasdsadasdasda",
      picUrl: "http://127.0.0.1:3007/images/avatar.webp",
    },
    // 作者
    author: [
      {
        id: 12321,
        name: "John"
      },
      {
        id: 123221,
        name: "jsda"
      },
    ]
  },
]) */
</script>

<style lang="scss" scoped>
.songListDetail {
  // background-color:#ccc;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
}

.footer{
  position: fixed;
  bottom: 0;
}
</style>
