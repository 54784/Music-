// 创建底部播放组件相关的小仓库
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { useGetLyricsServer, useGetMusicServer } from '@/api/music/music'

export const useFooterMusicStore = defineStore('footerMusic', () => {
  // 播放列表
  let playList = ref([
    {
        _id: "6548b11d16e749bf5ae52461", // 歌曲id
        musicName:"I Hate U I Love U(抖音版)-音质推荐",
        musicArtist:"音质推荐",
        // _id:"654073a82d7920734c7610b6", // 图片id
        coverImage:"http://127.0.0.1:3007/images/avatar.webp",
        musicUrl:""
    },
  ])

  // 发请求获取全部音乐
  let musicList = ref<any[]>([])
  const getMusic = async ()=>{
    const res: any = await useGetMusicServer()
    musicList.value= res.data || []
    console.log(res);
  }

  let playListIndex = ref(0) // 默认下标为0
  // 更改播放列表
  const updatePlayList = (value:any)=>{
    playList.value = value
    console.log(value)
  }

  const updatePlayListIndex = (value:any)=>{
    playListIndex.value = value
  }


  // 是否正在播放
  const isPlay = ref(true)
  // 是否展示歌曲详情 歌词部分
  const detailShow = ref(false)
  const updateDetailShow = ()=>{
    detailShow.value = !detailShow.value
  }

  let lyricList = ref()  // 歌词
  // 获取歌词
  const getLyric = async (value:string)=>{
    const res = await useGetLyricsServer(value)
    console.log(res);
    
    lyricList.value = res.data.lyrics // 获取到的歌词存在 变量中
  }

  let currentTime = ref(0) // 当前时间
  const updateCurrentTime = (value:any)=>{
    currentTime.value = value
    // console.log(currentTime.value);
  }
  let duration = ref(localStorage.getItem('footerMusic') || 0) // 总时长
  console.log(duration.value);
  
  const updateDurationTime = (value:any)=>{
    duration.value = value
    console.log(duration.value);
  }
  return {
    playList,
    playListIndex,
    updatePlayList,
    updatePlayListIndex,
    isPlay,
    musicList,
    detailShow,
    updateDetailShow,
    getMusic,
    getLyric,
    lyricList,
    currentTime,
    updateCurrentTime,
    duration,
    updateDurationTime
  }
  
},{
  persist:true
})