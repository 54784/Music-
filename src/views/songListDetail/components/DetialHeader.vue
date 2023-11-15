<template>
  <div class="detialHeader">
    <img class="bgimg" :src="songSheetDetail?.picUrl" alt="" />
    <div class="navTop">
      <svg-icon
        @click="$router.go(-1)"
        class="left"
        name="left"
        width="28px"
        height="28px"
      ></svg-icon>
      <span class="text">
        歌单
        <svg-icon class="r" name="R" width="10px" height="10px"></svg-icon>
      </span>
      <div class="right">
        <svg-icon class="search" name="search" width="20px" height="20px"></svg-icon>
        <svg-icon class="more" name="more2" width="25px" height="25px"></svg-icon>
      </div>
    </div>
    <div class="content" v-if="songSheetDetail">
      <div class="picture">
        <img :src="songSheetDetail?.picUrl" alt="" />
      </div>
      <div class="info">
        <p>{{ songSheetDetail?.name }}</p>
        <div class="userInfo">
          <img class="avatar" :src="songSheetDetail?.picUrl" alt="" />
          <span class="username">{{ songSheetDetail?.name }}</span>
        </div>
        <div class="introduce">{{ songSheetDetail?.copywriter }}</div>
      </div>
    </div>
    <div class="navList">
      <div class="leavemsg">
        <svg-icon name="leaveAMsg" width="25px" color="#F7F8FC" height="25px"></svg-icon>
        <span>11</span>
      </div>
      <div>
        <svg-icon name="share" width="26px" color="#F7F8FC" height="26px"></svg-icon>
        <span>66</span>
      </div>
      <div>
        <svg-icon name="download" width="26px" color="#F7F8FC" height="26px"></svg-icon>
        <span>下载</span>
      </div>
      <div>
        <svg-icon name="multiplechoice" width="22px" color="#F7F8FC" height="22px"></svg-icon>
        <span style="margin-top: 5px">多选</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const data = defineProps({
  songSheetDetail: Object
})
// console.log(data.songSheetDetail);
</script>

<style lang="scss" scoped>
.detialHeader {
  position: relative;
  width: 100%;
  // height: 45%;
  // border: 1px solid red;
  .navTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // text-align: center;
    padding: 10px;
    .text {
      position: relative;
      color: #fff;
      font-weight: 550;
      margin-left: 10px;
      .r {
        position: absolute;
      }
    }
    .right {
      position: relative;
      .search {
        position: absolute;
        top: 4px;
        left: -34px;
      }
    }
  }
  .bgimg {
    position: absolute;
    width: 100%;
    height: 350px;
    z-index: -1;
    filter: blur(30px);
  }
  .content {
    padding: 20px 10px 0 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .picture {
      img {
        width: 120px;
        height: 120px;
        border-radius: 10px;
      }
    }
    .info {
      width: 62%;
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        padding-top: 5px;
        font-size: 15px;
        color: #fff;
      }
      .userInfo {
        display: flex;
        align-items: center;
        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
        .username {
          margin-left: 5px;
          color: #ccc;
        }
      }
      .introduce {
        font-size: 13px;
      }
    }
  }
  .navList {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      text-align: center;
      span {
        font-size: 13px;
        display: block;
      }
    }
  }
}
</style>
