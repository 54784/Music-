<template>
  <div class="user">
    <div class="search">
      <Popup></Popup>
      <van-icon name="search" size="28px" />
    </div>
    <van-notice-bar class="notice" left-icon="volume-o" scrollable text="米袋虽空——樱花开哉！"
      background="linear-gradient(to right, #e6e6fc, #eae5fc, #f5e5f2)" />

    <div class="userInfo">

      <div class="avatar">
        <img :src="userStore.userInfo.avatar" alt="">
      </div>
      <div class="info">
        <div class="nickName">{{ userStore.userInfo.username}}</div>
        <div class="grade">
          <span class="guanzhu">8关注</span>
          <span class="fensi">3粉丝</span>
          <span class="gra">Lv.7</span>
        </div>
      </div>
    </div>

    <div class="nav">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="svg">
          <svg-icon :name="item.svgName" width="30px" height="30px"></svg-icon>
        </div>
        <p>{{ item.text }}</p>
      </div>
    </div>

    <div class="myLike">
      <div class="num">
        <div class="image">
          <img src="../../../assets/avatar.webp" alt="">
        </div>
        <div class="like">
          <span class="likeMusic">我喜欢的音乐</span>
          <span class="length">999首</span>
        </div>
      </div>
      <div class="qita">
        心动模式
      </div>
    </div>

    <van-tabs class="tabs" v-model:active="activeName" background="transparent">
      <van-tab title="创建歌单" name="a">
        <div class="mySonglist">
          <div class="info">
            <span>创建歌单(99个)</span>
            <div class="icon">
              <van-icon name="plus" size="20px" color="#999"/>
              <van-icon name="arrow" size="20px" color="#999"/>
            </div>
          </div>
          <div class="itemlist">
            <div class="songPic">
            <img src="../../../assets/avatar.webp" alt="">
            </div>
            <div class="songlistInfo">
              <span class="songlistname">sleep</span>
              <span class="length">99首</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="收藏歌单" name="b">内容 2</van-tab>
      <van-tab title="歌单助手" name="c">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import Popup from '@/components/Popup/index.vue'
import { useUserStore } from '@/store'
import { ref } from 'vue'
const userStore = useUserStore()
// 图标列表
const list = [
  { svgName: 'daily', text: '本地' },
  { svgName: 'radio', text: '最近' },
  { svgName: 'songsheet', text: '音频' },
  { svgName: 'chart', text: '云盘' },
]
const activeName = ref('a');


</script>

<style scoped lang="scss">
.user {
  // z-index:1;
  background: #f6f6f6;
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 15px;

  .search {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .userInfo {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // border: 1px solid red;
    width: 100%;
    height: 170px;

    width: 100%;

    .avatar {
      position: relative;
      top: 28px;
      width: 70px;
      height: 70px;

      // border: 1px solid blue;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      height: 100px;
      background-color: #fff;
      border-radius: 10px;
      padding-top: 40px;
      text-align: center;

      .nickName {
        font-size: 18px;
        font-weight: 600;
      }

      .grade {
        margin: 0 auto;
        width: 50%;
        display: flex;
        justify-content: space-around;
        font-size: 13px;
        color: #bababa;
      }
    }
  }


  .nav {
    background-color: #fff;
    border-radius: 15px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-top: 10px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 50px;
      height: 50px;
      // border: 1px solid red;
      font-size: 12px;
      text-align: center;
    }
  }

  .notice {
    margin-top: 5px;
    border-radius: 5px;
  }

  .myLike {
    border-radius: 12px;
    margin: 10px 0;
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    .num {
      width: 180px;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .image {
        img {
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }
      }

      .like {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .likeMusic {
          font-size: 17px;
          padding-bottom: 5px;
        }

        .length {

          font-size: 14px;
          color: #bababa;
        }
      }
    }

    .qita {
      width: 80px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
      background-color: rgb(235, 75, 232);
      font-size: 16px;
      color: #f6f6f6;
    }
  }

  .tabs{
    padding-top:0px;
    :deep(.van-tabs__nav){
      background: transparent;
    }
    .mySonglist{

      margin-top: 10px;
      padding-top: 15px;
      width: 100%;
      height: 200px;
      background-color: #fff;
      border-radius: 10px;
      .info{
        width: 100%;
        height: 30px;
        // border: 1px solid red;
        padding:0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
          width: 50px;
          // border: 1px solid red;
          display: flex;
          justify-content: space-between;
        }
      }
      .itemlist{
        display: flex;
        width: 100%;
        height: 50px;
        // border:1px solid red;
        margin-top:10px;
        padding-left: 15px;
        .songPic{
          width: 45px;
          height: 45px;
          line-height: 45px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
        }
        
        .songlistInfo{
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 15px;
          .songlistname{
            font-size: 18px;
          }
          .length{
            font-size: 13px;
            color:#bababa;
          }
        }
      }
    }
  }
}</style>
