<template>
  <div>
    <div class="msg-li" :class="{active:isShowborder}">
      <div class="left">
        <slot name="left-icon"></slot>
        <!-- <van-icon name="envelop-o" size="20px" /> -->
        <span class="msgcent">
          <slot name="msg">haha</slot>
        </span>
      </div>
      <div class="icon">
        <!-- <van-badge :content="100" max="99" /> -->
        <slot name="icon"></slot>
        <van-icon class="right" name="arrow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"NavList"
})
defineProps({
  isShowborder: Boolean
})
import {ref} from 'vue'
// const isShowborder = ref(true)
</script>

<style lang="scss" scoped>
.active{
        border-bottom: 2px solid #f7f7f7;
}
.msg-li{
      width:100%;
      height:50px;
      // border:1px solid red;
      display:flex;
      padding-right: 10px;
      justify-content:space-between;
      align-items:center;
      // border-bottom: 2px solid #f7f7f7;

      
      .left{
        display:flex;
        align-items:center;
        .msgcent{
          margin-left:10px;
        }
      }
      .icon{
        // width:50px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        color:#999;
        :deep(.van-badge--top-right){
          transform:none;
        }
        .van-badge{
          width:28px;
          height:18px;
          line-height:17px;
        }
        .right{
          padding-left: 10px;
        }
      }
    }
</style>