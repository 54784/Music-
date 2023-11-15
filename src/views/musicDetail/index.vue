<template>
  <img class="bgImg" :src="playList?.coverImage" />
  <div class="box">
    <div class="detailTop">
      <div class="return">
        <svg-icon
          @click="useFooterMusic.updateDetailShow"
          name="return"
          color="#FBFAF5"
          width="30px"
          height="30px"
        ></svg-icon>
      </div>
      <div class="musicInfo">
        <!-- 使用跑马灯组件 -->
        <Vue3Marquee>
          {{ playList?.musicName }}
        </Vue3Marquee>
        <!-- <span class="author" v-for="(item, index) in playList?.author" :key="index">
          {{ item.name }}
        </span> -->
        <span class="author">
          {{ playList?.musicArtist }}
        </span>
      </div>
      <div class="share">
        <svg-icon
          @click="updateShowShare"
          name="share"
          color="#FBFAF5"
          width="30px"
          height="30px"
        ></svg-icon>
      </div>
      <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" />
    </div>
    <!-- 中间磁盘和磁针 -->
    <div class="detailCenter" v-show="isLyricShow" @click="isLyricShow = !isLyricShow">
      <img
        class="magnetNeedle"
        :class="{ play: !useFooterMusic.isPlay }"
        src="../../assets/cizhen.png"
        alt=""
      />
      <img class="disk" src="../../assets/cipan.png" alt="" />
      <!-- <img class="imgcenter" ref="avatarImg" :src="useFooterMusic.playList[0].al.picUrl" alt=""> -->

      <img
        class="imgcenter"
        :src="playList?.coverImage"
        :class="{ rotating: !useFooterMusic.isPlay }"
        alt=""
      />
    </div>
    <div
      class="lyric"
      ref="musicLyric"
      v-show="!isLyricShow"
      @click="isLyricShow = !isLyricShow"
      @touchstart="handleLyricDragStart"
      @touchend="handleLyricDragEnd"
    >
      <p
        v-for="(item, index) in lyric"
        :key="index"
        :class="{
          active:
            useFooterMusic.currentTime * 1000 >= item.time &&
            useFooterMusic.currentTime * 1000 < item.pre
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <!-- 底部 控件 -->
    <div class="detailBottom">
      <!-- 五个图标 -->
      <div class="testIconList">
        <svg-icon name="like" width="20px" height="20px"></svg-icon>
        <svg-icon name="download" width="30px" height="30px"></svg-icon>
        <svg-icon name="smallBell" width="22px" height="22px"></svg-icon>
        <van-badge :content="5" color="transparent">
          <svg-icon class="leaveAMsg" name="leaveAMsg" width="28px" height="26px"></svg-icon>
        </van-badge>
        <svg-icon name="more2" width="25px" height="25px"></svg-icon>
      </div>
      <!-- 进度条 -->
      <div class="progressBar">
        <input
          class="range"
          type="range"
          ref="one"
          min="0"
          :max="useFooterMusic.duration as string"
          v-model="useFooterMusic.currentTime"
          step="0.05"
        />
      </div>
      <!-- 音乐控件 -->
      <div class="controlMusic">
        <!-- 播放选项 -->
        <div class="playbackOptions">
          <svg-icon name="sequentialPlayback" color="" width="20px" height="20px"></svg-icon>
        </div>
        <!-- 上一首 -->
        <div @click="goplay(-1)">
          <svg-icon name="previousSong" width="20px" height="20px"></svg-icon>
        </div>
        <!-- 开始 暂停 -->
        <div>
          <svg-icon
            v-if="useFooterMusic.isPlay"
            @click="play"
            name="play1"
            color="#F7F8FC"
            width="25px"
            height="25px"
          ></svg-icon>
          <svg-icon
            v-else
            @click="noplay"
            name="suspend"
            color="#F7F8FC"
            width="25px"
            height="25px"
          ></svg-icon>
        </div>
        <!-- 下一首 -->
        <div @click="goplay(1)">
          <SvgIcon name="nextSong" width="20px" color="red" height="20px"></SvgIcon>
        </div>
        <!-- 播放列表 -->
        <div>
          <svg-icon name="playlist-fff" width="20px" height="20px"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 接收父组件传递过来的对象
const props = defineProps({
  playList: Object,
  updateDetailShow: Function,
  play: Function,
  noplay: Function,
  audio: Object,
  handleEnded: Function,
  addDuration: Function
})
let audios = props.audio

// pnpm install vue3-marquee@latest --save 跑马灯插件
import { Vue3Marquee } from 'vue3-marquee'
import { ref, onMounted, computed, reactive, watch, nextTick } from 'vue'
import { useFooterMusicStore } from '../../store/index'
const useFooterMusic = useFooterMusicStore()

onMounted(() => {
  if (props.audio) {
    props.audio.addEventListener('ended', handleEnded)
  }
  props.addDuration
})

// 分享界面
const showShare = ref(false)
const options = [
  [
    { name: '微信', icon: 'wechat' },
    { name: '朋友圈', icon: 'wechat-moments' },
    { name: '微博', icon: 'weibo' },
    { name: 'QQ', icon: 'qq' }
  ],
  [
    { name: '复制链接', icon: 'link' },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' },
    { name: '小程序码', icon: 'weapp-qrcode' }
  ]
]
const updateShowShare = () => {
  // 点击触发函数修改 showShare状态
  showShare.value = !showShare.value
}
// 添加一个监听音频播放结束的函数
const handleEnded = () => {
  useFooterMusic.isPlay = true
  
    // useFooterMusic.isPlay = false // 播放结束，将 isPlay 设置为 false
  
}

// 播放上一首 -1 / 下一首 1
const goplay = (num: number) => {
  let index = useFooterMusic.playListIndex + num
  if (index < 0) {
    index = useFooterMusic.playList.length - 1
  } else if (index == useFooterMusic.playList.length) {
    index = 0
  }
  useFooterMusic.updatePlayListIndex(index) // 更改仓库中数据
  updateDuration(index)
}
// 延迟 100 毫秒来确保播放器能够适当初始化 获得最新的总时长
const updateDuration = (index: number) => {
  setTimeout(() => {
    const audio = new Audio(useFooterMusic.playList[index].musicUrl)
    audio.addEventListener('loadedmetadata', () => {
      useFooterMusic.updateDurationTime(audio.duration) // 更新总时长
    })
  }, 100)
}

// 是否显示歌词
const isLyricShow = ref(true)

const lyric = computed(() => {
  let arr = reactive<any[]>([])
  // 换行符进行分割
  arr = useFooterMusic.lyricList.split(/[(\r\n)\r\n]+/).map((item: any, index: any) => {
    let min = item.slice(1, 3)
    let sec = item.slice(4, 6)
    let mill = item.slice(7, 10)
    let lrc = item.slice(11, item.length)
    if (isNaN(Number(mill))) {
      mill = item.slice(7, 9)
      lrc = item.slice(10, item.length)
    }
    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill) // 公共毫秒数

    return { min, sec, mill, lrc, time }
  })
  // 下一句歌词
  arr.forEach((item, index) => {
    // 判断最后一句
    if (index === arr.length - 1 || isNaN(arr[index + 1].time)) {
      item.pre = 100000
    } else {
      // 没到最后一句  拿到下一句歌词的时间
      item.pre = arr[index + 1].time
    }
  })
  arr.shift()

  return arr
})

const musicLyric = ref()
/* watch(()=>useFooterMusic.currentTime,()=>{
  // offsetTop属性是属于HTMLElement类型的属性，而不是Element类型
  let p = document.querySelector('p.active') as HTMLElement
  // console.log([p]);
  if(p.offsetTop >= 350){
    console.log([musicLyric.value]);
    musicLyric.value.scrollTop = p.offsetTop - 340
  }
}) */
watch(
  () => useFooterMusic.playListIndex,
  () => {
    if (audios) {
      useFooterMusic.updateDurationTime(audios.duration)
    }
  }
)
const isDraggingLyric = ref(false)
const handleLyricDragStart = () => {
  isDraggingLyric.value = true
}

const handleLyricDragEnd = () => {
  setTimeout(() => {
    isDraggingLyric.value = false
  }, 5000)
}

watch(
  () => useFooterMusic.currentTime,
  (newValue) => {
    // console.log(useFooterMusic.currentTime);

    if (useFooterMusic.currentTime == 0) {
      scrollToLyric(0, 300)
    }
    const p = document.querySelector('p.active') as HTMLElement
    // console.log(p.offsetTop)

    if (p && !isDraggingLyric.value) {
      if (p.offsetTop > 260 && musicLyric.value) {
        scrollToLyric(p.offsetTop - 260, 200)
      }
    }
    // 播放到最后
    if (newValue === (useFooterMusic.duration as unknown)) {
      useFooterMusic.currentTime = 0
      useFooterMusic.isPlay = false
      scrollToLyric(0, 200)

      // 判断是不是最后一首  是 回到第一首
      if (useFooterMusic.playListIndex === useFooterMusic.playList.length - 1) {
        useFooterMusic.updatePlayListIndex(0)
        useFooterMusic.isPlay = false
      } else {
        // 切换下一首
        useFooterMusic.updatePlayListIndex(useFooterMusic.playListIndex + 1)
      }
      updateDuration(useFooterMusic.playListIndex)
    }
  }
)

function scrollToLyric(offset: number, duration: number) {
  const container = musicLyric.value
  if (!container) return

  const startTime = Date.now()
  const startScrollTop = container.scrollTop
  const targetScrollTop = offset
  const distance = targetScrollTop - startScrollTop

  function scrollStep() {
    const currentTime = Date.now() - startTime
    if (currentTime < duration) {
      const scrollTop = startScrollTop + (distance * currentTime) / duration
      container.scrollTop = scrollTop
      requestAnimationFrame(scrollStep)
    } else {
      container.scrollTop = targetScrollTop
    }
  }

  requestAnimationFrame(scrollStep)
}

// 在视图挂载后将 musicLyric.value 赋值为实际元素的引用
// onMounted(() => {
//   nextTick(() => {
//     musicLyric.value = document.querySelector('.lyric') as HTMLElement
//   })
// })
</script>

<style scoped lang="scss">
.bgImg {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100vh;
  filter: blur(30px);
  // background-color: transparent;
}

.box {
  z-index:9999;
  // background-color: rgb(32, 31, 31);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .detailTop {
    padding: 15px 15px 0 15px;
    height: 45px;
    color: #fbfaf5;
    align-items: center;
    // background-color: red;
    display: flex;
    justify-content: space-between;

    .musicInfo {
      width: 30%;
      text-align: center;
      font-size: 18px;
      .author {
        display: block;
        font-size: 13px;
        color: #a6a6a6;
        margin-top: 4px;
      }
    }
  }
  .detailCenter {
    position: relative;
    padding: 15px 15px 0 15px;
    top: 75px;
    width: 100vw;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .magnetNeedle {
      // width: 100px;
      // height: 160px;
      width: 25%;
      height: 33%;
      position: absolute;
      left: 47%;
      top: -70px;
      transform-origin: 0 0;
      transform: rotate(-35deg);
      transition: all 2s;
    }
    // 若正在播放则使用 play这个类
    .play {
      transform: rotate(5deg);
    }
    .disk {
      // width: 320px;
      width: 80%;
    }
    .imgcenter {
      width: 46.66667vw;
      height: 46.66667vw;
      // width: 45%;
      // height: 42%;
      border-radius: 50%;
      position: absolute;
      top: 63px;
      // bottom: 77.66667vw;
      border-radius: 50%;
      z-index: -1;
      animation: rotater 10s linear infinite;
      //   animation-play-state: paused;
      animation-play-state: paused;
    }
    .rotating {
      animation-play-state: running;
    }
  }
  .lyric {
    padding-top: 15px;
    height: 65%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    overflow-y: scroll;
    // overflow: hidden;
    // transition: offsetTop ease;
    &::-webkit-scrollbar {
      width: 0px; /* 滚动条宽度 */
    }
    p {
      transition: all 0.5s ease;
      color: #efeeee;
      margin-bottom: 15px;
    }
    .active {
      color: #ffffff;
      text-shadow:
        0 0 10px rgb(168, 128, 243),
        0 0 20px rgb(237, 94, 232);
      //  0 0 30px white,
      //  0 0 40px white,
      //  0 0 50px white;
      font-size: 22px;
      white-space: nowrap;
    }
  }
  .detailBottom {
    margin-bottom: 80px;
    padding: 15px 15px 0 15px;
    margin-top: 10px;
    width: 100%;
    height: 20%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .testIconList {
      display: flex;
      justify-content: space-between;
      width: 95%;
      align-items: center;
      // border: 1px solid blue;
      .leaveAMsg {
        position: relative;
        top: 4px;
      }
      :deep(.van-badge--top-right) {
        top: 5px;
        right: 1px;
      }
      :deep(.van-badge) {
        border: none;
        font-weight: 200;
      }
    }
    // 进度条
    .progressBar {
      width: 100%;
      height: 30px;
      // border: 1px solid goldenrod;
      line-height: 20px;
      .range {
        width: 100%;
        height: 3px;
      }
    }
    .controlMusic {
      width: 95%;
      height: 40px;
      // border: 1px solid green;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

@keyframes rotater {
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
}
</style>
