<template>
  <div class="FooterMusic">
    <div class="info" @click="useFooterMusic.updateDetailShow">
      <div class="avatar">
        <img :class="{ rotating: !useFooterMusic.isPlay }" src="../../assets/avatar.webp" alt="">
        <!-- <img ref="avatarImg" :src="useFooterMusic.playList[0].al.picUrl" alt=""> -->
      </div>
      <div class="info_music" v-if="useFooterMusic.playList">
        <Vue3Marquee>
          <span class="musicName">{{ useFooterMusic.playList[useFooterMusic.playListIndex]?.musicName }}</span>
          -
          <span class="author">{{ useFooterMusic.playList[useFooterMusic.playListIndex]?.musicArtist }}</span>
        </Vue3Marquee>
      </div>

    </div>
    <div class="playmusic">
      <svg-icon v-if="useFooterMusic.isPlay" @click="play" name="play2" width="20px" height="20px"></svg-icon>
      <svg-icon v-else @click="noplay" name="suspend" width="20px" height="20px"></svg-icon>

      <svg-icon name="playlist" width="20px" height="20px" class="playlist"></svg-icon>
    </div>
    <audio ref="audio"
      :src="`http://127.0.0.1:3007/upload/musicData/${useFooterMusic.playList[useFooterMusic.playListIndex].musicName}-${useFooterMusic.playList[useFooterMusic.playListIndex].musicArtist}.mp3`"></audio>




  </div>
  <!-- 点击左侧信息区域 弹出歌曲详情 -->
  <van-popup z-index="999" class="detail" v-model:show="useFooterMusic.detailShow" position="bottom"
    :style="{ height: '100%', width: '100%' }">
    <!-- 把正在展示的这首歌信息传递给子组件 -->
    <musicDetail :audio="audio" :handleEnded="handleEnded"
      :playList="useFooterMusic.playList[useFooterMusic.playListIndex]"
      :updateDetailShow="useFooterMusic.updateDetailShow" :play="play" :noplay="noplay" :addDuration="addDuration">
    </musicDetail>
  </van-popup>
</template>

<script setup lang="ts">


import { Vue3Marquee } from 'vue3-marquee'
import musicDetail from '@/views/musicDetail/index.vue'
import { useFooterMusicStore } from '@/store/index.ts'
import { onMounted, ref, onUpdated, reactive, watch } from 'vue'
let audio = ref(new Audio())
console.log(audio);
const useFooterMusic = useFooterMusicStore()

// useFooterMusic.updateDurationTime(localStorage.getItem('footerMusic.duration'))

console.log(useFooterMusic.playList[useFooterMusic.playListIndex]);

onMounted(async () => {
  await useFooterMusic.getMusic()
  //  sessionStorage.setItem('itemDetail',JSON.stringify(useFooterMusic.musicList))
  await useFooterMusic.getLyric(useFooterMusic.playList[useFooterMusic.playListIndex]._id)
  // updateTime()
  addDuration()
})
// 解决 请求响应还没回来就渲染完了导致拿不到数据
/* <div class="info_music" v-if="useFooterMusic.musicList.result != null">
  或
  if(useFooterMusic.musicList==""){
  useFooterMusic.musicList = JSON.parse(sessionStorage.getItem('itemDetail'))
  } */

let interVal: ReturnType<typeof setInterval> | undefined;
// 播放状态  false 正在播放  true 停止播放
const play = () => {
  if (audio.value) {
    const getLocalStoreage = JSON.parse((localStorage.getItem('footerMusic') as string));
    let current = getLocalStoreage.currentTime as number
    if (current) {
      audio.value.currentTime = current
    } else {
      // 如果获取的时间不合法，设置默认值
      audio.value.currentTime = 0;
    }
    audio.value.play()
    useFooterMusic.isPlay = false
    updateTime() // 播放开启定时器
  }
}

// 添加一个监听音频播放结束的函数
const handleEnded = () => {
  useFooterMusic.isPlay = true
  clearInterval(interVal)
}
if (audio.value) {
  audio.value.addEventListener('ended', handleEnded)
}
const noplay = () => {
  if (audio.value) {
    audio.value.pause()
    useFooterMusic.isPlay = true
    clearInterval(interVal) // 暂停清除定时器
  }
}



onUpdated(async () => {
  // 获取歌词
  await useFooterMusic.getLyric(useFooterMusic.playList[useFooterMusic.playListIndex]._id)
  addDuration()
})


// 改变时间
const updateTime = () => {
  interVal = setInterval(() => {
    useFooterMusic.updateCurrentTime(audio.value.currentTime)
  }, 200)
}
const addDuration = () => {
  useFooterMusic.updateDurationTime(audio.value.duration)
}

watch(
  // 监视 下标的变化 只要变了 立即播放当前歌曲
  () => useFooterMusic.playListIndex,
  () => {
    audio.value.autoplay = true
    if (audio.value.paused) {
      // 若是暂停状态 修改图标
      useFooterMusic.isPlay = false
    }
  })

  // watch(
  //   ()=> useFooterMusic.playList,
  //   ()=>{
  //     if(useFooterMusic.isPlay){
  //        audio.value.autoplay = true
  //     }
  //   }
  // )

</script>

<style scoped lang="scss">
.FooterMusic {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 45px;
  max-height: 45px;
  left: 0;
  bottom: 47px;
  background-color: $index_bgcolor;
  // border-top:1px solid #e9e9eb;
  border-bottom: 1px solid #e9e9eb;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .info {
    max-height: 45px;
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .avatar {
      overflow: hidden;

      img {
        width: 38px;
        height: 38px;
        border: 5px solid black;
        border-radius: 50%;
        object-fit: cover;
        animation: rotate 5s linear infinite;
        animation-play-state: paused;
      }

      .rotating {
        // animation: rotate 5s linear infinite;
        animation-play-state: running;
      }
    }

    .info_music {
      width: 75%;

      .musicName {
        color: black;
        font-size: 15px;
        font-weight: 600;
        margin-right: 10px;
      }

      .author {
        margin-left: 10px;
        margin-right: 60px;
        color: #8b8888;
        font-size: 14px;
      }

      p {
        margin-top: 2px;
        font-size: 13px;
      }
    }
  }

  .playmusic {
    width: 25%;
    display: flex;
    justify-content: space-around;

    // .playlist {}
  }

}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>