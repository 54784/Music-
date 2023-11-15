<template>
  <div class="nav">
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="svg">
        <svg-icon :name="item.svgName" width="30px" height="30px"></svg-icon>
      </div>
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const list = [
  { svgName: 'daily', text: '每日推荐' },
  { svgName: 'radio', text: '私人FM' },
  { svgName: 'songsheet', text: '歌单' },
  { svgName: 'chart', text: '排行榜' },
  { svgName: 'book', text: '有声书' }
]
</script>

<style scoped lang="scss">
.nav {
  height: 70px;
  display: flex;
  justify-content: space-around;
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
</style>
