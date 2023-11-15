<template>
  <div>
    <svg-icon @click="isShowPopup = !isShowPopup" name="more" width="20px" height="20px"></svg-icon>
    <van-popup v-model:show="isShowPopup" position="left" :style="{ width: '80%', height: '100%' }">
      <div class="popup">
        <div class="headerInfo">
          <div class="userInfo" v-if="userStore.token">
            <img :src="userStore.userInfo.avatar" alt="">
            <span class="username">{{ userStore.userInfo.username }}</span>
            <van-icon name="arrow" />
          </div>
          <div v-else class="username" @click="router.push('/login')">
            请先登录
          </div>
          <div class="sweep">
            <van-icon name="scan" size="25px" color="#000" />
          </div>
        </div>

        <div class="vip"></div>

        <div class="msg">
          <NavList :isShowborder="true">
            <template #left-icon>
              <van-icon name="envelop-o" size="20px" />
            </template>
            <template #msg>消息中心</template>
            <template #icon>
              <van-badge :content="100" max="99" />
            </template>
          </NavList>

          <NavList :isShowborder="true">
            <template #left-icon>
              <van-icon name="newspaper-o" size="20px" />
            </template>
            <template #msg>云贝中心</template>
            <template #icon>
              <span style="font-size:13px;">签到</span>
            </template>
          </NavList>

          <NavList :isShowborder="true">
            <template #left-icon>
              <van-icon name="bulb-o" size="20px" />
            </template>
            <template #msg>创作者中心</template>
          </NavList>

        </div>


        <div class="other">
          <div class="other-top">
            其他
          </div>
          <div class="content">
            <NavList>
              <template #left-icon>
                <van-icon name="bulb-o" size="20px" />
              </template>
              <template #msg>设置</template>
            </NavList>
            <NavList>
              <template #left-icon>
                <van-icon name="bulb-o" size="20px" />
              </template>
              <template #msg>深色模式</template>
              <template #icon>
                <van-switch v-model="checked" active-color="#ee0a24" inactive-color="#dcdee0" />
              </template>
            </NavList>
            
          </div>
        </div>


        <div class="logout" @click="logoutBtn" v-if="userStore.token">
          退出登录
        </div>
        <div v-else class="logout" @click="router.push('/login')" >
          去登录
        </div>
        <van-dialog v-model:show="isShowDialog" title="你确认要退出吗" show-cancel-button  @cancel="cancelLogout" @confirm="logout" close-on-click-overlay></van-dialog>

      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import NavList from "./components/NavList.vue";
import { ref } from 'vue'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
const router = useRouter(); 
const userStore = useUserStore()
const isShowPopup = ref(false)
const checked = ref(true);
const isShowDialog = ref(false)
const logoutBtn = async()=>{
  isShowDialog.value = true
}
const cancelLogout = ()=>{
  isShowDialog.value = false
}
const logout = async()=>{
  await userStore.userLogout()
  isShowPopup.value = false
}
// console.log(show.value);

</script>

<style scoped lang="scss">
.popup {
  z-index: 1;
  width: 100%;
  height: 100vh;
  padding: 20px 15px;
  background-color: #f7f7f7;
  overflow: auto;

  .headerInfo {
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    // border:1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .userInfo {
      display: flex;
      align-items: center;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      .username {
        vertical-align: middle;
        margin-left: 10px;
        font-size: 19px;
        font-weight: bold;
      }
    }
    .username{
      font-size:19px;
      font-weight:600;
      font-family:"楷体"
    }

  }

  .vip {
    width: 100%;
    height: 100px;
    background: #383838;
    border-radius: 15px;
  }

  .msg {

    width: 100%;
    height: 154px;
    margin-top: 15px;
    border-radius: 15px;
    background-color: #fff;
    padding: 5px 0 0 20px;
  }

  .other {
    margin-top: 10px;
    width: 100%;
    height: 300px;
    border-radius: 15px;
    background-color: #fff;

    .other-top {
      padding: 10px 10px 10px 20px;
      font-size: 15px;
      color: #999;
    }

    .content {
      border-top: 2px solid #f7f7f7;
      padding-left:20px;
    }
  }

  .logout{
    margin-top:15px;
    width:100%;
    height:50px;
    border-radius:15px;
    color: red;
    line-height:50px;
    text-align: center;
    background-color:#fff;
    font-weight:600;
  }
}</style>