<template>
  <div class="songMusicList">
    <div class="listTop">
      <div class="play">
        <svg-icon name="playCircle" width="30px" height="30px"></svg-icon>
        <div class="info">
          <span class="playAll">播放全部</span>
          <span class="many">(共{{ playLists.length }}首)</span>
        </div>
      </div>
      <div class="collect">
        <span>+ 收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="itemMusic" v-for="(item, index) in playLists" :key="index">
      <div class="serialNumber">{{ index + 1 }}</div>
      <div class="musicInfo" @click="playMusic(index)">
        <span class="name">{{ item.musicName }}</span>
        <div class="author">
          <span class="sq">SQ</span>
          <!-- <span class="authorName" v-for="(author, authorIndex) in item.author" :key="authorIndex">
            {{ author.name }}
          </span> -->
          <span class="authorName">
            {{ item.musicArtist }}
          </span>
        </div>
      </div>
      <div class="more">
        <svg-icon name="more"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee'
import { reactive } from 'vue'
import { useFooterMusicStore } from '@/store/index'
const useFooterMusic = useFooterMusicStore()
const data = defineProps({
  playLists: {
    type: Array,
    default: []
  },
  subscribedCount: Number
})
// console.log(data.subscribedCount);

const playMusic = (currentIndex: number) => {
  // 点击列表歌曲 更改仓库 playList 并把当前点击是下标(具体哪首歌)传过去
  useFooterMusic.updatePlayList(data.playLists)
  useFooterMusic.updatePlayListIndex(currentIndex)
}
</script>

<style lang="scss" scoped>
.songMusicList {
  // overflow: auto;
  background-color: #fff;
  opacity: 0.8;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  // border: 1px solid red;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  .listTop {
    display: flex;
    justify-content: space-between;
    .play {
      width: 42%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info {
        padding-top: 2px;

        .playAll {
          font-size: 16px;
          color: black;
        }

        .many {
          font-size: 14px;
          color: #b7b6b6;
        }
      }
    }

    .collect {
      width: 30%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: red;
      border-radius: 20px;
      font-size: 15px;
      color: #fff;
    }
  }

  .itemMusic {
    // border: 1px solid red;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;

    .serialNumber {
      // border: 1px solid blue;
      width: 5%;
      text-align: center;
      color: #ccc;
    }

    .musicInfo {
      width: 82%;

      // border: 1px solid blue;
      .name {
        font-size: 16px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .author {
        height: 20px;
        display: flex;
        justify-content: first baseline;
        align-items: center;

        .sq {
          display: block;
          width: 25px;
          height: 13px;
          line-height: 13px;
          border-radius: 3px;
          font-size: 12px;
          text-align: center;
          color: red;
          font-weight: 600;
          font-family: '黑体';
          border: 1px solid red;
        }

        .authorName {
          margin-left: 10px;
          font-size: 13px;
          color: #a8a8a8;
        }
      }
    }
  }
}
</style>
